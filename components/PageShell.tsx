import type { ReactNode } from 'react';
import { NavBanner } from './NavBanner';
import { SiteHeader } from './SiteHeader';

export async function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell">
      <SiteHeader />
      <NavBanner />
      <main className="site-wrap site-main">{children}</main>
    </div>
  );
}
