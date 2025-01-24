import type { Metadata, Viewport } from 'next';
import Wrapper from './wrapper';

export const metadata: Metadata = {
  title: 'EMIS',
  description: 'EMIS',
  lang: 'ru',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: 'no',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
