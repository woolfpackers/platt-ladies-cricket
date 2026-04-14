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
          gap: '24px',
          alignItems: 'start',
        }}
        className="gallery-layout"
      >
        <section className="section-card">
          <h1 className="page-title">Gallery</h1>
          <p className="lead">Photos from our club, matches and events.<br><br>
	  If you have any photos you would like to include in our gallery please send them our way
	  </p>
        </section>

        <GalleryCarousel images={images} />
      </div>
    </PageShell>
  );
}