'use client';

import { useEffect, useState } from 'react';

export function CompactModeToggle() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('compactMode') === 'true';
    setCompact(saved);
    document.documentElement.classList.toggle('compact-mode', saved);
  }, []);

  function toggleCompact() {
    const next = !compact;
    setCompact(next);
    localStorage.setItem('compactMode', String(next));
    document.documentElement.classList.toggle('compact-mode', next);
  }

  return (
    <button
      type="button"
      className="compact-toggle"
      onClick={toggleCompact}
      aria-pressed={compact}
    >
      {compact ? '100% View' : 'Compact View'}
    </button>
  );
}