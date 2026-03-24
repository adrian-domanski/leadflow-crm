'use client';
import './globals.css';

import { useEffect } from 'react';
import { initAuth } from '@/shared/lib/auth';
import { Geist } from 'next/font/google';
import { cn } from '@/shared/lib/utils';
import ToasterProvider from '@/shared/components/ToasterProvider';
import { Providers } from './providers';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <html lang='en' className={cn('font-sans', geist.variable)}>
      <body>
        <Providers>{children}</Providers>
        <ToasterProvider />
      </body>
    </html>
  );
}
