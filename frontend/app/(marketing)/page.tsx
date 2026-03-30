'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Features } from '../components/landing/Features';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.replace('/dashboard');
    }
  }, []);

  return (
    <main className='min-h-screen text-foreground'>
      <Hero />
      <HowItWorks />
      <Features />
    </main>
  );
}
