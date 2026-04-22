import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function TourPage() {
  const content = await getPageContent('tour');

  const tourContactUrl = `/contact?subject=${encodeURIComponent(
    'New enquiry: Baltic Bash tour'
  )}`;

  return (
    <PageShell>
      <div className="two-col">
        <section className="section-card">
          {content ? (
            <div className="content-copy">
              <SectionIntro
                title={content.title ?? 'Tour'}
                intro={content.intro ?? ''}
                ctaLabel={content.cta_label}
                ctaUrl={tourContactUrl}
              />

              {content.body && (
                <div className="body-text">
                  <p>{content.body}</p>
                </div>
              )}

              {content.body_2 && (
                <div className="body-text body-2-mobile-hide">
                  <p>{content.body_2}</p>
                </div>
              )}

              {content.body_3 && (
                <div className="body-text body-2-mobile-hide">
                  <p>{content.body_3}</p>
                </div>
              )}

              {content.body_4 && (
                <div className="body-text body-2-mobile-hide">
                  <p>{content.body_4}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="content-copy">
              <h1 className="page-title page-title--main">Tour</h1>
              <div className="body-text">
                <p>Find out more about our tour plans and how to get involved.</p>
              </div>
            </div>
          )}
        </section>

        <aside>
	  <div className="tour-media-stack">

	    {/* Video */}
	    <div className="tour-video-wrap">
	      <iframe
	        src="https://canva.link/7xnroiuijrr4wy8"
	        width="100%"
	        height="420"
	        style={{ border: 'none', overflow: 'hidden' }}
	        scrolling="no"
	        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
	        allowFullScreen
	      />
	    </div>

	    {/* Existing Image */}
	    {content?.image_url && (
	      <Image
	        src={content.image_url}
	        alt={content.image_alt || 'Tour'}
	        width={900}
	        height={650}
	        className="about-image-only"
	      />
	    )}

	  </div>
	</aside>

      </div>
    </PageShell>
  );
}