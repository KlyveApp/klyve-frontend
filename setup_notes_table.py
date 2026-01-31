#!/usr/bin/env python3
"""
Script to create notes table and populate with initial data.
Usage: python3 setup_notes_table.py
"""

import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

# Database connection string
DATABASE_URL = "postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"


def create_notes_table():
    """Create the notes table if it doesn't exist"""
    print("Creating notes table...")

    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Check if table exists
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'notes'
            );
        """)
        table_exists = cursor.fetchone()[0]

        if table_exists:
            print("Notes table already exists.")
        else:
            # Create notes table
            cursor.execute("""
                CREATE TABLE notes (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                    title VARCHAR(255) NOT NULL,
                    content TEXT,
                    tags TEXT[] DEFAULT '{}',
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            """)

            # Create index on user_id for faster queries
            cursor.execute("""
                CREATE INDEX idx_notes_user_id ON notes(user_id);
            """)

            # Create trigger for updated_at
            cursor.execute("""
                CREATE OR REPLACE FUNCTION update_updated_at_column()
                RETURNS TRIGGER AS $$
                BEGIN
                    NEW.updated_at = NOW();
                    RETURN NEW;
                END;
                $$ language 'plpgsql';
            """)

            cursor.execute("""
                CREATE TRIGGER update_notes_updated_at
                    BEFORE UPDATE ON notes
                    FOR EACH ROW
                    EXECUTE FUNCTION update_updated_at_column();
            """)

            conn.commit()
            print("✅ Notes table created successfully!")

        # Check current count
        cursor.execute("SELECT COUNT(*) as count FROM notes")
        count = cursor.fetchone()[0]
        print(f"Current notes in database: {count}")

        # Insert sample notes if table is empty
        if count == 0:
            print("\nInserting sample notes...")

            # Get the first user
            cursor.execute("SELECT id FROM users LIMIT 1")
            user_result = cursor.fetchone()

            if user_result:
                user_id = user_result[0]

                sample_notes = [
                    {
                        "title": "Google Interview Prep",
                        "content": "Focus on distributed systems and system design patterns. Remember to mention the scalability project from 2024.",
                        "tags": ["Interview", "Technical"],
                    },
                    {
                        "title": "Networking Tips",
                        "content": "Always follow up within 24 hours. Send a personalized LinkedIn invite referencing specific conversation points.",
                        "tags": ["Personal"],
                    },
                    {
                        "title": "Nexus Project Vision",
                        "content": "Building a CRM for recruiters that feels like a high-end document editor. Focus on speed and clean UI/UX.",
                        "tags": ["Draft", "Project"],
                    },
                ]

                for note in sample_notes:
                    cursor.execute(
                        """
                        INSERT INTO notes (user_id, title, content, tags)
                        VALUES (%s, %s, %s, %s)
                    """,
                        (user_id, note["title"], note["content"], note["tags"]),
                    )

                conn.commit()
                print(f"✅ Inserted {len(sample_notes)} sample notes!")
            else:
                print("⚠️ No users found. Cannot insert sample notes.")

        # Show table structure
        cursor.execute("\d notes")
        print("\n📋 Notes table structure:")
        print(cursor.fetchall())

    except Exception as e:
        print(f"❌ Error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("\n🔒 Database connection closed")


if __name__ == "__main__":
    print("🚀 Setting up Notes Table")
    print("=" * 50)
    create_notes_table()
    print("\n✨ Done!")
