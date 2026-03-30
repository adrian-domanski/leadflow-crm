import '../globals.css';
import { Geist } from 'next/font/google';
import { cn } from '@/shared/lib/utils';
import ToasterProvider from '@/shared/components/ToasterProvider';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'LeadFlow',
  description: 'Simple CRM for managing leads',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={cn('font-sans', geist.variable)}>
      <body className='bg-slate-50'>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
