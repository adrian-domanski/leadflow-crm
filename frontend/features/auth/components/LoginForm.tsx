'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/shared/lib/auth';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';
import { AuthCard } from '@/features/auth/components/AuthCard';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      toast.success('Welcome back 👋');
      router.replace('/dashboard');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    try {
      setDemoLoading(true);

      const demoEmail = 'example@example.com';
      const demoPassword = 'Example!23';

      setEmail(demoEmail);
      setPassword(demoPassword);

      await login(demoEmail, demoPassword);

      toast.success('Logged in as demo 🚀');
      router.replace('/dashboard');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <AuthCard title='Welcome back' subtitle='Sign in to continue to LeadFlow'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <Label>Email</Label>
          <Input
            data-testid='email-input'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>

        <div className='space-y-2'>
          <Label>Password</Label>
          <Input
            data-testid='password-input'
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type='submit'
          className='w-full'
          disabled={loading || demoLoading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>

        <Button
          type='button'
          variant='secondary'
          className='w-full'
          onClick={handleDemo}
          disabled={loading || demoLoading}
        >
          {demoLoading ? 'Loading demo...' : 'Try demo'}
        </Button>

        <div className='text-sm text-center text-muted-foreground'>
          Don’t have an account?{' '}
          <span
            className='underline cursor-pointer hover:text-foreground'
            onClick={() => router.push('/register')}
          >
            Create account
          </span>
        </div>
      </form>
    </AuthCard>
  );
}
