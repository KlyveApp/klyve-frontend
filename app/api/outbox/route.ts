import { NextResponse } from 'next/server';
import { getOutboxThreads, createOutboxThread, searchOutboxThreads } from '@/lib/db';

// GET /api/outbox - Get all threads
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const search = searchParams.get('search');
    
    let threads;
    if (search) {
      threads = await searchOutboxThreads(search, userId || undefined);
    } else {
      threads = await getOutboxThreads(userId || undefined);
    }
    
    return NextResponse.json(threads);
  } catch (error) {
    console.error('Error fetching outbox threads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch threads' },
      { status: 500 }
    );
  }
}

// POST /api/outbox - Create new thread
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      user_id, 
      recipient_name, 
      recipient_email, 
      recipient_role, 
      recipient_company, 
      recipient_location, 
      subject, 
      body: emailBody,
      body_html,
      attachments 
    } = body;
    
    if (!user_id || !recipient_name || !recipient_email || !subject || !emailBody) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const thread = await createOutboxThread({
      user_id,
      recipient_name,
      recipient_email,
      recipient_role,
      recipient_company,
      recipient_location,
      subject,
      first_email: {
        sender_type: 'user',
        body: emailBody,
        body_html,
        attachments: attachments || []
      }
    });
    
    return NextResponse.json(thread, { status: 201 });
  } catch (error) {
    console.error('Error creating outbox thread:', error);
    return NextResponse.json(
      { error: 'Failed to create thread' },
      { status: 500 }
    );
  }
}
