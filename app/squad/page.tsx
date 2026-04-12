import { PageShell } from '@/components/PageShell';
import { SquadGrid } from '@/components/SquadGrid';
import { getPlayers } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function SquadPage() {
  const players = await getPlayers();
  return (
    <PageShell>
      <section className="section-card">
        <h1 className="page-title">Squad</h1>
        <p className="lead">Your live squad list is now loaded from the spreadsheet-backed dataset. Each card is ready for a player photo, sponsorship status, and 2026 batting and bowling totals.</p>
        <SquadGrid players={players} />
      </section>
    </PageShell>
  );
}
