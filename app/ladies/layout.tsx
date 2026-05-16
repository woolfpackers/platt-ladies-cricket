import type { Metadata } from 'next';

import { NavBanner } from '@/components/NavBanner';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Platt Ladies Cricket',
  description: 'Official website starter for Platt Ladies Cricket.',
};

export default function LadiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ladies-shell">
      <div className="site-fixed-header site-fixed-header--ladies">
        <SiteHeader />
        <NavBanner />
      </div>

      {children}
    </div>
  );
}