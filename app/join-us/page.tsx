import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function JoinUsPage() {
  const content = await getPageContent('join-us');

  const joinUsContactUrl = `/contact?subject=${encodeURIComponent(
    'New enquiry: Joining Platt Ladies'
  )}`;

  return (
    <PageShell>
      <div className="two-col">
        <section className="section-card">
          {content ? (
            <div className="content-copy">
              <SectionIntro
                title={content.title ?? 'Join Platt Ladies Cricket'}
                intro={content.intro ?? ''}
                ctaLabel={content.cta_label}
                ctaUrl={joinUsContactUrl}
              />

              {content.body && (
                <div className="body-text">
                  <p>{content.body}</p>
                </div>
              )}

              {content.body_2 && (
                <div className="body-text body-2-mobile-hide">
                  <p>{content.body_2}</p>
                </div>
              )}

              {content.body_3 && (
                <div className="body-text body-2-mobile-hide">
                  <p>{content.body_3}</p>
                </div>
              )}

              {content.body_4 && (
                <div className="body-text body-2-mobile-hide">
                  <p>{content.body_4}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="content-copy">
              <h1 className="page-title page-title--main">Join Platt Ladies Cricket</h1>
              <div className="body-text">
                <p>New players always welcome — no experience needed!</p>
              </div>
            </div>
          )}
        </section>

        <aside>
          {content?.image_url ? (
            <Image
              src={content.image_url}
              alt={content.image_alt || 'Join Platt Ladies Cricket'}
              width={900}
              height={650}
              className="about-image-only"
              priority
            />
          ) : null}
        </aside>
      </div>
    </PageShell>
  );
}