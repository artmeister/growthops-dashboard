import { NextResponse } from 'next/server';
import { projects } from '@/lib/seed';

export function GET() {
  return NextResponse.json(projects, {
    headers: {
      'Cache-Control': 'public, max-age=20, stale-while-revalidate=60'
    }
  });
}
