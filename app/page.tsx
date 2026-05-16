import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/PageShell';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

const sections = [
  {
    title: 'Platt Juniors',
    href: '/juniors',
    image: '/images/club/platt-juniors-logo.png',
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
    image: '/images/club/development-xi-logo.png',
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
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 18,
          }}
        >
          <Image
            src="/images/club/pcc-logo.jpeg"
            alt="Platt Cricket Club"
            width={105}
            height={105}
            style={{
              borderRadius: 24,
              objectFit: 'contain',
            }}
            priority
          />
        </div>

        <h1
          className="page-title"
          style={{
            marginBottom: 12,
          }}
        >
          Platt Cricket Club
        </h1>

        <p
          className="lead"
          style={{
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          One club. Multiple pathways. Cricket for all ages, abilities and ambitions.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 18,
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
              minHeight: 240,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: section.accent,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(rgba(5,12,25,0.18), rgba(5,12,25,0.72))',
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                marginTop: 12,
              }}
            >
              <Image
                src={section.image}
                alt={section.title}
                width={105}
                height={105}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 2,
              }}
            >
              <h2
                style={{
                  fontSize: '1.55rem',
                  marginBottom: 10,
                }}
              >
                {section.title}
              </h2>

              <p
                className="lead"
                style={{
                  color: 'white',
                }}
              >
                {section.text}
              </p>
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