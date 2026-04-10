import Image from 'next/image';
import type { EventItem } from '@/lib/types';

export function EventsGrid({ events }: { events: EventItem[] }) {
  return (
    <div className="cards-grid">
      {events.map((event) => (
        <article key={event.id} className="event-card">
          <Image
            src={event.image_url || '/images/event-placeholder.jpg'}
            alt={event.title}
            width={800}
            height={500}
            style={{ width: '100%', borderRadius: 18, objectFit: 'cover' }}
          />
          <div>
            <h2 className="small-heading">{event.title}</h2>
            {event.event_date ? <p className="footer-note">{event.event_date}</p> : null}
          </div>
          {event.summary ? <p className="lead" style={{ margin: 0 }}>{event.summary}</p> : null}
        </article>
      ))}
    </div>
  );
}
