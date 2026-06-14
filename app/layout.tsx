import type { Metadata, Viewport } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'GrowthOps Dashboard — Next.js Portfolio Project',
  description:
    'A full-stack Next.js dashboard for performance, SEO, analytics, A/B experiments and CMS/e-commerce optimization work.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    title: 'GrowthOps Dashboard',
    description: 'Next.js full-stack portfolio project for growth, SEO and web performance workflows.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
