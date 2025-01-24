import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import Wrapper from './wrapper';

export const metadata: Metadata = {
  title: 'EMIS',
  description: 'EMIS',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense fallback={<div>Loading...</div>}>
          <Wrapper>{children}</Wrapper>
        </Suspense>
      </body>
    </html>
  );
}
