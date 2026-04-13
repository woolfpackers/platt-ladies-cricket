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
    <div className="section-card gallery-card">
      <div className="gallery-stage">
        <button type="button" className="gallery-nav gallery-nav--left" onClick={goPrev} aria-label="Previous image">
          ‹
        </button>

        <a href={imageSrc} target="_blank" rel="noopener noreferrer" className="gallery-image-link">
          <Image
            src={imageSrc}
            alt={currentImage.alt_text || currentImage.title || 'Gallery image'}
            width={1400}
            height={900}
            className="gallery-image"
            priority
          />
        </a>

        <button type="button" className="gallery-nav gallery-nav--right" onClick={goNext} aria-label="Next image">
          ›
        </button>
      </div>

      <div className="gallery-meta">
        <h2 className="small-heading">{currentImage.title || 'Platt Ladies Gallery'}</h2>
        <p className="lead gallery-count">
          {currentIndex + 1} of {safeImages.length}
        </p>
      </div>
    </div>
  );
}