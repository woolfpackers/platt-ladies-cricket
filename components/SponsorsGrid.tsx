import type { Sponsor } from '@/lib/types';

export function SponsorsGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="cards-grid">
      {sponsors.map((sponsor) => (
        <article key={sponsor.id} className="sponsor-card">
          <h2 className="small-heading">{sponsor.name}</h2>
          <p className="lead" style={{ margin: 0 }}>{sponsor.description}</p>
          <span className="muted-label">{sponsor.sponsor_type === 'main' ? 'Main sponsor' : sponsor.sponsor_type}</span>
        </article>
      ))}
    </div>
  );
}
