import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';
import { It20Overlay } from '@/components/It20Overlay';

export const dynamic = 'force-dynamic';

export default async function FundraisingPage({
  searchParams,
}: {
  searchParams: Promise<{ it20?: string }>;
}) {
  const { it20 } = await searchParams;
  const showIt20Overlay = it20 === 'true';

  const content = await getPageContent('fundraising');

  return (
    <PageShell>
      {showIt20Overlay ? <It20Overlay /> : null}
      <div className="fundraising-page-layout">
        <section className="section-card">
          {content ? (
            <div className="content-copy">
              <SectionIntro
                title={content.title ?? 'Fundraising'}
                intro={content.intro ?? ''}
              />

              {content.body && (
                <div className="body-text">
                  <p>{content.body}</p>
                </div>
              )}

              {content.body_2 && (
                <div className="body-text">
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
              <h1 className="page-title page-title--main">Fundraising</h1>
              <div className="body-text">
                <p>
                  Support our new pavilion project and be in with a chance to win two England Women’s IT20 tickets.
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="fundraising-media-column">
          <div className="section-card fundraising-image-card">
            <a
              href="https://www.crowdfunder.co.uk/p/platt-cricket-club-pavilion-project?_cbrk=69dea6afcd997"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/crowdfunding.png" alt="Crowdfunding" />
            </a>
          </div>

          <div className="fundraising-small-images-row">
            <div className="section-card fundraising-image-card">
              <a href="/fundraising?it20=true">
                <img src="/images/IT20.jpg" alt="IT20 Competition" />
              </a>
            </div>

            <div className="section-card fundraising-image-card">
              <a
                href={`/contact?subject=${encodeURIComponent(
                  "I'd like to reserve a table for the quiz night"
                )}`}
              >
                <img src="/images/quiz_night.jpg" alt="Quiz Night" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}