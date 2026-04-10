import { PageShell } from '@/components/PageShell';
import { EventsGrid } from '@/components/EventsGrid';
import { getEvents, getPageContent } from '@/lib/data';

export default async function EventsPage() {
  const events = await getEvents();
  const content = await getPageContent('events');

  return (
    <PageShell>
      <section className="section-card">
        <h1 className="page-title">{content?.title || 'Events'}</h1>
        <p className="lead">{content?.intro}</p>
        <EventsGrid events={events} />
      </section>
    </PageShell>
  );
}
