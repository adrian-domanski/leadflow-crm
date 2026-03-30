'use client';
import { Button } from '@/shared/components/ui/button';
import { login } from '@/shared/lib/auth';
import { getErrorMessage } from '@/shared/lib/error';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function Navbar() {
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
    <div className='flex items-center justify-between px-6 py-4 border-b'>
      <div className='font-semibold text-lg'>
        <Link href='/'>LeadFlow</Link>
      </div>

      <div className='flex gap-2'>
        <Button variant='ghost' onClick={() => router.push('/login')}>
          Login
        </Button>
        <Button variant='ghost' onClick={() => router.push('/register')}>
          Register
        </Button>
        <Button onClick={handleDemo} disabled={demoLoading}>
          {demoLoading ? 'Loading demo...' : 'Try demo'}
        </Button>
      </div>
    </div>
  );
}
