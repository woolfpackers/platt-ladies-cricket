'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Club Home', href: '/' },

  { label: 'Ladies Home', href: '/ladies' },

  { label: 'Our Club', href: '/ladies/about' },
  { label: 'Squad', href: '/ladies/squad' },
  { label: 'Fixtures and Results', href: '/ladies/fixtures' },
  { label: 'Join Us', href: '/ladies/join-us' },
  { label: 'Tour', href: '/ladies/tour' },
  { label: 'Pavilion', href: '/ladies/pavilion' },
  { label: 'Sponsors', href: '/ladies/sponsors' },
  { label: 'Events', href: '/ladies/events' },
  { label: 'Gallery', href: '/ladies/gallery' },
  { label: 'Fundraising', href: '/ladies/fundraising' },
  {
    label: 'Partner With Us',
    href: '/ladies/partnership-opportunities',
  },
  { label: 'Contact', href: '/ladies/contact' },
];

export function NavBanner() {
  const pathname = usePathname();

  return (
    <nav className="nav-banner">
      <div className="site-wrap nav-banner__scroll">
        <div className="nav-banner__inner">
          {navItems.map((item) => {
            const isLadiesHome =
              item.href === '/ladies' && pathname === '/ladies';

            const isActive =
              isLadiesHome ||
              (item.href !== '/ladies' &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-pill${isActive ? ' active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}