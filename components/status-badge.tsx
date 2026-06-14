import type { ReactNode } from 'react';
import type { Impact, ProjectStage, TaskArea, TaskStatus } from '@/lib/types';

type BadgeTone =
  | ProjectStage
  | TaskStatus
  | TaskArea
  | Impact
  | 'good'
  | 'warning'
  | 'critical'
  | 'draft'
  | 'running'
  | 'won'
  | 'lost';

interface StatusBadgeProps {
  tone: BadgeTone;
  children: ReactNode;
}

export function StatusBadge({ tone, children }: StatusBadgeProps) {
  return <span className={`status status--${tone}`}>{children}</span>;
}
