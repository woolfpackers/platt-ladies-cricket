import Image from 'next/image';

export async function SiteHeader() {
  return (
    <header className="hero-banner">
      <div className="hero-banner__waves" />
      <div className="site-wrap hero-banner__content">
        <div className="hero-left">
          <div className="logo-only">
            <Image
              src="/platt-logo.png"
              alt="Platt Ladies Cricket Logo"
              width={90}
              height={90}
              priority
              className="logo-only__image"
            />
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