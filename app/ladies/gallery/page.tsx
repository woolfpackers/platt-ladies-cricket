import { PageShell } from '@/components/PageShell';
import { SectionIntro } from '@/components/SectionIntro';
import { GalleryCarousel } from '@/components/GalleryCarousel';
import { getGalleryImages, getPageContent } from '@/lib/data';

export default async function GalleryPage() {
  const images = await getGalleryImages();
  const content = await getPageContent('gallery');

  return (
    <PageShell>
      <div className="gallery-layout" style={{ display: 'grid', gap: '24px', alignItems: 'start' }}>
        
        <section className="section-card">
          {content ? (
            <>
              <SectionIntro
                title={content.title ?? 'Gallery'}
                intro={content.intro ?? ''}
              />

              {content.body && <p className="lead">{content.body}</p>}
              {content.body_2 && <p className="lead body-2-mobile-hide">{content.body_2}</p>}
              {content.body_3 && <p className="lead body-2-mobile-hide">{content.body_3}</p>}
              {content.body_4 && <p className="lead body-2-mobile-hide">{content.body_4}</p>}
            </>
          ) : (
            <>
              <h1 className="page-title">Gallery</h1>
              <p className="lead">Photos from our club, matches and events.</p>
            </>
          )}
        </section>

        <GalleryCarousel images={images} />

      </div>
    </PageShell>
  );
}