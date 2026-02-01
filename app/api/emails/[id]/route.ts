import { NextResponse } from 'next/server';
import { getEmailById, updateEmail, deleteEmail } from '@/lib/db';

// GET /api/emails/[id] - Get single email
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const email = await getEmailById(id);
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(email);
  } catch (error) {
    console.error('Error fetching email:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email' },
      { status: 500 }
    );
  }
}

// PUT /api/emails/[id] - Update email
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { recipient_email, recipient_name, subject, content, status } = body;
    
    const updates: any = {};
    if (recipient_email !== undefined) updates.recipient_email = recipient_email;
    if (recipient_name !== undefined) updates.recipient_name = recipient_name;
    if (subject !== undefined) updates.subject = subject;
    if (content !== undefined) updates.content = content;
    if (status !== undefined) updates.status = status;
    
    const email = await updateEmail(id, updates);
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email not found or no updates provided' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(email);
  } catch (error) {
    console.error('Error updating email:', error);
    return NextResponse.json(
      { error: 'Failed to update email' },
      { status: 500 }
    );
  }
}

// DELETE /api/emails/[id] - Delete email
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteEmail(id);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, deletedId: result.id });
  } catch (error) {
    console.error('Error deleting email:', error);
    return NextResponse.json(
      { error: 'Failed to delete email' },
      { status: 500 }
    );
  }
}
