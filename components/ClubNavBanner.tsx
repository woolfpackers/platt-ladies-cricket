'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },

  { label: 'Juniors', href: '/juniors' },
  { label: 'Ladies', href: '/ladies' },
  { label: 'Development', href: '/development' },

  { label: 'Join Us', href: '/join-us' },
  { label: 'Pavilion', href: '/pavilion' },

  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },

  { label: 'Fundraising', href: '/fundraising' },

  {
    label: 'Partner With Us',
    href: '/partnership-opportunities',
  },

  { label: 'Contact', href: '/contact' },
];

export function ClubNavBanner() {
  const pathname = usePathname();

  return (
    <nav className="nav-banner">
      <div className="site-wrap nav-banner__scroll">
        <div className="nav-banner__inner">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' &&
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