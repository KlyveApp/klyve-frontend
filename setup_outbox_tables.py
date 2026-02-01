#!/usr/bin/env python3
"""
Script to create outbox tables and populate with dummy data.
Usage: python3 setup_outbox_tables.py
"""

import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta
import random

# Database connection string
DATABASE_URL = "postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Sample data for generating dummy emails
SUBJECTS = [
    "Follow up: Interview Process",
    "Application Status Update",
    "Welcome to the Team!",
    "Next Steps in Recruitment",
    "Reference Check Request",
    "Offer Letter Discussion",
    "Technical Assessment Results",
    "Scheduling Final Interview",
    "Thank You for Your Interest",
    "Background Check Update",
    "Onboarding Schedule",
    "Contract Terms Review",
    "Salary Negotiation",
    "Start Date Confirmation",
    "Documentation Requirements",
]

RECIPIENTS = [
    {
        "name": "Sarah Chen",
        "email": "sarah.chen@gmail.com",
        "role": "Senior Frontend Engineer",
        "company": "Google",
        "location": "San Francisco, CA",
    },
    {
        "name": "Marcus Wright",
        "email": "marcus.wright@outlook.com",
        "role": "Fullstack Engineer",
        "company": "Microsoft",
        "location": "Seattle, WA",
    },
    {
        "name": "Elena Rodriguez",
        "email": "elena.r@yahoo.com",
        "role": "Product Manager",
        "company": "Meta",
        "location": "New York, NY",
    },
    {
        "name": "James Wilson",
        "email": "j.wilson@protonmail.com",
        "role": "Backend Developer",
        "company": "Amazon",
        "location": "Austin, TX",
    },
    {
        "name": "Priya Patel",
        "email": "priya.patel@gmail.com",
        "role": "Data Scientist",
        "company": "Netflix",
        "location": "Los Angeles, CA",
    },
    {
        "name": "David Kim",
        "email": "david.kim@outlook.com",
        "role": "DevOps Engineer",
        "company": "Spotify",
        "location": "Boston, MA",
    },
    {
        "name": "Anna Schmidt",
        "email": "anna.schmidt@yahoo.com",
        "role": "UX Designer",
        "company": "Adobe",
        "location": "Denver, CO",
    },
    {
        "name": "Carlos Mendez",
        "email": "c.mendez@gmail.com",
        "role": "Mobile Developer",
        "company": "Uber",
        "location": "Miami, FL",
    },
    {
        "name": "Lisa Thompson",
        "email": "lisa.t@outlook.com",
        "role": "Engineering Manager",
        "company": "Stripe",
        "location": "Chicago, IL",
    },
    {
        "name": "Ahmed Hassan",
        "email": "ahmed.hassan@protonmail.com",
        "role": "Security Engineer",
        "company": "Cloudflare",
        "location": "Portland, OR",
    },
]

EMAIL_BODIES = [
    "Hi there,\n\nI hope this email finds you well. I wanted to follow up on our conversation regarding the role.\n\nBest regards",
    "Hello,\n\nThank you for your interest in our company. We'd like to move forward with the next steps in the process.\n\nLooking forward to hearing from you.",
    "Hi,\n\nCongratulations! We're excited to extend an offer for the position. Please find the details attached.\n\nBest",
    "Hello,\n\nI wanted to check in regarding the documents we requested. Please let us know if you need any assistance.\n\nThanks",
    "Hi,\n\nThank you for completing the technical assessment. The team was impressed with your work.\n\nBest regards",
    "Hello,\n\nCould you please provide references from your previous roles? We'd like to complete our verification process.\n\nThanks",
    "Hi,\n\nJust following up on the salary discussion. Let me know if you have any questions about the offer.\n\nBest",
    "Hello,\n\nYour background check has been completed successfully. We can proceed with the next steps.\n\nRegards",
    "Hi,\n\nPlease review the contract terms and let us know if everything looks good.\n\nBest regards",
    "Hello,\n\nWelcome to the team! Your onboarding session is scheduled for next Monday.\n\nExcited to have you join us!",
]

REPLY_BODIES = [
    "Thank you for the update!\n\nI'm excited about this opportunity and look forward to the next steps.\n\nBest",
    "Hi,\n\nI've attached the documents you requested. Please let me know if you need anything else.\n\nThanks",
    "Thank you for the offer!\n\nI have a few questions about the benefits package. Could we schedule a call to discuss?\n\nBest regards",
    "Hi,\n\nI'm available for the interview on Thursday at 2 PM. Does that work for your team?\n\nThanks",
    "Thank you for the feedback on the assessment!\n\nI'm glad the team found my work satisfactory.\n\nBest",
    "Hi,\n\nI've provided the references as requested. They should be reaching out soon.\n\nRegards",
    "Thank you for the offer details.\n\nThe salary looks good. I'll review the contract and get back to you.\n\nBest",
    "Hi,\n\nThat's great news! I'm ready to move forward with the onboarding process.\n\nThanks",
    "Hello,\n\nI've reviewed the contract and everything looks good. I'm ready to sign.\n\nBest regards",
    "Thank you!\n\nI'm looking forward to joining the team on Monday. See you then!\n\nBest",
]


