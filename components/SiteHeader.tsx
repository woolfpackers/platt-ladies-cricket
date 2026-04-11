import Image from 'next/image';

export async function SiteHeader() {
  return (
    <header className="hero-banner">
      <div className="hero-banner__waves" />
      <div className="site-wrap hero-banner__content">
        <div className="hero-left">
          <img
            src="/images/platt-logo.png"
            alt="Platt Ladies Cricket Logo"
            className="logo-only__plain"
          />

          <div className="site-title-text">
            Platt Ladies Cricket
          </div>
        </div>

        <div className="hero-right">
          <div className="team-card">
            <Image
              src="/images/team-placeholder.jpg"
              alt="Platt Ladies team"
              fill
              priority
              sizes="(max-width: 980px) 34vw, 240px"
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}