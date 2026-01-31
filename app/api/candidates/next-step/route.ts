import { NextResponse } from 'next/server';
import { updateCandidateNextStep } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { candidateId, nextStep } = body;
    
    if (!candidateId || !nextStep) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await updateCandidateNextStep(candidateId, nextStep);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating next step:', error);
    return NextResponse.json(
      { error: 'Failed to update next step' },
      { status: 500 }
    );
  }
}
