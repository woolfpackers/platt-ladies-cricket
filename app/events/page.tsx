import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export default async function EventsPage() {
  const content = await getPageContent('events');

  return (
    <PageShell>
      <section className="section-card">
        {content ? (
          <>
            <SectionIntro title={content.title} intro={content.intro} />
            {content.body ? <p className="lead">{content.body}</p> : null}
            {content.cta_label && content.cta_url ? (
              <div style={{ marginTop: 18 }}>
                <a className="button-link" href={content.cta_url}>
                  {content.cta_label}
                </a>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <h1 className="page-title">Events</h1>
            <p className="lead">
              No events page content was found in the database yet.
            </p>
          </>
        )}
      </section>
    </PageShell>
  );
}