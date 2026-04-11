import { PageShell } from '@/components/PageShell';
import { getPageContent, getPageSections } from '@/lib/data';

export default async function HomePage() {
  const content = await getPageContent('home');
  const sections = await getPageSections('home');

  return (
    <PageShell>
      <section className="section-card" style={{ marginBottom: 24 }}>
        <h1 className="page-title">{content?.title || 'Welcome to Platt Ladies Cricket'}</h1>

        {content?.intro ? <p className="lead">{content.intro}</p> : null}
        {content?.body ? <p className="lead">{content.body}</p> : null}

        <div className="grid-3" style={{ marginTop: 24 }}>
          {sections.map((section) => (
            <div key={section.section_key} className="content-panel" style={{ padding: 22 }}>
              <h2 className="small-heading">{section.heading}</h2>
              <p className="lead">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="two-col">
        <div className="section-card">
          <h2 className="small-heading">Latest News</h2>
          <p className="lead">
            Keep supporters up to date with what is happening at Platt Ladies Cricket.
          </p>

          <div style={{ display: 'grid', gap: 14 }}>
            <div className="content-panel" style={{ padding: 18 }}>
              <strong>Latest News Item 1</strong>
              <p className="footer-note" style={{ marginBottom: 0 }}>
                Add your latest update here, such as upcoming fixtures, recruitment news, tournament plans,
                training updates, events, fundraising activity or club achievements.
              </p>
            </div>

            <div className="content-panel" style={{ padding: 18 }}>
              <strong>Latest News Item 2</strong>
              <p className="footer-note" style={{ marginBottom: 0 }}>
                Use this section to highlight anything exciting coming up for the team and wider club.
              </p>
            </div>

            <div className="content-panel" style={{ padding: 18 }}>
              <strong>Latest News Item 3</strong>
              <p className="footer-note" style={{ marginBottom: 0 }}>
                This can later be made fully database-driven if you want a proper news feed or blog section.
              </p>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="small-heading">What this upgraded starter includes</h2>
          <p className="lead">
            Reusable header and links banner, database-driven fixtures and results, player sponsorships, sponsor listings,
            event cards, page section storage, site settings, and an admin starter page so the structure is ready for a full CMS.
          </p>
        </div>
      </section>
    </PageShell>
  );
}