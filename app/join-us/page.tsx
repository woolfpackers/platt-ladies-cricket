import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function JoinUsPage() {
  const content = await getPageContent('join-us');

  return (
    <PageShell>
      <div className="two-col">
        <section className="section-card">
          {content ? (
            <>
              <SectionIntro
  		  title={content.title ?? 'Join Platt Ladies Cricket'}
		  intro={content.intro ?? ''}
		/>
              {content.body ? <p className="lead">{content.body}</p> : null}
	      {content.body_2 ? <p className="lead body-2-mobile-hide">{content.body_2}</p> : null}
	      {content.body_3 ? <p className="lead body-2-mobile-hide">{content.body_3}</p> : null}
	      {content.body_4 ? <p className="lead body-2-mobile-hide">{content.body_4}</p> : null}



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
              <h1 className="page-title">Join Platt Ladies Cricket</h1>
              <p className="lead">New players always welcome — no experience needed!</p>
            </>
          )}
        </section>

        <aside>
          {content?.image_url ? (
            <Image
              src={content.image_url}
              alt={content.image_alt || 'Join Platt Ladies Cricket'}
              width={900}
              height={650}
              className="about-image-only"
              priority
            />
          ) : null}
        </aside>
      </div>
    </PageShell>
  );
}