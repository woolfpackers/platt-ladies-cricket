import { PageShell } from '@/components/PageShell';
import { GalleryCarousel } from '@/components/GalleryCarousel';
import { getGalleryImages } from '@/lib/data';

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <PageShell>
      <div style={{ display: 'grid', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px' }}>
          
          <section className="section-card">
            <h1 className="page-title">Gallery</h1>
            <p className="lead">
              Photos from our club, matches and events.
            </p>
          </section>

          <div style={{ marginTop: 20 }}>
            <GalleryCarousel images={images} />
          </div>

        </div>
      </div>
    </PageShell>
  );
}