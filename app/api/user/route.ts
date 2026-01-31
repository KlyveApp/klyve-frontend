import { NextResponse } from 'next/server';
import { getUserByEmail, getUserById } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id');
    
    if (!email && !id) {
      return NextResponse.json(
        { error: 'Email or ID required' },
        { status: 400 }
      );
    }
    
    let user;
    if (id) {
      user = await getUserById(id);
    } else if (email) {
      user = await getUserByEmail(email);
    }
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
