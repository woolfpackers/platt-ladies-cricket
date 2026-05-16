import './globals.css';
import type { Metadata } from 'next';

import { ClubNavBanner } from '@/components/ClubNavBanner';
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
    <>
      <div className="site-fixed-header">
        <SiteHeader />
        <ClubNavBanner />
      </div>

      {children}
    </>
  );
}