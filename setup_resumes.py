#!/usr/bin/env python3
"""
Script to create resumes table and populate with sample data.
"""

import psycopg2
import base64
from datetime import datetime, timedelta

DATABASE_URL = "postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Sample PDF content (a minimal valid PDF in base64)
# This is a tiny "Hello World" PDF
SAMPLE_PDF_BASE64 = """
JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGnE
Qm94WzAgMCA2MTIgNzkyXS9Db250ZW50cyA0IDAgUj4+CmVuZG9iago0IDAgb2JqCjw8L0xl
bmd0aCA0ND4+CnN0cmVhbQpCVAovRjEgMjQgVGYKNzIgNzIwIFRkCihNeSBSZXN1bWUpIFRq
CkVUCkJUCi9GMiAxMiBUZgo3MiA2ODAgVGQKKFNhbXBsZSBSZXN1bWUgQ29udGVudCkgVGoK
RVQKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUx
L0Jhc2VGb250L0hlbHZldGljYT4+CmVuZG9iago2IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0
eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYQovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5n
Pj4KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzWzMgMCBSXS9Db3VudCAxPj4K
ZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDIgMCBSL0ZvbnRzPDwvRjEg
NSAwIFIvRjIgNiAwIFI+Pj4+CmVuZG9iago3IDAgb2JqCjw8L0NyZWF0b3IoUGxkcnVtKS9Q
cm9kdWNlcihQbGRydW0pPj4KZW5kb2JqCnhyZWYKMCA4CjAwMDAwMDAwMDAgNjU1MzUgZiAK
MDAwMDAwMDQ4MCAwMDAwMCBuIAowMDAwMDAwNDE0IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAw
MDAgbiAKMDAwMDAwMDEwMiAwMDAwMCBuIAowMDAwMDAwMjA2IDAwMDAwIG4gCjAwMDAwMDAy
NzYgMDAwMDAgbiAKMDAwMDAwMDU3NyAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgOC9Sb290
IDEgMCBSL0luZm8gNyAwIFI+PgpzdGFydHhyZWYKNjU1CiUlRU9G
"""


def create_resumes_table(conn):
    cursor = conn.cursor()

    # Check if table exists
    cursor.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'resumes'
        );
    """)

    if not cursor.fetchone()[0]:
        print("Creating resumes table...")
        cursor.execute("""
            CREATE TABLE resumes (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                filename VARCHAR(255) NOT NULL,
                file_size INTEGER NOT NULL,
                file_type VARCHAR(100) NOT NULL,
                file_data BYTEA,
                file_url TEXT,
                is_starred BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        """)

        cursor.execute("""
            CREATE INDEX idx_resumes_user_id ON resumes(user_id);
            CREATE INDEX idx_resumes_is_starred ON resumes(is_starred);
        """)

        # Create trigger for updated_at
        cursor.execute("""
            CREATE TRIGGER update_resumes_updated_at
                BEFORE UPDATE ON resumes
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
        """)

        conn.commit()
        print("✅ Resumes table created!")
    else:
        print("✅ Resumes table already exists")

    cursor.close()


def add_sample_resumes(conn):
    cursor = conn.cursor()

    # Get a user ID
    cursor.execute("SELECT id FROM users LIMIT 1")
    user_result = cursor.fetchone()
    if not user_result:
        print("❌ No users found")
        return

    user_id = user_result[0]

    # Check if resumes already exist
    cursor.execute("SELECT COUNT(*) FROM resumes WHERE user_id = %s", (user_id,))
    if cursor.fetchone()[0] > 0:
        print("✅ Sample resumes already exist")
        cursor.close()
        return

    print("\nAdding sample resumes...")

    # Decode sample PDF
    pdf_data = base64.b64decode(SAMPLE_PDF_BASE64.strip())

    sample_resumes = [
        {"filename": "Frontend_Developer_2026.pdf", "starred": True},
        {"filename": "Product_Designer_v2.pdf", "starred": False},
        {"filename": "Sarah_Chen_CV.pdf", "starred": False},
    ]

    for i, resume in enumerate(sample_resumes):
        created_at = datetime.now() - timedelta(days=i * 15)

        cursor.execute(
            """
            INSERT INTO resumes 
            (user_id, filename, file_size, file_type, file_data, is_starred, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """,
            (
                user_id,
                resume["filename"],
                len(pdf_data),
                "application/pdf",
                pdf_data,
                resume["starred"],
                created_at,
            ),
        )

        print(
            f"  Added: {resume['filename']} {'(starred)' if resume['starred'] else ''}"
        )

    conn.commit()
    cursor.close()
    print("\n✅ Sample resumes added!")


if __name__ == "__main__":
    print("🚀 Setting up Resumes Table")
    print("=" * 50)

    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL)
        create_resumes_table(conn)
        add_sample_resumes(conn)
        print("\n✨ Done!")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            conn.close()
            print("\n🔒 Database connection closed")
