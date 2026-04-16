import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function TourPage() {
  const content = await getPageContent('tour');

  const tourContactUrl = `/contact?subject=${encodeURIComponent(
    "New enquiry: Baltic Bash tour"
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
                ctaUrl={tourContactUrl}
              />

              {content.body ? <p className="lead">{content.body}</p> : null}
              {content.body_2 ? <p className="lead body-2-mobile-hide">{content.body_2}</p> : null}
              {content.body_3 ? <p className="lead body-2-mobile-hide">{content.body_3}</p> : null}
              {content.body_4 ? <p className="lead body-2-mobile-hide">{content.body_4}</p> : null}
            </>
          ) : (
            <>
              <h1 className="page-title">Tour</h1>
              <p className="lead">Find out more about our tour plans and how to get involved.</p>
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