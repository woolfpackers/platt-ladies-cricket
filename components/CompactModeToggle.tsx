'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/ladies/' },
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
  { label: 'Partner With Us', href: '/ladies/partnership-opportunities' },
  { label: 'Contact', href: '/ladies/contact' },
];

export function NavBanner() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('navBannerScroll');

    if (scrollRef.current && savedScroll !== null) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = Number(savedScroll);
        }
      });
    }
  }, [pathname]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      sessionStorage.setItem('navBannerScroll', String(el.scrollLeft));
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="nav-banner">
      <div ref={scrollRef} className="site-wrap nav-banner__scroll">
        <div className="nav-banner__inner">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

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

          <CompactModeToggle />
        </div>
      </div>
    </nav>
  );
}