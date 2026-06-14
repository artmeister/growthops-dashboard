import { NextResponse } from 'next/server';
import { getProject } from '@/lib/dashboard';
import type { ApiError } from '@/lib/types';

interface ProjectRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: ProjectRouteContext) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return NextResponse.json({ message: `Project ${id} was not found.` } satisfies ApiError, { status: 404 });
  }

  return NextResponse.json(project, {
    headers: {
      'Cache-Control': 'public, max-age=20, stale-while-revalidate=60'
    }
  });
}
