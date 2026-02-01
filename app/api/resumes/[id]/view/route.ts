import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString: databaseUrl,
});

// GET /api/resumes/[id]/view - Redirect to S3 URL for viewing
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT filename, file_url, file_data, file_type FROM resumes WHERE id = $1`,
        [id]
      );
      
      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Resume not found' },
          { status: 404 }
        );
      }
      
      const { filename, file_url, file_data, file_type } = result.rows[0];
      
      // If S3 URL exists, redirect to it
      if (file_url) {
        return NextResponse.redirect(file_url);
      }
      
      // Fallback: serve from database if no S3 URL (for legacy resumes)
      if (file_data) {
        const buffer = Buffer.from(file_data);
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': file_type || 'application/pdf',
            'Content-Disposition': 'inline',
          },
        });
      }
      
      return NextResponse.json(
        { error: 'File not available' },
        { status: 404 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error viewing resume:', error);
    return NextResponse.json(
      { error: 'Failed to view resume' },
      { status: 500 }
    );
  }
}
