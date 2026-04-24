'use client';

import { useRouter } from 'next/navigation';

export function It20Overlay() {
  const router = useRouter();

  function handleClose() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/fundraising');
  }
}

  return (
    <div className="it20-overlay">
      <div className="it20-overlay-backdrop" onClick={handleClose} />

      <div className="it20-overlay-content">
        <button className="it20-overlay-close" onClick={handleClose}>
          ×
        </button>

        <div className="it20-arrow-callout">
          <span className="it20-arrow">⬇</span>
          <span>Scan QR code to donate and enter</span>
        </div>

        <img
          src="/images/IT20.jpg"
          alt="IT20 Competition"
          className="it20-overlay-image"
        />
      </div>
    </div>
  );
}