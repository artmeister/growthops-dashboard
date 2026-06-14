'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnalyticsTimeline } from '@/components/analytics-timeline';
import { AuditPanel } from '@/components/audit-panel';
import { Backlog } from '@/components/backlog';
import { ExperimentTable } from '@/components/experiment-table';
import { FilterBar } from '@/components/filter-bar';
import { KpiCard } from '@/components/kpi-card';
import { ProjectCard } from '@/components/project-card';
import { Shell } from '@/components/shell';
import { StatusBadge } from '@/components/status-badge';
import type { ApiError, DashboardResponse, Project, Segment } from '@/lib/types';

interface DashboardClientProps {
  initialDashboard: DashboardResponse;
}

async function requestDashboard(segment: Segment, signal: AbortSignal) {
  const response = await fetch(`/api/dashboard?segment=${segment}`, {
    signal,
    headers: {
      'x-demo-user': 'github-visitor'
    }
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => ({ message: response.statusText }))) as ApiError;
    throw new Error(error.message ?? 'Dashboard request failed');
  }

  return (await response.json()) as DashboardResponse;
}

export function DashboardClient({ initialDashboard }: DashboardClientProps) {
  const [segment, setSegment] = useState<Segment>('all');
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(initialDashboard.projects[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const didHydrate = useRef(false);

  useEffect(() => {
    if (!didHydrate.current) {
      didHydrate.current = true;
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(undefined);

    requestDashboard(segment, controller.signal)
      .then((nextDashboard) => {
        setDashboard(nextDashboard);
        setSelectedProject((current) => {
          if (current && nextDashboard.projects.some((project) => project.id === current.id)) {
            return current;
          }

          return nextDashboard.projects[0];
        });
      })
      .catch((requestError: Error) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [segment]);

  const selectedStack = useMemo(() => selectedProject?.stack.join(' · ') ?? '', [selectedProject]);

  return (
    <Shell>
      {error ? <div className="notice notice--error">API error: {error}</div> : null}
      {loading ? <div className="notice">Updating dashboard data through /api/dashboard...</div> : null}

      <main>
        <FilterBar segments={dashboard.segments} active={segment} loading={loading} onChange={setSegment} />

        <section className="kpi-grid" aria-label="Key performance indicators">
          {dashboard.kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </section>

        <section className="dashboard-grid">
          <div className="project-list" aria-label="Projects">
            {dashboard.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                active={selectedProject?.id === project.id}
                onSelect={setSelectedProject}
              />
            ))}
          </div>

          {selectedProject ? (
            <section className="project-details">
              <div className="panel project-summary">
                <div className="panel__heading">
                  <span>{selectedProject.name}</span>
                  <StatusBadge tone={selectedProject.stage}>{selectedProject.stage}</StatusBadge>
                </div>
                <p className="project-summary__domain">{selectedProject.domain}</p>
                <p>{selectedStack}</p>
                <div className="score-grid">
                  <article>
                    <span>Performance</span>
                    <strong>{selectedProject.audit.performance}</strong>
                  </article>
                  <article>
                    <span>SEO</span>
                    <strong>{selectedProject.audit.seo}</strong>
                  </article>
                  <article>
                    <span>Accessibility</span>
                    <strong>{selectedProject.audit.accessibility}</strong>
                  </article>
                  <article>
                    <span>Best practices</span>
                    <strong>{selectedProject.audit.bestPractices}</strong>
                  </article>
                </div>
                <ul className="recommendations">
                  {selectedProject.audit.recommendations.map((recommendation) => (
                    <li key={recommendation}>{recommendation}</li>
                  ))}
                </ul>
              </div>

              <Backlog items={selectedProject.backlog} />
              <ExperimentTable experiments={selectedProject.experiments} />
            </section>
          ) : null}
        </section>

        <section className="bottom-grid">
          <AuditPanel />
          <AnalyticsTimeline activity={dashboard.activity} />
        </section>
      </main>
    </Shell>
  );
}
