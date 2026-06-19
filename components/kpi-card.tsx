import type { Kpi } from '@/lib/types';

interface KpiCardProps {
  kpi: Kpi;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const trendLabel = kpi.trend > 0 ? `+${kpi.trend}%` : `${kpi.trend}%`;
  const isPositive = kpi.id === 'kpi-latency' || kpi.id === 'kpi-release' ? kpi.trend < 0 : kpi.trend > 0;
  const trendScale = Math.min(Math.max(Math.abs(kpi.trend) * 5, 18), 100);

  return (
    <article className={isPositive ? 'kpi-card kpi-card--positive' : 'kpi-card'}>
      <div className="kpi-card__header">
        <span>{kpi.label}</span>
        <strong className={isPositive ? 'trend trend--good' : 'trend'}>{trendLabel}</strong>
      </div>
      <p className="kpi-card__value">{kpi.value}</p>
      <p className="kpi-card__description">{kpi.description}</p>
      <div className="kpi-card__sparkline" aria-hidden="true">
        <span style={{ width: `${trendScale}%` }} />
      </div>
    </article>
  );
}
