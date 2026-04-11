import Link from 'next/link';

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

export async function NavBanner() {
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