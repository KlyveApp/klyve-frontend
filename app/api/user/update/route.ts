import { NextResponse } from 'next/server';
import { updateUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, updates } = body;
    
    if (!userId || !updates) {
      return NextResponse.json(
        { error: 'Missing userId or updates' },
        { status: 400 }
      );
    }
    
    const result = await updateUser(userId, updates);
    
    if (!result) {
      return NextResponse.json(
        { error: 'No updates provided or user not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
