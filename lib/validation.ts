import { z } from 'zod';

export const auditSchema = z.object({
  url: z.string().min(3, 'URL is required'),
  stack: z.array(z.string()).default([]),
  hasServerRendering: z.boolean().default(false),
  imageOptimization: z.boolean().default(false),
  trackingDepth: z.enum(['basic', 'events', 'funnel']).default('basic')
});

export const experimentSchema = z.object({
  projectId: z.string().min(1),
  hypothesis: z.string().min(8),
  variantA: z.string().min(2),
  variantB: z.string().min(2)
});
