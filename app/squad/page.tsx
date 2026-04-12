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
        <p className="lead">Platt Ladies has a rapidly growing, diverse squad. Click on a player profile below to learn more about each player. We also run a player sponsorship campaign where you can sponsor a player. If you are interested in this opportunity, click on the 'Available for sponsorship button below your chosen player's profile.</p>
        <SquadGrid players={players} />
      </section>
    </PageShell>
  );
}
