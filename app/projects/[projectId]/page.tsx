import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Backlog } from '@/components/backlog';
import { ExperimentTable } from '@/components/experiment-table';
import { StatusBadge } from '@/components/status-badge';
import { getProject } from '@/lib/dashboard';
import { projects } from '@/lib/seed';

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProject(projectId);

  if (!project) {
    return {
      title: 'Project not found — GrowthOps Dashboard'
    };
  }

  return {
    title: `${project.name} — GrowthOps Dashboard`,
    description: `${project.platform}: performance ${project.audit.performance}, SEO ${project.audit.seo}, conversion ${project.metrics.conversionRate}%.`
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = getProject(projectId);

  if (!project) {
    notFound();
  }

  return (
    <main className="shell">
      <Link className="text-link" href="/">
        ← Back to dashboard
      </Link>

      <section className="hero hero--compact">
        <div>
          <span className="eyebrow">Project case page</span>
          <h1>{project.name}</h1>
          <p>{project.platform}</p>
        </div>
        <aside className="hero__stack" aria-label="Project technologies">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </aside>
      </section>

      <section className="project-case-grid">
        <article className="panel project-summary">
          <div className="panel__heading">
            <span>{project.domain}</span>
            <StatusBadge tone={project.stage}>{project.stage}</StatusBadge>
          </div>
          <p className="project-summary__domain">Owner: {project.owner}</p>
          <p>
            This page is pre-rendered from a dynamic route. It is useful in a portfolio because it shows how the same
            dataset can power both an interactive dashboard and SEO-friendly detail pages.
          </p>
          <div className="score-grid">
            <article>
              <span>Performance</span>
              <strong>{project.audit.performance}</strong>
            </article>
            <article>
              <span>SEO</span>
              <strong>{project.audit.seo}</strong>
            </article>
            <article>
              <span>Accessibility</span>
              <strong>{project.audit.accessibility}</strong>
            </article>
            <article>
              <span>Best practices</span>
              <strong>{project.audit.bestPractices}</strong>
            </article>
          </div>
          <ul className="recommendations">
            {project.audit.recommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>
        </article>

        <section className="project-details">
          <Backlog items={project.backlog} />
          <ExperimentTable experiments={project.experiments} />
        </section>
      </section>
    </main>
  );
}
