import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { Suspense } from 'react';
import Wrapper from './wrapper';

const roboto = Roboto({
  weight: [300, 400, 500, 700],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-roboto',
});

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
      <body suppressHydrationWarning className={`${roboto.variable} font-sans`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Wrapper>{children}</Wrapper>
        </Suspense>
      </body>
    </html>
  );
}
