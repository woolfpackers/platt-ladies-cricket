import { ContentPage } from '@/components/ContentPage';
import { PageShell } from '@/components/PageShell';
import { getPageContent } from '@/lib/data';

export default async function AboutPage() {
  const content = await getPageContent('about');
  if (!content) return null;

  return (
    <PageShell>
      <ContentPage content={content} imageSrc="/images/frances-placeholder.jpg" imageAlt="Frances Heron Maxwell themed artwork" />
    </PageShell>
  );
}
