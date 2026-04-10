import { ContentPage } from '@/components/ContentPage';
import { PageShell } from '@/components/PageShell';
import { getPageContent } from '@/lib/data';

export default async function JoinUsPage() {
  const content = await getPageContent('join-us');
  if (!content) return null;

  return (
    <PageShell>
      <ContentPage content={content} imageSrc="/images/recruitment-flyer-placeholder.jpg" imageAlt="Recruitment flyer" />
    </PageShell>
  );
}
