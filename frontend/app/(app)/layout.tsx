import '../globals.css';
import { Geist } from 'next/font/google';
import { cn } from '@/shared/lib/utils';
import ToasterProvider from '@/shared/components/ToasterProvider';
import { Providers } from './providers';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'LeadFlow',
  description: 'Simple CRM for managing leads',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={cn('font-sans', geist.variable)}>
      <body>
        <Providers>{children}</Providers>
        <ToasterProvider />
      </body>
    </html>
  );
}
