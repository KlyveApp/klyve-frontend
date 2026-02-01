import { NextResponse } from 'next/server';
import { getOutboxThreadById, addOutboxEmail, deleteOutboxThread } from '@/lib/db';

// GET /api/outbox/[id] - Get thread with all emails
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const thread = await getOutboxThreadById(id);
    
    if (!thread) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error fetching outbox thread:', error);
    return NextResponse.json(
      { error: 'Failed to fetch thread' },
      { status: 500 }
    );
  }
}

// POST /api/outbox/[id] - Add email to thread (reply)
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { sender_type, body: emailBody, body_html, attachments } = body;
    
    if (!emailBody || !sender_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const email = await addOutboxEmail({
      thread_id: id,
      sender_type,
      body: emailBody,
      body_html,
      attachments: attachments || []
    });
    
    return NextResponse.json(email, { status: 201 });
  } catch (error) {
    console.error('Error adding outbox email:', error);
    return NextResponse.json(
      { error: 'Failed to add email' },
      { status: 500 }
    );
  }
}

// DELETE /api/outbox/[id] - Delete thread
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteOutboxThread(id);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Thread not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, deletedId: result.id });
  } catch (error) {
    console.error('Error deleting outbox thread:', error);
    return NextResponse.json(
      { error: 'Failed to delete thread' },
      { status: 500 }
    );
  }
}
