import { NextResponse } from 'next/server';
import { getSearchQuota } from '@/lib/db';

export async function GET() {
  try {
    const quota = await getSearchQuota();
    return NextResponse.json(quota);
  } catch (error) {
    console.error('Error fetching search quota:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search quota' },
      { status: 500 }
    );
  }
}
