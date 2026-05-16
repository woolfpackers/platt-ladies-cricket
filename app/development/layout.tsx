import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platt Cricket Club',
  description: 'Official website of Platt Cricket Club.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}