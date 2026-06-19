import Link from 'next/link';
import type { Project } from '@/lib/types';
import { StatusBadge } from '@/components/status-badge';

interface ProjectCardProps {
  project: Project;
  active: boolean;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, active, onSelect }: ProjectCardProps) {
  return (
    <article className={active ? 'project-card project-card--active' : 'project-card'}>
      <button className="project-card__button" type="button" onClick={() => onSelect(project)}>
        <span className="project-card__topline">
          <span>{project.platform}</span>
          <StatusBadge tone={project.stage}>{project.stage}</StatusBadge>
        </span>
        <strong>{project.name}</strong>
        <span className="project-card__domain">{project.domain}</span>
        <span className="project-card__metrics">
          <span>Perf {project.audit.performance}</span>
          <span>SEO {project.audit.seo}</span>
          <span>{project.metrics.conversionRate}% CR</span>
        </span>
        <span className="project-card__release">Release {project.lastRelease}</span>
      </button>
      <Link className="project-card__link" href={`/projects/${project.id}`}>
        Open case page
      </Link>
    </article>
  );
}
