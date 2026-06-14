'use client';

import { useState, type FormEvent } from 'react';
import type { ApiError, AuditRequest, AuditResult } from '@/lib/types';
import { StatusBadge } from '@/components/status-badge';

const defaultStack = ['Next.js', 'React', 'Node.js', 'CMS'];

async function createAudit(payload: AuditRequest) {
  const response = await fetch('/api/audits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-demo-user': 'github-visitor'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => ({ message: response.statusText }))) as ApiError;
    throw new Error(error.message ?? 'Audit failed');
  }

  return (await response.json()) as AuditResult;
}

export function AuditPanel() {
  const [result, setResult] = useState<AuditResult>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [url, setUrl] = useState('https://campaign.growthops.demo');
  const [stack, setStack] = useState(defaultStack.join(', '));
  const [hasServerRendering, setHasServerRendering] = useState(true);
  const [imageOptimization, setImageOptimization] = useState(true);
  const [trackingDepth, setTrackingDepth] = useState<AuditRequest['trackingDepth']>('events');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(undefined);

    try {
      const audit = await createAudit({
        url,
        stack: stack
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        hasServerRendering,
        imageOptimization,
        trackingDepth
      });

      setResult(audit);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Audit failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel audit-panel">
      <div className="panel__heading">
        <span>Landing audit simulator</span>
        <small>Route Handler POST</small>
      </div>

      <form className="audit-form" onSubmit={submit}>
        <label>
          Project URL
          <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" />
        </label>
        <label>
          Stack
          <input value={stack} onChange={(event) => setStack(event.target.value)} placeholder="Next.js, React, Magento" />
        </label>
        <div className="audit-form__grid">
          <label className="check-row">
            <input
              checked={hasServerRendering}
              type="checkbox"
              onChange={(event) => setHasServerRendering(event.target.checked)}
            />
            SEO-critical content is rendered
          </label>
          <label className="check-row">
            <input
              checked={imageOptimization}
              type="checkbox"
              onChange={(event) => setImageOptimization(event.target.checked)}
            />
            Images are optimized
          </label>
        </div>
        <label>
          Tracking maturity
          <select value={trackingDepth} onChange={(event) => setTrackingDepth(event.target.value as AuditRequest['trackingDepth'])}>
            <option value="basic">Basic page views</option>
            <option value="events">Events</option>
            <option value="funnel">Full funnel</option>
          </select>
        </label>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Running audit...' : 'Run audit'}
        </button>
      </form>

      {error ? <p className="error-message">{error}</p> : null}

      {result ? (
        <div className="audit-result">
          <div className="audit-result__score">
            <span>Score</span>
            <strong>{result.overallScore}</strong>
          </div>
          <div>
            <strong>{result.url}</strong>
            <p>{result.summary}</p>
          </div>
          <div className="audit-result__metrics">
            {result.metrics.map((metric) => (
              <article key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <StatusBadge tone={metric.status}>{metric.status}</StatusBadge>
              </article>
            ))}
          </div>
          <ul className="recommendations">
            {result.recommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
