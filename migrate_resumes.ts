#!/usr/bin/env node
/**
 * Migration script to move resumes from database to Digital Ocean Spaces
 * Run: npx ts-node migrate_resumes.ts
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Pool } from 'pg';

// Configuration
const SPACES_CONFIG = {
  endpoint: 'https://sfo3.digitaloceanspaces.com',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'DO00KWJBK3TTFKBUZ34A',
    secretAccessKey: '5RNH3xXg8gJU720SLaC+5/qYDmJsB4KT1CKP2IHxHrQ',
  },
  bucket: 'klyve-resumes',
};

const DATABASE_URL = 'postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const s3Client = new S3Client({
  endpoint: SPACES_CONFIG.endpoint,
  region: SPACES_CONFIG.region,
  credentials: SPACES_CONFIG.credentials,
  forcePathStyle: false,
});

const pool = new Pool({
  connectionString: DATABASE_URL,
});

async function uploadToS3(fileBuffer: Buffer, fileName: string, contentType: string): Promise<string> {
  const key = `resumes/${Date.now()}-${fileName}`;
  
  const command = new PutObjectCommand({
    Bucket: SPACES_CONFIG.bucket,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: 'public-read',
  });

  await s3Client.send(command);
  
  return `${SPACES_CONFIG.endpoint}/${SPACES_CONFIG.bucket}/${key}`;
}

async function migrateResumes() {
  console.log('🚀 Starting Resume Migration to S3');
  console.log('='.repeat(60));
  console.log(`📍 Endpoint: ${SPACES_CONFIG.endpoint}`);
  console.log(`📦 Bucket: ${SPACES_CONFIG.bucket}`);
  
  const client = await pool.connect();
  
  try {
    // Get all resumes with file_data
    const result = await client.query(`
      SELECT id, user_id, filename, file_size, file_type, file_data, is_starred
      FROM resumes 
      WHERE file_data IS NOT NULL AND (file_url IS NULL OR file_url = '')
    `);
    
    const resumes = result.rows;
    
    if (resumes.length === 0) {
      console.log('\n✅ No resumes to migrate (all already have S3 URLs or no file data)');
      return;
    }
    
    console.log(`\n📄 Found ${resumes.length} resumes to migrate`);
    console.log('='.repeat(60));
    
    let migrated = 0;
    let failed = 0;
    
    for (const resume of resumes) {
      const { id, filename, file_size, file_type, file_data } = resume;
      
      console.log(`\n${migrated + failed + 1}/${resumes.length}: ${filename} (${file_size} bytes)`);
      
      try {
        if (!file_data) {
          console.log('   ⚠️  No file data, skipping');
          continue;
        }
        
        // Convert to buffer
        const buffer = Buffer.from(file_data);
        
        // Upload to S3
        console.log('   📤 Uploading to S3...');
        const fileUrl = await uploadToS3(buffer, filename, file_type);
        
        // Update database
        await client.query(`
          UPDATE resumes 
          SET file_url = $1, file_data = NULL, updated_at = NOW()
          WHERE id = $2
        `, [fileUrl, id]);
        
        console.log(`   ✅ Migrated: ${fileUrl}`);
        migrated++;
        
      } catch (error: any) {
        failed++;
        console.log(`   ❌ Failed: ${error.message || error}`);
        console.log('   Error details:', error);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Migration Summary:');
    console.log(`   Total: ${resumes.length}`);
    console.log(`   Migrated: ${migrated}`);
    console.log(`   Failed: ${failed}`);
    
    if (migrated > 0) {
      console.log('\n✅ Migration completed successfully!');
      console.log('   Files are now stored in S3 and database contains URLs only.');
    }
    
  } catch (error) {
    console.error('\n❌ Error during migration:', error);
  } finally {
    client.release();
    await pool.end();
    console.log('\n🔒 Database connection closed');
  }
}

migrateResumes();
