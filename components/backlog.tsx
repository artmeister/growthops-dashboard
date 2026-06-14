import type { OptimizationTask } from '@/lib/types';
import { StatusBadge } from '@/components/status-badge';

interface BacklogProps {
  items: OptimizationTask[];
}

export function Backlog({ items }: BacklogProps) {
  return (
    <section className="panel">
      <div className="panel__heading">
        <span>Optimization backlog</span>
        <small>{items.length} tasks</small>
      </div>
      <div className="backlog">
        {items.map((item) => (
          <article className="backlog__item" key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <p>
                {item.area} · {item.effortHours}h estimate
              </p>
            </div>
            <div className="backlog__badges">
              <StatusBadge tone={item.impact}>{item.impact}</StatusBadge>
              <StatusBadge tone={item.status}>{item.status}</StatusBadge>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
