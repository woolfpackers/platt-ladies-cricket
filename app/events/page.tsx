import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent, getPublishedEvents } from '@/lib/data';
import type { EventItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

function formatEventDate(dateString?: string | null) {
  if (!dateString) return 'Date TBC';

  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(date);
}

function formatEventTime(timeString?: string | null) {
  if (!timeString) return 'Time TBC';
  return timeString.slice(0, 5);
}

function EventList({
  events,
  emptyMessage,
}: {
  events: EventItem[];
  emptyMessage: string;
}) {
  if (!events.length) {
    return <p className="events-empty">{emptyMessage}</p>;
  }

  return (
    <div className="events-list">
      {events.map((event) => (
        <div key={event.id} className="event-row">
          <div className="event-row-title">
            {formatEventDate(event.event_date)} - {event.title}
          </div>
          <div className="event-row-meta">
            {event.location ?? 'Location TBC'} - {formatEventTime(event.event_time)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function EventsPage() {
  const [content, events] = await Promise.all([
    getPageContent('events'),
    getPublishedEvents(),
  ]);

  const today = new Date().toISOString().slice(0, 10);

  const futureEvents = events.filter(
    (event) => event.event_date && event.event_date >= today
  );

  const trainingEvents = futureEvents.filter(
    (event) => event.event_type?.toLowerCase() === 'training'
  );

  const otherEvents = futureEvents.filter(
    (event) => event.event_type?.toLowerCase() !== 'training'
  );

  return (
    <PageShell>
      <div className="events-top-row">
        <section className="section-card">
          {content ? (
            <>
              <SectionIntro
                title={content.title ?? 'Events'}
                intro={content.intro ?? ''}
              />

              {content.body && (
                <div className="body-text">
                  <p>{content.body}</p>
                </div>
              )}
            </>
          ) : (
            <SectionIntro
              title="Events"
              intro="Keep up to date with training, socials, tours, fundraising and other club events."
            />
          )}
        </section>

        <div className="events-image">
          <Image
            src="/images/event-placeholder.png"
            alt="Platt Ladies events"
            fill
            className="events-image-inner"
            priority
          />
        </div>
      </div>

      <section className="events-section">
        <div className="events-grid">
          <div className="section-card">
            <h2 className="events-heading">Training</h2>
            <EventList
              events={trainingEvents}
              emptyMessage="No upcoming training sessions."
            />
          </div>

          <div className="section-card">
            <h2 className="events-heading">Other Events</h2>
            <EventList
              events={otherEvents}
              emptyMessage="No upcoming events."
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}