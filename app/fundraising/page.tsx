import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function FundraisingPage() {
  const content = await getPageContent('fundraising');

  return (
    <PageShell>
      <div className="page-stack">
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

        <div className="fundraising-images-row">
          <section
            className="section-card fundraising-left"
            style={{ padding: 0, overflow: 'hidden' }}
          >
            <a
              href="https://www.crowdfunder.co.uk/p/platt-cricket-club-pavilion-project?_cbrk=69dea6afcd997"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
            >
              <img
                src="/images/crowdfunding.png"
                alt="Crowdfunding"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </a>
          </section>

          <section
            className="section-card fundraising-right"
            style={{ padding: 0, overflow: 'hidden' }}
          >
            <img
              src="/images/IT20.jpg"
              alt="IT20 Competition"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </section>

          <section
            className="section-card fundraising-right"
            style={{ padding: 0, overflow: 'hidden' }}
          >
            <a
              href={`/contact?subject=${encodeURIComponent(
                "I'd like to reserve a table for the quiz night"
              )}`}
              style={{ display: 'block', height: '100%' }}
            >
              <img
                src="/images/quiz_night.png"
                alt="Quiz Night"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </a>
          </section>
        </div>
      </div>
    </PageShell>
  );
}