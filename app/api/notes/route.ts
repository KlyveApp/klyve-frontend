import { NextResponse } from 'next/server';
import { getNotes, createNote, getNoteById, updateNote, deleteNote, searchNotes } from '@/lib/db';

// GET /api/notes - Get all notes or search notes
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const search = searchParams.get('search');
    
    let notes;
    if (search) {
      notes = await searchNotes(search, userId || undefined);
    } else {
      notes = await getNotes(userId || undefined);
    }
    
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

// POST /api/notes - Create a new note
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, title, content, tags } = body;
    
    if (!user_id || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id and title' },
        { status: 400 }
      );
    }
    
    const note = await createNote({
      user_id,
      title,
      content: content || '',
      tags: tags || []
    });
    
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
