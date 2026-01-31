import { NextResponse } from 'next/server';
import { getCandidates, getSearchQuota, useSearch, recordSearch } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    
    const filters = {
      name: searchParams.get('name') || undefined,
      location: searchParams.get('location') || undefined,
      company: searchParams.get('company') || undefined,
      role: searchParams.get('role') || undefined,
      university: searchParams.get('university') || undefined,
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => {
      if (filters[key as keyof typeof filters] === undefined) {
        delete filters[key as keyof typeof filters];
      }
    });

    const result = await getCandidates(page, limit, Object.keys(filters).length > 0 ? filters : undefined);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candidates' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filters, record } = body;
    
    // Check search quota first
    const quota = await getSearchQuota();
    if (quota.remaining <= 0) {
      return NextResponse.json(
        { error: 'No searches remaining. Please try again tomorrow.' },
        { status: 403 }
      );
    }
    
    // Use a search
    const remaining = await useSearch();
    
    // Execute search
    const result = await getCandidates(1, 5, filters);
    
    // Record the search
    if (record) {
      await recordSearch(filters, result.totalCount);
    }
    
    return NextResponse.json({
      ...result,
      searchesRemaining: remaining
    });
  } catch (error) {
    console.error('Error executing search:', error);
    return NextResponse.json(
      { error: 'Failed to execute search' },
      { status: 500 }
    );
  }
}
