import { NextResponse } from 'next/server';
import { getAllExperiments } from '@/lib/dashboard';
import { projects } from '@/lib/seed';
import type { ApiError, Experiment } from '@/lib/types';
import { experimentSchema } from '@/lib/validation';

export function GET() {
  return NextResponse.json(getAllExperiments());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const payload = experimentSchema.safeParse(body);

  if (!payload.success) {
    return NextResponse.json(
      { message: 'Invalid experiment payload.', details: payload.error.flatten() } satisfies ApiError,
      { status: 400 }
    );
  }

  const project = projects.find((item) => item.id === payload.data.projectId);

  if (!project) {
    return NextResponse.json(
      { message: `Project ${payload.data.projectId} was not found.` } satisfies ApiError,
      { status: 404 }
    );
  }

  const experiment: Experiment = {
    id: `exp-${Date.now()}`,
    hypothesis: payload.data.hypothesis,
    variantA: payload.data.variantA,
    variantB: payload.data.variantB,
    uplift: 0,
    status: 'draft'
  };

  project.experiments.unshift(experiment);

  return NextResponse.json(experiment, { status: 201 });
}
