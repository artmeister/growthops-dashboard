export type Segment = 'all' | 'seo' | 'paid' | 'cms' | 'ecommerce' | 'account';

export type StackItem =
  | 'JavaScript'
  | 'React'
  | 'Next.js'
  | 'TypeScript'
  | 'Node.js'
  | 'PHP/PHTML'
  | 'Magento 2'
  | 'Joomla'
  | 'WordPress'
  | 'Ghost'
  | 'REST API'
  | 'SCSS'
  | 'GTM'
  | 'Analytics';

export type ProjectStage = 'discovery' | 'optimization' | 'release-ready' | 'monitoring';

export type TaskArea = 'performance' | 'seo' | 'analytics' | 'ux' | 'api' | 'release';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Impact = 'low' | 'medium' | 'high';

export interface Kpi {
  id: string;
  label: string;
  value: string;
  trend: number;
  description: string;
}

export interface MetricSnapshot {
  loadTimeMs: number;
  conversionRate: number;
  bounceRate: number;
  apiLatencyMs: number;
  releaseLeadTimeHours: number;
}

export interface AuditSnapshot {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  recommendations: string[];
}

export interface OptimizationTask {
  id: string;
  title: string;
  area: TaskArea;
  impact: Impact;
  status: TaskStatus;
  effortHours: number;
}

export interface Experiment {
  id: string;
  hypothesis: string;
  variantA: string;
  variantB: string;
  uplift: number;
  status: 'draft' | 'running' | 'won' | 'lost';
}

export interface ActivityItem {
  id: string;
  date: string;
  title: string;
  description: string;
  area: TaskArea;
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  segment: Exclude<Segment, 'all'>;
  platform: string;
  owner: string;
  stage: ProjectStage;
  stack: StackItem[];
  metrics: MetricSnapshot;
  audit: AuditSnapshot;
  backlog: OptimizationTask[];
  experiments: Experiment[];
  lastRelease: string;
}

export interface DashboardResponse {
  kpis: Kpi[];
  projects: Project[];
  activity: ActivityItem[];
  segments: Segment[];
}

export interface AuditRequest {
  url: string;
  stack: string[];
  hasServerRendering: boolean;
  imageOptimization: boolean;
  trackingDepth: 'basic' | 'events' | 'funnel';
}

export interface AuditMetric {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
}

export interface AuditResult {
  url: string;
  overallScore: number;
  summary: string;
  metrics: AuditMetric[];
  recommendations: string[];
}

export interface ApiError {
  message: string;
  details?: unknown;
}
