import type { ReactNode } from 'react';

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="shell">
      <header className="app-header">
        <div className="brand-lockup" aria-label="GrowthOps Dashboard">
          <span className="brand-mark" aria-hidden="true">
            GO
          </span>
          <div>
            <strong>GrowthOps Dashboard</strong>
            <span>Portfolio project</span>
          </div>
        </div>
        <nav className="app-nav" aria-label="Dashboard sections">
          <a href="#projects">Projects</a>
          <a href="#audit">Audit</a>
          <a href="#timeline">Timeline</a>
        </nav>
        <div className="app-header__status" aria-label="Platform status">
          <span>Next.js App Router</span>
          <strong>Live demo</strong>
        </div>
      </header>

      <header className="hero">
        <div className="hero__content">
          <h1>Release health, experiments and audit signals in one workspace.</h1>
          <p>
            Track landing pages, CMS templates, account portals, SEO quality and conversion-oriented releases through a
            focused product dashboard.
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
