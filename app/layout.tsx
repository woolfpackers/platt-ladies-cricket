import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { ClubNavBanner } from '@/components/ClubNavBanner';
import { ClubSiteHeader } from '@/components/ClubSiteHeader';

export const metadata: Metadata = {
  title: 'Platt Cricket Club',
  description: 'Official website of Platt Cricket Club.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();

  const pathname =
    headersList.get('x-pathname') ||
    headersList.get('next-url') ||
    '';

  const isSubsite =
    pathname.startsWith('/ladies') ||
    pathname.startsWith('/juniors') ||
    pathname.startsWith('/development');

  return (
    <html lang="en">
      <body className="club-shell">
        {!isSubsite && (
          <div className="site-fixed-header club-fixed-header">
            <ClubSiteHeader />
            <ClubNavBanner />
          </div>
        )}

        {children}
      </body>
    </html>
  );
}