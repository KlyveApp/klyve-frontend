import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString: databaseUrl,
});

// GET /api/candidates/[id] - Get a single candidate
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT id, name, role, company, location, linkedin_url, status, email_chain_status, initials, created_at, updated_at
        FROM candidates 
        WHERE id = $1`,
        [id]
      );
      
      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Candidate not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(result.rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candidate' },
      { status: 500 }
    );
  }
}
