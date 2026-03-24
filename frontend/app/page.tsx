'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.replace('/dashboard');
    }
  }, []);

  return (
    <main className='min-h-screen bg-background text-foreground'>
      <div className='flex items-center justify-between px-6 py-4 border-b'>
        <div className='font-semibold text-lg'>LeadFlow</div>

        <div className='flex gap-2'>
          <Button variant='ghost' onClick={() => router.push('/login')}>
            Login
          </Button>
          <Button onClick={() => router.push('/login')}>Get Started</Button>
        </div>
      </div>

      {/* HERO */}
      <section className='flex flex-col items-center text-center px-6 py-24'>
        <h1 className='text-5xl font-bold tracking-tight max-w-3xl'>
          Close more deals with a simple CRM
        </h1>

        <p className='mt-6 text-muted-foreground max-w-xl'>
          LeadFlow helps you track leads, manage your pipeline, and turn
          opportunities into revenue.
        </p>

        <div className='mt-8 flex gap-4'>
          <Button size='lg' onClick={() => router.push('/login')}>
            Start for free
          </Button>

          <Button
            size='lg'
            variant='outline'
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </Button>
        </div>
      </section>

      {/* FEATURES */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-24 max-w-6xl mx-auto'>
        <Feature
          title='Simple pipeline'
          desc='Move leads through stages with ease'
        />
        <Feature title='Fast workflow' desc='Minimal UI, maximum speed' />
        <Feature
          title='Analytics ready'
          desc='Understand what actually converts'
        />
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className='border rounded-2xl p-6 bg-card'>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='text-sm text-muted-foreground mt-2'>{desc}</p>
    </div>
  );
}
