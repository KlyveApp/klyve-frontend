#!/usr/bin/env python3
"""
Script to migrate existing resumes from database to S3/Spaces storage.
This uploads the PDF files to S3 and updates the database with URLs.

Usage: python3 migrate_resumes_to_s3.py
"""

import psycopg2
import os
import sys

# Add the project directory to path to import the S3 module
sys.path.insert(0, "/home/jawad/Documents/klyve-frontend")

# Try to import the S3 module
try:
    from lib.s3 import uploadToS3, isS3Configured, SPACES_CONFIG
except ImportError as e:
    print(f"❌ Error importing S3 module: {e}")
    print("Please ensure the AWS SDK is installed: npm install @aws-sdk/client-s3")
    sys.exit(1)

DATABASE_URL = "postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"


def migrate_resumes():
    """Migrate existing resumes from database BYTEA to S3 URLs"""

    print("🚀 Starting Resume Migration to S3")
    print("=" * 60)

    # Check if S3 is configured
    if not isS3Configured():
        print("\n❌ S3/Spaces is not configured!")
        print("\nPlease set the following environment variables:")
        print("  - SPACES_ENDPOINT (e.g., https://nyc3.digitaloceanspaces.com)")
        print("  - SPACES_ACCESS_KEY_ID")
        print("  - SPACES_SECRET_ACCESS_KEY")
        print("  - SPACES_BUCKET (default: klyve-resumes)")
        print("\nOr update lib/s3.ts with your Spaces credentials.")
        return

    print(f"\n📍 S3 Configuration:")
    print(f"   Endpoint: {SPACES_CONFIG.endpoint}")
    print(f"   Bucket: {SPACES_CONFIG.bucket}")

    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Get all resumes with file_data
        cursor.execute("""
            SELECT id, user_id, filename, file_size, file_type, file_data, is_starred
            FROM resumes 
            WHERE file_data IS NOT NULL AND (file_url IS NULL OR file_url = '')
        """)

        resumes = cursor.fetchall()

        if not resumes:
            print(
                "\n✅ No resumes to migrate (all already have S3 URLs or no file data)"
            )
            return

        print(f"\n📄 Found {len(resumes)} resumes to migrate")
        print("=" * 60)

        migrated = 0
        failed = 0

        for idx, resume in enumerate(resumes, 1):
            (
                resume_id,
                user_id,
                filename,
                file_size,
                file_type,
                file_data,
                is_starred,
            ) = resume

            print(f"\n{idx}/{len(resumes)}: {filename} ({file_size} bytes)")

            try:
                if not file_data:
                    print(f"   ⚠️  No file data, skipping")
                    continue

                # Convert memoryview to bytes if needed
                if isinstance(file_data, memoryview):
                    file_data = bytes(file_data)

                # Upload to S3
                print(f"   📤 Uploading to S3...")
                file_url = uploadToS3(file_data, filename, file_type)

                # Update database with URL and clear file_data
                cursor.execute(
                    """
                    UPDATE resumes 
                    SET file_url = %s, file_data = NULL, updated_at = NOW()
                    WHERE id = %s
                """,
                    (file_url, resume_id),
                )

                conn.commit()
                migrated += 1
                print(f"   ✅ Migrated: {file_url}")

            except Exception as e:
                failed += 1
                print(f"   ❌ Failed: {e}")
                conn.rollback()
                continue

        print("\n" + "=" * 60)
        print("📊 Migration Summary:")
        print(f"   Total: {len(resumes)}")
        print(f"   Migrated: {migrated}")
        print(f"   Failed: {failed}")

        if migrated > 0:
            print("\n✅ Migration completed successfully!")
            print("   Files are now stored in S3 and database contains URLs only.")

    except Exception as e:
        print(f"\n❌ Error during migration: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("\n🔒 Database connection closed")


if __name__ == "__main__":
    migrate_resumes()
