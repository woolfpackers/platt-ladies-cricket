import { PageShell } from '@/components/PageShell';
import { getNewsItems, getPageContent, getPageSections } from '@/lib/data';

export default async function HomePage() {
  const content = await getPageContent('home');
  const sections = await getPageSections('home');
  const newsItems = await getNewsItems();

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
            Keep supporters up to date with the latest from Platt Ladies Cricket.
          </p>

          <div style={{ display: 'grid', gap: 14 }}>
            {newsItems.length > 0 ? (
              newsItems.map((item) => (
                <div key={item.id} className="content-panel" style={{ padding: 18 }}>
                  <strong>{item.title}</strong>

                  {item.paragraph_1 ? (
                    <p className="footer-note" style={{ marginTop: 12, marginBottom: 0 }}>
                      {item.paragraph_1}
                    </p>
                  ) : null}

                  {item.paragraph_2 ? (
                    <p className="footer-note" style={{ marginTop: 12, marginBottom: 0 }}>
                      {item.paragraph_2}
                    </p>
                  ) : null}

                  {item.paragraph_3 ? (
                    <p className="footer-note" style={{ marginTop: 12, marginBottom: 0 }}>
                      {item.paragraph_3}
                    </p>
                  ) : null}

                  {item.link_url ? (
                    <div style={{ marginTop: 14 }}>
                      <a
                        className="button-link"
                        href={item.link_url}
                        target={item.link_url.startsWith('http') ? '_blank' : undefined}
                        rel={item.link_url.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        {item.button_label || 'Read more'}
                      </a>
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="content-panel" style={{ padding: 18 }}>
                <strong>No news items yet</strong>
                <p className="footer-note" style={{ marginTop: 12, marginBottom: 0 }}>
                  Add a published row to the news_items table in Supabase and it will appear here.
                </p>
              </div>
            )}
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