'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { navItems } from '@/lib/nav';

export function NavBanner() {
  const pathname = usePathname();

  return (
    <nav className="nav-banner" aria-label="Main navigation">
      <div className="nav-banner__inner">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={clsx('nav-pill', active && 'active')}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
