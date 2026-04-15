import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent, getSponsors } from '@/lib/data';
import type { Sponsor } from '@/lib/types';

export const dynamic = 'force-dynamic';

function getMobileOrder(sponsor: Sponsor) {
  const slug = sponsor.slug.toLowerCase();
  const name = sponsor.name.toLowerCase();

  if (slug.includes('shakti') || name.includes('shakti')) return 1;
  if (slug.includes('fourways') || name.includes('fourways')) return 2;
  if (slug.includes('parkfoot') || name.includes('parkfoot')) return 3;

  return 99;
}

export default async function SponsorsPage() {
  const [pageContent, sponsors] = await Promise.all([
    getPageContent('sponsors'),
    getSponsors(),
  ]);

  const orderedSponsors = [...sponsors].sort((a, b) => {
    const aOrder = getMobileOrder(a);
    const bOrder = getMobileOrder(b);

    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.sort_order - b.sort_order;
  });

  return (
    <PageShell>
      <section className="section-card">
        <div className="sponsors-header-row">
          <div className="sponsors-header-copy">
            <SectionIntro
              title={pageContent?.title ?? 'Our Sponsors'}
              intro={
                pageContent?.intro ??
                'We are incredibly grateful to our sponsors for their support.'
              }
            />
          </div>

          <div className="sponsors-header-action">
            <Link href="/partnership-opportunities" className="button">
  Partnership Opportunities
	    </Link>
          </div>
        </div>

        {pageContent?.body && (
          <div className="body-text">
            <p>{pageContent.body}</p>
          </div>
        )}

        {pageContent?.body_2 && (
          <div className="body-text">
            <p>{pageContent.body_2}</p>
          </div>
        )}
      </section>

      <section className="sponsors-grid">
        {orderedSponsors.map((sponsor) => (
          <article
            key={sponsor.id}
            className={`section-card sponsor-card sponsor-order-${getMobileOrder(sponsor)}`}
          >
            {sponsor.logo_url ? (
              sponsor.website_url ? (
                <Link
                  href={sponsor.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-logo-link"
                >
                  <div className="sponsor-logo-wrap">
                    <Image
                      src={sponsor.logo_url}
                      alt={sponsor.title ?? sponsor.name}
                      width={220}
                      height={120}
                      className="sponsor-logo"
                    />
                  </div>
                </Link>
              ) : (
                <div className="sponsor-logo-wrap">
                  <Image
                    src={sponsor.logo_url}
                    alt={sponsor.title ?? sponsor.name}
                    width={220}
                    height={120}
                    className="sponsor-logo"
                  />
                </div>
              )
            ) : null}

            {sponsor.title && <h2 className="sponsor-title">{sponsor.title}</h2>}
            {sponsor.intro && <p className="sponsor-intro">{sponsor.intro}</p>}
            {sponsor.body && <p className="sponsor-body">{sponsor.body}</p>}
            {sponsor.body_2 && <p className="sponsor-body">{sponsor.body_2}</p>}
          </article>
        ))}
      </section>
    </PageShell>
  );
}