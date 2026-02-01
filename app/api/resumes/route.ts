import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { uploadToS3, deleteFromS3, isS3Configured } from '@/lib/s3';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString: databaseUrl,
});

// GET /api/resumes - Get all resumes for user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }
    
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at 
        FROM resumes 
        WHERE user_id = $1 
        ORDER BY is_starred DESC, updated_at DESC`,
        [userId]
      );
      
      return NextResponse.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

// POST /api/resumes - Upload new resume to S3
export async function POST(request: Request) {
  try {
    // Check if S3 is configured
    if (!isS3Configured()) {
      return NextResponse.json(
        { error: 'S3 storage not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }
    
    const formData = await request.formData();
    
    const userId = formData.get('userId') as string;
    const file = formData.get('file') as File;
    
    if (!userId || !file) {
      return NextResponse.json(
        { error: 'Missing userId or file' },
        { status: 400 }
      );
    }
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to S3
    const fileUrl = await uploadToS3(buffer, file.name, file.type);
    
    // Save to database
    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO resumes (user_id, filename, file_size, file_type, file_data, file_url, is_starred)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at`,
        [
          userId,
          file.name,
          file.size,
          file.type,
          null, // No file_data for S3 uploads
          fileUrl,
          false
        ]
      );
      
      return NextResponse.json(result.rows[0], { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    );
  }
}
