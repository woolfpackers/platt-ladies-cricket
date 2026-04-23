import Image from 'next/image';
import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function PavilionPage() {
  const content = await getPageContent('pavilion');

  return (
    <PageShell>
      <div className="two-col">
        <section className="section-card">
          {content ? (
            <div className="content-copy">
              <SectionIntro
                title={content.title ?? 'New Pavilion Project'}
                intro={content.intro ?? ''}
                ctaLabel={content.cta_label}
                ctaUrl={content.cta_url}
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
              <h1 className="page-title page-title--main">New Pavilion Project</h1>
              <div className="body-text">
                <p>Building a modern, inclusive space for our growing club.</p>
              </div>
            </div>
          )}
        </section>

        <aside>
          {content?.image_url ? (
            <Image
              src={content.image_url}
              alt={content.image_alt || 'Pavilion'}
              width={900}
              height={650}
              className="about-image-only"
              priority
            />
          ) : null}
        </aside>
      </div>

      <div className="cards-grid" style={{ marginTop: 24 }}>
        {['pavilion_4.png', 'pavilion_5.png', 'pavilion_8.png'].map((img) => (
          <div className="media-frame pavilion-image" key={img}>
            <img src={`/images/pavilion/${img}`} alt="Pavilion" />
          </div>
        ))}
      </div>
    </PageShell>
  );
}