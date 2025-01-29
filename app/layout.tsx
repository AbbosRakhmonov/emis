import Providers from '@/src/shared/layouts/providers';
import 'dayjs/locale/ru';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { Suspense } from 'react';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'EMIS',
  description: 'EMIS - Electronic Medical Information System',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ru" className={roboto.variable}>
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
