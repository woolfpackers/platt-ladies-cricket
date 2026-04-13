'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Our Club', href: '/about' },
  { label: 'Squad', href: '/squad' },
  { label: 'Fixtures and Results', href: '/fixtures' },
  { label: 'Join Us', href: '/join-us' },
  { label: 'Tour', href: '/tour' },
  { label: 'Pavilion', href: '/pavilion' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Events', href: '/events' },
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
        </div>
      </div>
    </nav>
  );
}