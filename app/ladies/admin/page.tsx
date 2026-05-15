import { PageShell } from '@/components/PageShell';
import { AdminSummary } from '@/components/AdminSummary';

export default function AdminPage() {
  return (
    <PageShell>
      <section className="section-card" style={{ marginBottom: 24 }}>
        <h1 className="page-title">Admin starter area</h1>
        <p className="lead">
          This gives you a clear structure for what should be edited in Supabase Studio or a future custom admin panel.
          The database schema is already separated into reusable content areas so it can evolve into a full CMS.
        </p>
      </section>

      <section className="cards-grid">
        <AdminSummary title="Page content" description="Edit reusable page intros, body text, CTA buttons and SEO text in page_content and page_sections." />
        <AdminSummary title="Squad" description="Add players in players, then link sponsors in player_sponsorships so sponsorship status updates automatically on the squad page." />
        <AdminSummary title="Fixtures and results" description="Manage seasons, competitions, teams, venues and fixtures_results separately so filters work without duplicated data." />
        <AdminSummary title="Sponsors" description="Store your sponsors once and reuse them across the sponsors page, squad sponsorships and future event support." />
        <AdminSummary title="Events" description="Publish or draft club events using the events table. The public page shows only published items." />
        <AdminSummary title="Site settings" description="Store core club identity, contact details and hero text in site_settings for simple global updates." />
      </section>
    </PageShell>
  );
}
