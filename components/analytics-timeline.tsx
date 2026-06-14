import type { ActivityItem } from '@/lib/types';
import { StatusBadge } from '@/components/status-badge';

interface AnalyticsTimelineProps {
  activity: ActivityItem[];
}

export function AnalyticsTimeline({ activity }: AnalyticsTimelineProps) {
  return (
    <section className="panel timeline-panel">
      <div className="panel__heading">
        <span>Release and analytics timeline</span>
        <small>recent platform work</small>
      </div>
      <div className="timeline">
        {activity.map((item) => (
          <article className="timeline__item" key={item.id}>
            <time dateTime={item.date}>{item.date}</time>
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
            <StatusBadge tone={item.area}>{item.area}</StatusBadge>
          </article>
        ))}
      </div>
    </section>
  );
}
