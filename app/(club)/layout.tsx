import { ClubNavBanner } from '@/components/ClubNavBanner';
import { ClubSiteHeader } from '@/components/ClubSiteHeader';

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="site-fixed-header">
        <ClubSiteHeader />
        <ClubNavBanner />
      </div>

      {children}
    </>
  );
}