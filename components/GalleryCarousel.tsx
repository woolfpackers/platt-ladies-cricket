'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type GalleryImage = {
  id: string;
  title: string | null;
  image_filename: string;
  alt_text: string | null;
  sort_order: number;
};

export function GalleryCarousel({ images }: { images: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeImages = useMemo(() => images.filter((image) => !!image.image_filename), [images]);

  useEffect(() => {
    if (safeImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [safeImages.length]);

  if (safeImages.length === 0) {
    return (
      <div className="section-card">
        <p className="lead">No gallery images available yet.</p>
      </div>
    );
  }

  const currentImage = safeImages[currentIndex];
  const imageSrc = `/images/gallery/${currentImage.image_filename}`;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % safeImages.length);
  };

  return (
    <div className="section-card" style={{ padding: '20px' }}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          style={{
            position: 'absolute',
            top: '50%',
            left: '12px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            width: '44px',
            height: '44px',
            border: 'none',
            borderRadius: '999px',
            background: 'rgba(7, 18, 34, 0.78)',
            color: 'white',
            fontSize: '2rem',
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          ‹
        </button>

        <a href={imageSrc} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
          <Image
            src={imageSrc}
            alt={currentImage.alt_text || currentImage.title || 'Gallery image'}
            width={1400}
            height={900}
            priority
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '65vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </a>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          style={{
            position: 'absolute',
            top: '50%',
            right: '12px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            width: '44px',
            height: '44px',
            border: 'none',
            borderRadius: '999px',
            background: 'rgba(7, 18, 34, 0.78)',
            color: 'white',
            fontSize: '2rem',
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          ›
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginTop: '14px',
        }}
      >
        <h2 style={{ margin: 0 }}>{currentImage.title || 'Platt Ladies Gallery'}</h2>
        <p className="lead" style={{ margin: 0 }}>
          {currentIndex + 1} of {safeImages.length}
        </p>
      </div>
    </div>
  );
}