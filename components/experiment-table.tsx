import type { Experiment } from '@/lib/types';
import { StatusBadge } from '@/components/status-badge';

interface ExperimentTableProps {
  experiments: Experiment[];
}

export function ExperimentTable({ experiments }: ExperimentTableProps) {
  return (
    <section className="panel">
      <div className="panel__heading">
        <span>A/B experiments</span>
        <small>conversion hypotheses</small>
      </div>
      <div className="experiment-table" role="table" aria-label="A/B experiments">
        <div className="experiment-table__row experiment-table__row--head" role="row">
          <span>Hypothesis</span>
          <span>Variant B</span>
          <span>Uplift</span>
          <span>Status</span>
        </div>
        {experiments.map((experiment) => (
          <div className="experiment-table__row" role="row" key={experiment.id}>
            <span>{experiment.hypothesis}</span>
            <span>{experiment.variantB}</span>
            <strong>{experiment.uplift > 0 ? `+${experiment.uplift}%` : '—'}</strong>
            <StatusBadge tone={experiment.status}>{experiment.status}</StatusBadge>
          </div>
        ))}
      </div>
    </section>
  );
}
