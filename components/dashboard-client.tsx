'use client';

import { useMemo, useState } from 'react';
import { AnalyticsTimeline } from '@/components/analytics-timeline';
import { AuditPanel } from '@/components/audit-panel';
import { Backlog } from '@/components/backlog';
import { ExperimentTable } from '@/components/experiment-table';
import { FilterBar } from '@/components/filter-bar';
import { KpiCard } from '@/components/kpi-card';
import { ProjectCard } from '@/components/project-card';
import { Shell } from '@/components/shell';
import { StatusBadge } from '@/components/status-badge';
import { getDashboard } from '@/lib/dashboard';
import type { DashboardResponse, Project, Segment } from '@/lib/types';

interface DashboardClientProps {
  initialDashboard: DashboardResponse;
}

export function DashboardClient({ initialDashboard }: DashboardClientProps) {
  const [segment, setSegment] = useState<Segment>('all');
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(initialDashboard.projects[0]);
  const dashboard = useMemo(
    () => (segment === 'all' ? initialDashboard : getDashboard(segment)),
    [initialDashboard, segment]
  );

  function handleSegmentChange(nextSegment: Segment) {
    const nextDashboard = nextSegment === 'all' ? initialDashboard : getDashboard(nextSegment);

    setSegment(nextSegment);
    setSelectedProject((currentProject) => {
      const matchingProject = nextDashboard.projects.find((project) => project.id === currentProject?.id);

      return matchingProject ?? nextDashboard.projects[0];
    });
  }

  const selectedStack = useMemo(() => selectedProject?.stack.join(' · ') ?? '', [selectedProject]);

  return (
    <Shell>
      <div className="sr-only" aria-live="polite">
        Dashboard data updates instantly from the static demo dataset.
      </div>

      <main className="dashboard">
        <FilterBar segments={dashboard.segments} active={segment} loading={false} onChange={handleSegmentChange} />

        <section className="kpi-grid" aria-label="Key performance indicators">
          {dashboard.kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </section>

        <section className="dashboard-grid" id="projects">
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
                <div className="project-summary__intro">
                  <div>
                    <p className="project-summary__domain">{selectedProject.domain}</p>
                    <p>{selectedStack}</p>
                  </div>
                  <div className="project-summary__release">
                    <span>Last release</span>
                    <strong>{selectedProject.lastRelease}</strong>
                  </div>
                </div>
                <div className="project-summary__metrics" aria-label="Selected project metrics">
                  <span>
                    <small>Load time</small>
                    <strong>{selectedProject.metrics.loadTimeMs}ms</strong>
                  </span>
                  <span>
                    <small>Conversion</small>
                    <strong>{selectedProject.metrics.conversionRate}%</strong>
                  </span>
                  <span>
                    <small>Bounce</small>
                    <strong>{selectedProject.metrics.bounceRate}%</strong>
                  </span>
                  <span>
                    <small>API latency</small>
                    <strong>{selectedProject.metrics.apiLatencyMs}ms</strong>
                  </span>
                </div>
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
          <div id="audit">
            <AuditPanel />
          </div>
          <div id="timeline">
            <AnalyticsTimeline activity={dashboard.activity} />
          </div>
        </section>
      </main>
    </Shell>
  );
}
