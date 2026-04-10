import { ContentPage } from '@/components/ContentPage';
import { PageShell } from '@/components/PageShell';
import { getPageContent } from '@/lib/data';

export default async function TourPage() {
  const content = await getPageContent('tour');
  if (!content) return null;

  return (
    <PageShell>
      <ContentPage content={content} imageSrc="/images/tour-placeholder.jpg" imageAlt="Baltic Bash tour" />
    </PageShell>
  );
}
