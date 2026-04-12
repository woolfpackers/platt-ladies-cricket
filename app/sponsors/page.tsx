import { PageShell } from '@/components/PageShell';
import { SponsorsGrid } from '@/components/SponsorsGrid';
import { getSponsors } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <PageShell>
      <section className="section-card">
        <h1 className="page-title">Sponsors</h1>
        <p className="lead">Main sponsors, supporting partners and future sponsorship listings all live here.</p>
        <SponsorsGrid sponsors={sponsors} />
      </section>
    </PageShell>
  );
}
