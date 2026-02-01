import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { deleteFromS3 } from '@/lib/s3';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString: databaseUrl,
});

// GET /api/resumes/[id] - Get single resume (metadata only, no file data)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at 
        FROM resumes 
        WHERE id = $1`,
        [id]
      );
      
      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(result.rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}

// PUT /api/resumes/[id] - Update resume (star/unstar)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, userId } = body;
    
    const client = await pool.connect();
    try {
      if (action === 'star') {
        if (!userId) {
          return NextResponse.json(
            { error: 'User ID required for starring' },
            { status: 400 }
          );
        }
        
        await client.query('BEGIN');
        
        // Unstar all other resumes
        await client.query(
          `UPDATE resumes 
          SET is_starred = false, updated_at = NOW()
          WHERE user_id = $1 AND id != $2`,
          [userId, id]
        );
        
        // Star this resume
        const result = await client.query(
          `UPDATE resumes 
          SET is_starred = true, updated_at = NOW()
          WHERE id = $1
          RETURNING id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at`,
          [id]
        );
        
        await client.query('COMMIT');
        return NextResponse.json(result.rows[0]);
        
      } else if (action === 'unstar') {
        const result = await client.query(
          `UPDATE resumes 
          SET is_starred = false, updated_at = NOW()
          WHERE id = $1
          RETURNING id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at`,
          [id]
        );
        return NextResponse.json(result.rows[0]);
        
      } else {
        // General update
        const updates = body;
        const setClause: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;
        
        if (updates.filename !== undefined) {
          setClause.push(`filename = $${paramIndex}`);
          values.push(updates.filename);
          paramIndex++;
        }
        if (updates.is_starred !== undefined) {
          setClause.push(`is_starred = $${paramIndex}`);
          values.push(updates.is_starred);
          paramIndex++;
        }
        
        if (setClause.length === 0) {
          return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
        }
        
        values.push(id);
        const result = await client.query(
          `UPDATE resumes 
          SET ${setClause.join(', ')}, updated_at = NOW()
          WHERE id = $${paramIndex}
          RETURNING id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at`,
          values
        );
        
        return NextResponse.json(result.rows[0]);
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    );
  }
}

// DELETE /api/resumes/[id] - Delete resume and S3 file
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const client = await pool.connect();
    try {
      // Get resume info first
      const getResult = await client.query(
        `SELECT file_url FROM resumes WHERE id = $1`,
        [id]
      );
      
      if (getResult.rows.length === 0) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        );
      }
      
      const fileUrl = getResult.rows[0].file_url;
      
      // Delete from S3 if URL exists
      if (fileUrl) {
        try {
          await deleteFromS3(fileUrl);
        } catch (s3Error) {
          console.error('Error deleting from S3:', s3Error);
          // Continue with database deletion even if S3 fails
        }
      }
      
      // Delete from database
      const result = await client.query(
        `DELETE FROM resumes WHERE id = $1 RETURNING id`,
        [id]
      );
      
      return NextResponse.json({ success: true, deletedId: result.rows[0].id });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    );
  }
}
