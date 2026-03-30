'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';
import { login } from '@/shared/lib/auth';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

export function Hero() {
  const router = useRouter();
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemo = async () => {
    try {
      setDemoLoading(true);

      await login(
        process.env.NEXT_PUBLIC_DEMO_USERNAME!,
        process.env.NEXT_PUBLIC_DEMO_PASSWORD!,
      );

      toast.success('Logged in as demo 🚀');
      router.replace('/dashboard');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <section className='relative px-6 py-28 overflow-hidden'>
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 to-background' />

      <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
        {/* LEFT */}
        <div>
          <h1 className='text-5xl md:text-6xl font-bold tracking-tight leading-tight'>
            Find and close clients automatically
          </h1>

          <p className='mt-6 text-lg text-muted-foreground max-w-md'>
            Generate leads, manage your pipeline, and reach out — all in one
            simple CRM built for small businesses.
          </p>

          <div className='mt-10 flex gap-4'>
            <Button size='lg' onClick={() => router.push('/login')}>
              Start finding leads
            </Button>

            <Button
              size='lg'
              variant='outline'
              onClick={handleDemo}
              disabled={demoLoading}
            >
              {demoLoading ? 'Loading demo...' : 'View demo'}
            </Button>
          </div>
        </div>

        {/* RIGHT - ILLUSTRATION */}
        <div className='hidden md:flex justify-center'>
          <img
            src='/img/crm.png'
            alt='CRM illustration'
            className='w-full max-w-md'
          />
        </div>
      </div>
    </section>
  );
}
