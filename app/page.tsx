import { DashboardClient } from '@/components/dashboard-client';
import { getDashboard } from '@/lib/dashboard';

export default function HomePage() {
  const initialDashboard = getDashboard('all');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GrowthOps Dashboard',
    applicationCategory: 'BusinessApplication',
    description: 'A Next.js dashboard for performance, SEO, analytics and conversion optimization workflows.',
    operatingSystem: 'Web'
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DashboardClient initialDashboard={initialDashboard} />
    </>
  );
}
