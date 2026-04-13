import type { ReactNode } from 'react';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell">
      <main className="site-main">
        <div className="site-wrap">{children}</div>
      </main>
    </div>
  );
}