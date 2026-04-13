import './globals.css';
import type { Metadata } from 'next';
import { NavBanner } from '@/components/NavBanner';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Platt Ladies Cricket',
  description: 'Official website starter for Platt Ladies Cricket.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-fixed-header">
          <SiteHeader />
          <NavBanner />
        </div>
        {children}
      </body>
    </html>
  );
}