import { PageShell } from '@/components/PageShell';
import { getNewsItems, getPageContent, getPageSections, getUpcomingItems } from '@/lib/data';
export const revalidate = 60;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });
}

export default async function HomePage() {
  const content = await getPageContent('home');
  const sections = await getPageSections('home');
  const newsItems = await getNewsItems();
  const upcomingItems = await getUpcomingItems(5);

  return (
    <PageShell>
      <section className="section-card" style={{ marginBottom: 16, padding: 18 }}>
        <h1 className="page-title" style={{ fontSize: 28, marginBottom: 8 }}>
          {content?.title || 'Welcome to Platt Ladies Cricket'}
        </h1>

        {content?.intro ? (
          <p className="lead" style={{ marginBottom: 6 }}>
            {content.intro}
          </p>
        ) : null}

        {content?.body ? (
          <p className="lead" style={{ marginBottom: 10, fontSize: 14 }}>
            {content.body}
          </p>
        ) : null}

        <div className="grid-3" style={{ marginTop: 12 }}>
          {sections.map((section) => (
            <div key={section.section_key} className="content-panel" style={{ padding: 16 }}>
              <h2 className="small-heading" style={{ marginBottom: 6 }}>
                {section.heading}
              </h2>
              <p className="lead" style={{ fontSize: 14 }}>
                {section.body}
              </p>
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
          <h2 className="small-heading">Coming Up Next</h2>
          <p className="lead">
            The next five fixtures, training sessions and club events.
          </p>

          <div style={{ display: 'grid', gap: 14 }}>
            {upcomingItems.length > 0 ? (
              upcomingItems.map((item, index) => (
                <div key={`${item.item_type}-${item.id}`} className="content-panel" style={{ padding: 18 }}>
                  <strong>
                    [{item.item_type === 'fixture' ? `Fixture ${index + 1}` : `Event ${index + 1}`}] {formatDate(item.item_datetime)} - {item.title}
                  </strong>

                  <p className="footer-note" style={{ marginTop: 12, marginBottom: 0 }}>
                    {[item.location_text, formatTime(item.item_datetime)]
                      .filter(Boolean)
                      .join(', ')}
                  </p>

                  {item.link_url ? (
                    <div style={{ marginTop: 14 }}>
                      <a
                        className="button-link"
                        href={item.link_url}
                        target={item.link_url.startsWith('http') ? '_blank' : undefined}
                        rel={item.link_url.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        View details
                      </a>
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="content-panel" style={{ padding: 18 }}>
                <strong>No upcoming items</strong>
                <p className="footer-note" style={{ marginTop: 12, marginBottom: 0 }}>
                  Add future fixtures or events in the database and they will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}