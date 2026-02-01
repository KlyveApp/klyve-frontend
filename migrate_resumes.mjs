#!/usr/bin/env node
/**
 * Migration script to move resumes from database to Digital Ocean Spaces
 * Run: node migrate_resumes.mjs
 */

import { Pool } from 'pg';
import { uploadToS3, isS3Configured } from './lib/s3.ts';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString: databaseUrl,
});

async function migrateResumes() {
  console.log('🚀 Starting Resume Migration to S3');
  console.log('=' .repeat(60));
  
  // Check if S3 is configured
  if (!isS3Configured()) {
    console.log('\n❌ S3/Spaces is not configured!');
    console.log('\nPlease check your .env.local file has:');
    console.log('  - SPACES_ENDPOINT');
    console.log('  - SPACES_ACCESS_KEY_ID');
    console.log('  - SPACES_SECRET_ACCESS_KEY');
    console.log('  - SPACES_BUCKET');
    process.exit(1);
  }
  
  console.log('\n✅ S3 is configured');
  
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
    console.log('=' .repeat(60));
    
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
        
      } catch (error) {
        failed++;
        console.log(`   ❌ Failed: ${error.message}`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Migration Summary:');
    console.log(`   Total: ${resumes.length}`);
    console.log(`   Migrated: ${migrated}`);
    console.log(`   Failed: ${failed}`);
    
    if (migrated > 0) {
      console.log('\n✅ Migration completed successfully!');
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
