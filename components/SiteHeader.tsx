import Image from 'next/image';
import { getSiteSettings } from '@/lib/data';

export async function SiteHeader() {
  const settings = await getSiteSettings();

  return (
    <header className="hero-banner">
      <div className="hero-banner__waves" />
      <div className="site-wrap hero-banner__content">
        <div className="hero-left">
          <div className="logo-badge">
            <div className="logo-badge__inner logo-image-wrap">
              <Image
                src="/Platt Ladies logo - round 2.png"
                alt="Platt Ladies Cricket Logo"
                fill
                priority
                className="logo-image"
              />
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="team-card">
            <Image
              src="/images/team-placeholder.jpg"
              alt="Platt Ladies team"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 40vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}