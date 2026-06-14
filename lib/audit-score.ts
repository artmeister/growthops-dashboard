import type { AuditMetric, AuditRequest, AuditResult } from '@/lib/types';

function normalizeUrl(value: string) {
  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    return url.toString();
  } catch {
    return value;
  }
}

function hasStack(stack: string[], item: string) {
  return stack.some((entry) => entry.toLowerCase().includes(item.toLowerCase()));
}

function metric(label: string, value: string, status: AuditMetric['status']): AuditMetric {
  return { label, value, status };
}

export function calculateAudit(input: AuditRequest): AuditResult {
  const normalizedUrl = normalizeUrl(input.url);
  let score = 62;
  const recommendations: string[] = [];

  if (input.imageOptimization) {
    score += 12;
  } else {
    recommendations.push('Convert heavy raster assets to WebP/AVIF and lazy-load below-the-fold images.');
  }

  if (input.hasServerRendering) {
    score += 10;
  } else {
    recommendations.push('Pre-render SEO-critical landing content or add server-rendered fallback markup.');
  }

  if (input.trackingDepth === 'funnel') {
    score += 9;
  } else if (input.trackingDepth === 'events') {
    score += 5;
    recommendations.push('Connect isolated events into funnel-level conversion reporting.');
  } else {
    recommendations.push('Add GTM events for CTA clicks, form starts, submits and validation errors.');
  }

  if (hasStack(input.stack, 'next')) {
    score += 5;
    recommendations.push('Use route-level metadata and keep client components limited to interactive widgets.');
  } else if (hasStack(input.stack, 'react')) {
    score += 4;
    recommendations.push('Review memoization boundaries and split non-critical widgets by route.');
  }

  if (hasStack(input.stack, 'magento') || hasStack(input.stack, 'wordpress') || hasStack(input.stack, 'joomla')) {
    score += 3;
    recommendations.push('Keep CMS templates modular and prevent editor-generated inline style bloat.');
  }

  const overallScore = Math.min(98, score);
  const estimatedLcp = input.imageOptimization ? '1.8s' : '3.4s';
  const estimatedBundle = hasStack(input.stack, 'next') ? '192kb' : hasStack(input.stack, 'react') ? '248kb' : '186kb';
  const trackingStatus = input.trackingDepth === 'funnel' ? 'good' : input.trackingDepth === 'events' ? 'warning' : 'critical';

  return {
    url: normalizedUrl,
    overallScore,
    summary:
      overallScore >= 85
        ? 'Project is close to release quality. Focus on small SEO, tracking and render-path improvements.'
        : 'Project needs focused optimization before it can be positioned as conversion-ready.',
    metrics: [
      metric('Estimated LCP', estimatedLcp, input.imageOptimization ? 'good' : 'critical'),
      metric('Bundle pressure', estimatedBundle, hasStack(input.stack, 'next') ? 'good' : 'warning'),
      metric('Tracking coverage', input.trackingDepth, trackingStatus),
      metric('Server-rendered content', input.hasServerRendering ? 'enabled' : 'missing', input.hasServerRendering ? 'good' : 'warning')
    ],
    recommendations
  };
}
