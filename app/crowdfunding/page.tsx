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

        <section className="section-card" style={{ overflow: 'hidden', padding: 0 }}>
	  <a
	    href="https://www.crowdfunder.co.uk/p/platt-cricket-club-pavilion-project?_cbrk=69dea6afcd997"
	    target="_blank"
	    rel="noopener noreferrer"
	    style={{ display: 'block' }}
	  >
	    <img
	      src="/images/crowdfunding2.png"
	      alt="Crowdfunding"
	      style={{
	        width: '100%',
	        height: 'auto',
	        display: 'block',
	      }}
	    />
	  </a>
	</section>

      </div>
    </PageShell>
  );
}