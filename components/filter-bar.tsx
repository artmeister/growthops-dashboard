import type { Segment } from '@/lib/types';

const labels: Record<Segment, string> = {
  all: 'All',
  seo: 'SEO',
  paid: 'Paid',
  cms: 'CMS',
  ecommerce: 'E-commerce',
  account: 'Account portals'
};

interface FilterBarProps {
  segments: Segment[];
  active: Segment;
  loading: boolean;
  onChange: (segment: Segment) => void;
}

export function FilterBar({ segments, active, loading, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar" aria-label="Project segments" aria-busy={loading}>
      {segments.map((segment) => (
        <button
          className={segment === active ? 'filter-bar__item filter-bar__item--active' : 'filter-bar__item'}
          key={segment}
          type="button"
          onClick={() => onChange(segment)}
        >
          {labels[segment]}
        </button>
      ))}
    </div>
  );
}
