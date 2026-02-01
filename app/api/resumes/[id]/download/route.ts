import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString: databaseUrl,
});

// GET /api/resumes/[id]/download - Redirect to S3 download URL
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT filename, file_url FROM resumes WHERE id = $1`,
        [id]
      );
      
      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        );
      }
      
      const { filename, file_url } = result.rows[0];
      
      if (!file_url) {
        return NextResponse.json(
          { error: 'File not available' },
          { status: 404 }
        );
      }
      
      // Redirect to S3 URL with download header
      return NextResponse.redirect(file_url, {
        headers: {
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error downloading resume:', error);
    return NextResponse.json(
      { error: 'Failed to download resume' },
      { status: 500 }
    );
  }
}
