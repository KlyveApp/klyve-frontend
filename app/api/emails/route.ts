import { NextResponse } from 'next/server';
import { getEmails, createEmail } from '@/lib/db';

// GET /api/emails - Get all emails
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const emails = await getEmails(userId || undefined);
    return NextResponse.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

// POST /api/emails - Create new email
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, recipient_email, recipient_name, subject, content, status } = body;
    
    if (!user_id || !recipient_email || !subject || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const email = await createEmail({
      user_id,
      recipient_email,
      recipient_name,
      subject,
      content,
      status: status || 'draft'
    });
    
    return NextResponse.json(email, { status: 201 });
  } catch (error) {
    console.error('Error creating email:', error);
    return NextResponse.json(
      { error: 'Failed to create email' },
      { status: 500 }
    );
  }
}
