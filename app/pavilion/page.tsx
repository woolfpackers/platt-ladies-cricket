import { ContentPage } from '@/components/ContentPage';
import { PageShell } from '@/components/PageShell';
import { getPageContent } from '@/lib/data';

export default async function PavilionPage() {
  const content = await getPageContent('pavilion');
  if (!content) return null;

  return (
    <PageShell>
      <ContentPage content={content} imageSrc="/images/pavilion-placeholder.jpg" imageAlt="New pavilion concept" />
    </PageShell>
  );
}
