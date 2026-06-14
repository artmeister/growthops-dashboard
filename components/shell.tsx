import type { ReactNode } from 'react';

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="shell">
      <header className="hero">
        <div>
          <span className="eyebrow">Next.js full-stack portfolio project</span>
          <h1>GrowthOps Dashboard</h1>
          <p>
            A product-style dashboard for improving landing pages, CMS templates, account portals, SEO tracking and
            conversion-oriented releases.
          </p>
        </div>
        <aside className="hero__stack" aria-label="Project technologies">
          <span>Next.js</span>
          <span>React</span>
          <span>TypeScript</span>
          <span>Route handlers</span>
          <span>SCSS</span>
        </aside>
      </header>
      {children}
    </div>
  );
}
