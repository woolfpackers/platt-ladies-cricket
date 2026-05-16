import './globals.css';
import type { Metadata } from 'next';

import { ClubNavBanner } from '@/components/ClubNavBanner';
import { ClubSiteHeader } from '@/components/ClubSiteHeader';

export const metadata: Metadata = {
  title: 'Platt Cricket Club',
  description: 'Official website of Platt Cricket Club.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="club-shell">
        <div className="site-fixed-header club-fixed-header">
          <ClubSiteHeader />
          <ClubNavBanner />
        </div>

        {children}
      </body>
    </html>
  );
}