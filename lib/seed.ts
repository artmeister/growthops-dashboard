import type { ActivityItem, Project } from '@/lib/types';

export const projects: Project[] = [
  {
    id: 'next-growth-portal',
    name: 'Next Growth Portal',
    domain: 'portal.growthops.demo',
    segment: 'account',
    platform: 'Next.js account portal with route handlers',
    owner: 'Product platform team',
    stage: 'optimization',
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'REST API', 'SCSS', 'Analytics'],
    lastRelease: '2026-06-10',
    metrics: {
      loadTimeMs: 1320,
      conversionRate: 9.1,
      bounceRate: 29.4,
      apiLatencyMs: 170,
      releaseLeadTimeHours: 16
    },
    audit: {
      performance: 90,
      seo: 86,
      accessibility: 88,
      bestPractices: 92,
      recommendations: [
        'Keep account widgets behind client-only boundaries only when they really need browser state.',
        'Cache profile and transaction summaries for repeated visits.',
        'Add typed API error states for payment and authorization flows.'
      ]
    },
    backlog: [
      {
        id: 'task-portal-01',
        title: 'Move static account overview data into a server-rendered summary block',
        area: 'performance',
        impact: 'high',
        status: 'in-progress',
        effortHours: 8
      },
      {
        id: 'task-portal-02',
        title: 'Normalize API response contracts with zod validation',
        area: 'api',
        impact: 'high',
        status: 'todo',
        effortHours: 10
      },
      {
        id: 'task-portal-03',
        title: 'Reduce redundant account dashboard re-renders',
        area: 'ux',
        impact: 'medium',
        status: 'done',
        effortHours: 6
      }
    ],
    experiments: [
      {
        id: 'exp-portal-01',
        hypothesis: 'Shorter onboarding copy increases first account action rate.',
        variantA: 'Long onboarding checklist',
        variantB: 'Three-step setup block',
        uplift: 7.8,
        status: 'running'
      }
    ]
  },
  {
    id: 'magento-campaign-hub',
    name: 'Magento Campaign Hub',
    domain: 'campaign.growthops.demo',
    segment: 'ecommerce',
    platform: 'Magento 2 landing and product cards',
    owner: 'Growth marketing team',
    stage: 'release-ready',
    stack: ['Magento 2', 'PHP/PHTML', 'JavaScript', 'SCSS', 'GTM', 'Analytics'],
    lastRelease: '2026-06-04',
    metrics: {
      loadTimeMs: 1180,
      conversionRate: 11.9,
      bounceRate: 27.2,
      apiLatencyMs: 245,
      releaseLeadTimeHours: 12
    },
    audit: {
      performance: 92,
      seo: 94,
      accessibility: 84,
      bestPractices: 87,
      recommendations: [
        'Preload hero image and convert catalog banners to WebP.',
        'Keep JSON-LD product schema in sync with admin product data.',
        'Add custom GTM events for product-card CTA and lead forms.'
      ]
    },
    backlog: [
      {
        id: 'task-magento-01',
        title: 'Generate JSON-LD product schema from product-card data',
        area: 'seo',
        impact: 'high',
        status: 'in-progress',
        effortHours: 5
      },
      {
        id: 'task-magento-02',
        title: 'Replace duplicated campaign SCSS with reusable mixins',
        area: 'performance',
        impact: 'medium',
        status: 'done',
        effortHours: 7
      },
      {
        id: 'task-magento-03',
        title: 'Track CTA clicks, form starts and form submits in GTM',
        area: 'analytics',
        impact: 'high',
        status: 'todo',
        effortHours: 4
      }
    ],
    experiments: [
      {
        id: 'exp-magento-01',
        hypothesis: 'Moving the CTA above the product specs increases requests.',
        variantA: 'CTA after specifications',
        variantB: 'CTA in the first viewport',
        uplift: 14.6,
        status: 'won'
      }
    ]
  },
  {
    id: 'cms-content-performance',
    name: 'CMS Content Performance',
    domain: 'cms.growthops.demo',
    segment: 'cms',
    platform: 'WordPress, Joomla and Ghost content workflow',
    owner: 'Content operations team',
    stage: 'monitoring',
    stack: ['WordPress', 'Joomla', 'Ghost', 'Node.js', 'SCSS', 'GTM', 'Analytics'],
    lastRelease: '2026-06-08',
    metrics: {
      loadTimeMs: 1350,
      conversionRate: 6.7,
      bounceRate: 34.5,
      apiLatencyMs: 310,
      releaseLeadTimeHours: 14
    },
    audit: {
      performance: 86,
      seo: 90,
      accessibility: 88,
      bestPractices: 85,
      recommendations: [
        'Lazy-load embeds below the article intro.',
        'Replace editor-specific inline styles with theme-level SCSS tokens.',
        'Add internal-link suggestions based on topic clusters.'
      ]
    },
    backlog: [
      {
        id: 'task-cms-01',
        title: 'Create reusable content blocks for lead magnets',
        area: 'ux',
        impact: 'medium',
        status: 'todo',
        effortHours: 6
      },
      {
        id: 'task-cms-02',
        title: 'Compress legacy article images and generate WebP variants',
        area: 'performance',
        impact: 'high',
        status: 'done',
        effortHours: 9
      },
      {
        id: 'task-cms-03',
        title: 'Add Open Graph and canonical URL validation checks',
        area: 'seo',
        impact: 'medium',
        status: 'in-progress',
        effortHours: 4
      }
    ],
    experiments: [
      {
        id: 'exp-cms-01',
        hypothesis: 'Inline lead block after paragraph three improves demo requests.',
        variantA: 'Sidebar form only',
        variantB: 'Inline contextual form',
        uplift: 10.2,
        status: 'running'
      }
    ]
  }
];

export const activity: ActivityItem[] = [
  {
    id: 'activity-01',
    date: '2026-06-10',
    title: 'Moved dashboard shell to Next.js App Router',
    description: 'Initial data is server-rendered, while filtering and audit simulation stay interactive on the client.',
    area: 'release'
  },
  {
    id: 'activity-02',
    date: '2026-06-08',
    title: 'Released CMS image optimization pack',
    description: 'Compressed legacy images and enabled WebP variants for article cards.',
    area: 'performance'
  },
  {
    id: 'activity-03',
    date: '2026-06-04',
    title: 'Shipped Magento campaign CTA experiment',
    description: 'Promoted primary CTA into the first viewport and attached GTM events.',
    area: 'analytics'
  },
  {
    id: 'activity-04',
    date: '2026-05-28',
    title: 'Refactored account portal data loading',
    description: 'Reduced duplicate requests and improved typed error handling for REST API calls.',
    area: 'api'
  }
];
