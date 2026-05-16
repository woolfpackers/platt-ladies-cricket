import Image from 'next/image';
import Link from 'next/link';

export function ClubSiteHeader() {
  return (
    <header className="hero-banner hero-banner--club">
      <div className="hero-banner__content site-wrap">
        <Link
          href="/"
          className="hero-left"
          aria-label="Platt Cricket Club home"
        >
          <Image
            src="/images/club/pcc-logo.jpeg"
            alt="Platt Cricket Club"
            width={64}
            height={64}
            className="logo-only__plain"
            priority
          />

          <div>
            <div className="site-title-text">
              Platt Cricket Club
            </div>

            <div
              style={{
                color: 'rgba(255,255,255,0.82)',
                fontSize: '0.9rem',
                marginTop: 4,
                letterSpacing: '0.02em',
              }}
            >
              Juniors • Ladies • Development
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}