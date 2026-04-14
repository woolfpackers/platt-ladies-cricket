import { PageShell } from '@/components/PageShell';

export default function FundraisingPage() {
  return (
    <PageShell>
      <div className="page-stack">

        <section className="section-card">
          <h1 className="page-title">Fundraising</h1>
          <p className="lead">
            Support our new pavilion project and be in with a chance to win two England Women’s IT20 tickets.
          </p>
        </section>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* LEFT: Crowdfunding card (2/3 width) */}
          <section className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
            <a
              href="https://www.crowdfunder.co.uk/p/platt-cricket-club-pavilion-project?_cbrk=69dea6afcd997"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
            >
              <img
                src="/images/crowdfunding.png"
                alt="Crowdfunding"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </a>
          </section>

          {/* RIGHT: IT20 flyer */}
          <section className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
            <img
              src="/images/IT20.jpg"
              alt="IT20 Competition"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </section>
        </div>

      </div>
    </PageShell>
  );
}