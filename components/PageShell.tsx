import type { ReactNode } from 'react';
import { NavBanner } from './NavBanner';
import { SiteHeader } from './SiteHeader';

export async function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell">
      <div className="site-fixed-header">
        <SiteHeader />
        <NavBanner />
      </div>

      <main className="site-wrap site-main">{children}</main>
    </div>
  );
}