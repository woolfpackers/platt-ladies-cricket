import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platt Ladies Cricket',
  description: 'Official website starter for Platt Ladies Cricket.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