def create_tables(conn):
    """Create outbox_threads and outbox_emails tables"""
    cursor = conn.cursor()

    # Check if tables exist
    cursor.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'outbox_threads'
        );
    """)
    threads_exist = cursor.fetchone()[0]

    if not threads_exist:
        print("Creating outbox_threads table...")
        cursor.execute("""
            CREATE TABLE outbox_threads (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                recipient_name VARCHAR(255) NOT NULL,
                recipient_email VARCHAR(255) NOT NULL,
                recipient_role VARCHAR(255),
                recipient_company VARCHAR(255),
                recipient_location VARCHAR(255),
                subject VARCHAR(255) NOT NULL,
                status VARCHAR(50) DEFAULT 'active',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        """)

        cursor.execute("""
            CREATE INDEX idx_outbox_threads_user_id ON outbox_threads(user_id);
            CREATE INDEX idx_outbox_threads_status ON outbox_threads(status);
        """)

        # Create trigger for updated_at
        cursor.execute("""
            CREATE TRIGGER update_outbox_threads_updated_at
                BEFORE UPDATE ON outbox_threads
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
        """)

        print("✅ outbox_threads table created!")

    cursor.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'outbox_emails'
        );
    """)
    emails_exist = cursor.fetchone()[0]

    if not emails_exist:
        print("Creating outbox_emails table...")
        cursor.execute("""
            CREATE TABLE outbox_emails (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                thread_id UUID REFERENCES outbox_threads(id) ON DELETE CASCADE,
                sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('user', 'recipient')),
                body TEXT NOT NULL,
                body_html TEXT,
                attachments JSONB DEFAULT '[]',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        """)

        cursor.execute("""
            CREATE INDEX idx_outbox_emails_thread_id ON outbox_emails(thread_id);
            CREATE INDEX idx_outbox_emails_created_at ON outbox_emails(created_at);
        """)

        print("✅ outbox_emails table created!")

    conn.commit()
    cursor.close()


def generate_dummy_data(conn):
    """Generate 10 dummy threads with multiple emails each"""
    cursor = conn.cursor()

    # Get a user ID
    cursor.execute("SELECT id FROM users LIMIT 1")
    user_result = cursor.fetchone()
    if not user_result:
        print("❌ No users found in database")
        return

    user_id = user_result[0]

    # Check if data already exists
    cursor.execute("SELECT COUNT(*) FROM outbox_threads")
    count = cursor.fetchone()[0]

    if count > 0:
        print(f"⚠️  Found {count} existing threads. Skipping dummy data generation.")
        cursor.close()
        return

    print("\nGenerating 10 dummy outbox threads...")

    for i in range(10):
        recipient = RECIPIENTS[i]
        subject = random.choice(SUBJECTS)

        # Create thread
        cursor.execute(
            """
            INSERT INTO outbox_threads 
            (user_id, recipient_name, recipient_email, recipient_role, recipient_company, recipient_location, subject, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """,
            (
                user_id,
                recipient["name"],
                recipient["email"],
                recipient["role"],
                recipient["company"],
                recipient["location"],
                subject,
                random.choice(["active", "archived"])
                if random.random() > 0.8
                else "active",
            ),
        )

        thread_id = cursor.fetchone()[0]

        # Generate 2-4 emails per thread
        num_emails = random.randint(2, 4)
        base_time = datetime.now() - timedelta(days=random.randint(1, 30))

        for j in range(num_emails):
            is_user_email = j % 2 == 0  # Alternate between user and recipient

            if is_user_email:
                body = random.choice(EMAIL_BODIES)
                sender_type = "user"
            else:
                body = random.choice(REPLY_BODIES)
                sender_type = "recipient"

            email_time = base_time + timedelta(hours=j * random.randint(2, 24))

            cursor.execute(
                """
                INSERT INTO outbox_emails 
                (thread_id, sender_type, body, created_at)
                VALUES (%s, %s, %s, %s)
            """,
                (thread_id, sender_type, body, email_time),
            )

        print(f"  Created thread {i + 1}: {subject} ({num_emails} emails)")

    conn.commit()
    cursor.close()
    print("\n✅ Successfully created 10 threads with emails!")


def show_stats(conn):
    """Display table statistics"""
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM outbox_threads")
    thread_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM outbox_emails")
    email_count = cursor.fetchone()[0]

    print(f"\n📊 Outbox Statistics:")
    print(f"   - Threads: {thread_count}")
    print(f"   - Total Emails: {email_count}")
    print(
        f"   - Average emails per thread: {email_count / thread_count if thread_count > 0 else 0:.1f}"
    )

    cursor.close()


if __name__ == "__main__":
    print("🚀 Setting up Outbox Tables")
    print("=" * 50)

    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL)

        create_tables(conn)
        generate_dummy_data(conn)
        show_stats(conn)

        print("\n✨ Done!")

    except Exception as e:
        print(f"\n❌ Error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            conn.close()
            print("\n🔒 Database connection closed")
