import { PageShell } from '@/components/PageShell';
import { GalleryCarousel } from '@/components/GalleryCarousel';
import { getGalleryImages } from '@/lib/data';

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <PageShell>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        <section className="section-card">
          <h1 className="page-title">Gallery</h1>
          <p className="lead">Photos from our club, matches and events.</p>
        </section>

        <GalleryCarousel images={images} />
      </div>
    </PageShell>
  );
}