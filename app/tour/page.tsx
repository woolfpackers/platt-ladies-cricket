import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function TourPage() {
  const content = await getPageContent('tour');

  return (
    <PageShell>
      <div className="two-col">
        <section className="section-card">
          {content ? (
            <>
              <SectionIntro
		title={content.title ?? 'Baltic Bash Tour 2026'}
  		intro={content.intro ?? ''}
	      />
              {content.body ? <p className="lead">{content.body}</p> : null}
	      {content.body_2 ? <p className="lead body-2-mobile-hide">{content.body_2}</p> : null}
	      {content.body_3 && <p className="lead body-2-mobile-hide">{content.body_3}</p>}
 	      {content.body_4 && <p className="lead body-2-mobile-hide">{content.body_4}</p>}

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
              <h1 className="page-title">Baltic Bash Tour 2026</h1>
              <p className="lead">Our international cricket adventure to Estonia and Finland.</p>
            </>
          )}
        </section>

        <aside>
          {content?.image_url ? (
            <Image
              src={content.image_url}
              alt={content.image_alt || 'Tour'}
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