import Link from 'next/link';
import { getNavItems } from '@/lib/data';

export async function NavBanner() {
  const navItems = await getNavItems();

  return (
    <nav className="nav-banner">
      <div className="site-wrap nav-banner__scroll">
        <div className="nav-banner__inner">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}