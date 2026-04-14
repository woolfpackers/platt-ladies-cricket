import { PageShell } from '@/components/PageShell';

export default function CrowdfundingPage() {
  return (
    <PageShell>
      <div className="page-stack">
        
        <section className="section-card">
          <h1 className="page-title">Crowdfunding</h1>
          <p className="lead">
            Support our new pavilion project by contributing to our fundraising campaign.
          </p>
        </section>

        <section className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
          <iframe
            src="https://www.crowdfunder.co.uk/p/platt-cricket-club-pavilion-project"
            style={{
              width: '100%',
              height: '80vh',
              border: 'none',
            }}
          />
        </section>

      </div>
    </PageShell>
  );
}