import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/PageShell';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

const sections = [
  {
    title: 'Platt Juniors',
    href: '/juniors',
    image: '/images/club/platt_juniors_logo.png',
    accent:
      'linear-gradient(135deg, rgba(0,168,89,0.92), rgba(255,130,0,0.92), rgba(0,180,255,0.92))',
    text: 'All Stars, Dynamos and junior cricket from U9s to U15s.',
  },

  {
    title: 'Platt Ladies',
    href: '/ladies',
    image: '/images/platt-ladies/platt-logo.png',
    accent:
      'linear-gradient(135deg, rgba(255,42,161,0.92), rgba(24,119,210,0.92))',
    text: 'Women’s softball and hardball cricket for all abilities.',
  },

  {
    title: 'Development Teams',
    href: '/development',
    image: '/images/club/development_xi_logo.png',
    accent:
      'linear-gradient(135deg, rgba(0,210,170,0.92), rgba(0,110,255,0.92))',
    text: 'Creating pathways from junior and beginner cricket into adult cricket.',
  },
];

export default async function ClubHomePage() {
  const content = await getPageContent('club-home');

  return (
    <PageShell>
      <section
        className="section-card"
        style={{
          marginBottom: 20,
          padding: '20px 24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <Image
            src="/images/club/pcc_logo.jpeg"
            alt="Platt Cricket Club"
            width={110}
            height={110}
            style={{
              borderRadius: 18,
              objectFit: 'contain',
              flexShrink: 0,
            }}
            priority
          />

          <div>
            <h1
              className="page-title"
              style={{
                marginBottom: 10,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
              }}
            >
              Platt Cricket Club
            </h1>

            <p
              className="lead"
              style={{
                maxWidth: 850,
                margin: 0,
              }}
            >
              One club. Multiple pathways. Cricket for all ages, abilities and ambitions.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="section-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: 140,
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              background: section.accent,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(rgba(5,12,25,0.12), rgba(5,12,25,0.55))',
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                width: '100%',
              }}
            >
              <Image
                src={section.image}
                alt={section.title}
                width={74}
                height={74}
                style={{
                  objectFit: 'contain',
                  flexShrink: 0,
                }}
              />

              <div>
                <h2
                  style={{
                    fontSize: '1.35rem',
                    margin: '0 0 6px',
                    lineHeight: 1.2,
                  }}
                >
                  {section.title}
                </h2>

                <p
                  className="lead"
                  style={{
                    color: 'white',
                    fontSize: '0.92rem',
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {section.text}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="section-card">
        <h2
          className="small-heading"
          style={{
            marginBottom: 18,
          }}
        >
          {content?.title || 'About Platt Cricket Club'}
        </h2>

        {content?.intro && (
          <p className="lead" style={{ marginBottom: 14 }}>
            {content.intro}
          </p>
        )}

        {content?.body && (
          <p className="lead" style={{ marginBottom: 14 }}>
            {content.body}
          </p>
        )}

        {content?.body_2 && (
          <p className="lead">
            {content.body_2}
          </p>
        )}
      </section>
    </PageShell>
  );
}