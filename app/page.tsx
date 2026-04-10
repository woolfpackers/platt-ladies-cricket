import { PageShell } from '@/components/PageShell';
import { getPageContent, getPageSections, getSponsors } from '@/lib/data';

export default async function HomePage() {
  const content = await getPageContent('home');
  const sponsors = await getSponsors();
  const sections = await getPageSections('home');

  return (
    <PageShell>
      <section className="section-card" style={{ marginBottom: 24 }}>
        <h1 className="page-title">{content?.title || 'Welcome to Platt Ladies Cricket'}</h1>
        <p className="lead">{content?.intro}</p>
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
          <h2 className="small-heading">Featured sponsors</h2>
          <p className="lead">Your main sponsor area is ready and can be managed from the database.</p>
          <div style={{ display: 'grid', gap: 14 }}>
            {sponsors.slice(0, 3).map((sponsor) => (
              <div key={sponsor.id} className="content-panel" style={{ padding: 18 }}>
                <strong>{sponsor.name}</strong>
                <p className="footer-note" style={{ marginBottom: 0 }}>{sponsor.description}</p>
              </div>
            ))}
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
