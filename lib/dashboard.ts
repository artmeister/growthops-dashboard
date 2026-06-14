import type { DashboardResponse, Kpi, Project, Segment } from '@/lib/types';
import { activity, projects } from '@/lib/seed';

export const segments: Segment[] = ['all', 'seo', 'paid', 'cms', 'ecommerce', 'account'];

function average(items: number[]) {
  return items.reduce((sum, value) => sum + value, 0) / items.length;
}

function projectMatchesSegment(project: Project, segment: Segment) {
  if (segment === 'all') {
    return true;
  }

  if (segment === 'seo') {
    return project.backlog.some((item) => item.area === 'seo') || project.audit.seo < 92;
  }

  if (segment === 'paid') {
    return project.stack.includes('GTM') || project.experiments.some((experiment) => experiment.status !== 'lost');
  }

  return project.segment === segment;
}

function getKpis(filteredProjects: Project[]): Kpi[] {
  const avgPerformance = Math.round(average(filteredProjects.map((project) => project.audit.performance)));
  const avgConversion = average(filteredProjects.map((project) => project.metrics.conversionRate)).toFixed(1);
  const avgLatency = Math.round(average(filteredProjects.map((project) => project.metrics.apiLatencyMs)));
  const releaseLeadTime = Math.round(average(filteredProjects.map((project) => project.metrics.releaseLeadTimeHours)));

  return [
    {
      id: 'kpi-performance',
      label: 'Performance score',
      value: `${avgPerformance}/100`,
      trend: 12,
      description: 'Average simulated Lighthouse-oriented score across active projects.'
    },
    {
      id: 'kpi-conversion',
      label: 'Conversion rate',
      value: `${avgConversion}%`,
      trend: 15,
      description: 'Average goal conversion rate after UX and CTA optimization work.'
    },
    {
      id: 'kpi-latency',
      label: 'API latency',
      value: `${avgLatency}ms`,
      trend: -30,
      description: 'Average API latency for account and content dashboards.'
    },
    {
      id: 'kpi-release',
      label: 'Release lead time',
      value: `${releaseLeadTime}h`,
      trend: -50,
      description: 'Time from approved task to release-ready implementation.'
    }
  ];
}

export function getDashboard(segment: Segment = 'all'): DashboardResponse {
  const normalizedSegment = segments.includes(segment) ? segment : 'all';
  const filteredProjects = projects.filter((project) => projectMatchesSegment(project, normalizedSegment));
  const safeProjects = filteredProjects.length > 0 ? filteredProjects : projects;

  return {
    kpis: getKpis(safeProjects),
    projects: safeProjects,
    activity,
    segments
  };
}

export function getProject(projectId: string) {
  return projects.find((project) => project.id === projectId);
}

export function getAllExperiments() {
  return projects.flatMap((project) =>
    project.experiments.map((experiment) => ({
      ...experiment,
      projectId: project.id,
      projectName: project.name
    }))
  );
}
