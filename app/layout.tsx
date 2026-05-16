import './globals.css';
import type { Metadata } from 'next';
import { ClubNavBanner } from '@/components/ClubNavBanner';
import { ClubSiteHeader } from '@/components/ClubSiteHeader';

export const metadata: Metadata = {
  title: 'Platt Ladies Cricket',
  description: 'Official website starter for Platt Ladies Cricket.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-fixed-header">
          <ClubSiteHeader />
          <ClubNavBanner />
        </div>
        {children}
      </body>
    </html>
  );
}