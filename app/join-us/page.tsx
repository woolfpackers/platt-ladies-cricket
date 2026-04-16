import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function JoinUsPage() {
  const content = await getPageContent('join-us');

  const joinUsContactUrl = `/contact?subject=${encodeURIComponent(
    "New enquiry: Joining Platt Ladies"
  )}`;

  return (
    <PageShell>
      <div className="two-col">
        <section className="section-card">
          {content ? (
            <>
              <SectionIntro
                title={content.title ?? '...'}
                intro={content.intro ?? ''}
                ctaLabel={content.cta_label}
                ctaUrl={joinUsContactUrl}
              />

              {content.body ? <p className="lead">{content.body}</p> : null}
              {content.body_2 ? <p className="lead body-2-mobile-hide">{content.body_2}</p> : null}
              {content.body_3 ? <p className="lead body-2-mobile-hide">{content.body_3}</p> : null}
              {content.body_4 ? <p className="lead body-2-mobile-hide">{content.body_4}</p> : null}
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