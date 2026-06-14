import { NextRequest, NextResponse } from 'next/server';
import { getDashboard } from '@/lib/dashboard';
import type { Segment } from '@/lib/types';

export function GET(request: NextRequest) {
  const segment = (request.nextUrl.searchParams.get('segment') ?? 'all') as Segment;

  return NextResponse.json(getDashboard(segment), {
    headers: {
      'Cache-Control': 'public, max-age=20, stale-while-revalidate=60'
    }
  });
}
