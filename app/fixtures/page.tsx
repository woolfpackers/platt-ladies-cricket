import { PageShell } from '@/components/PageShell';
import { FixturesResultsView } from '@/components/FixturesResultsView';
import { getFixtures } from '@/lib/data';

export default async function FixturesPage() {
  const fixtures = await getFixtures();
  return (
    <PageShell>
      <FixturesResultsView fixtures={fixtures} />
    </PageShell>
  );
}
