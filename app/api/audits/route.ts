import { NextResponse } from 'next/server';
import { calculateAudit } from '@/lib/audit-score';
import type { ApiError } from '@/lib/types';
import { auditSchema } from '@/lib/validation';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const payload = auditSchema.safeParse(body);

  if (!payload.success) {
    return NextResponse.json(
      { message: 'Invalid audit payload.', details: payload.error.flatten() } satisfies ApiError,
      { status: 400 }
    );
  }

  return NextResponse.json(calculateAudit(payload.data), { status: 201 });
}
