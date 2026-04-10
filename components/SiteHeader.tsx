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
            <div className="logo-badge__inner">
              <div>
                Platt Ladies
                <br />
                Cricket
              </div>
            </div>
          </div>

          <div className="oval-card">
            <h1>{settings.clubName}</h1>
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
            <div className="team-title-pill">Platt Ladies</div>
          </div>
        </div>
      </div>
    </header>
  );
}