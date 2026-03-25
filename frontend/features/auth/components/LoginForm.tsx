'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/shared/lib/auth';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className='min-h-screen bg-accent flex items-center justify-center px-4'>
      {/* CARD */}
      <Card className='w-full max-w-sm shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Welcome back</CardTitle>
          <p className='text-sm text-muted-foreground'>
            Enter your credentials to continue
          </p>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* EMAIL */}
          <div className='space-y-2'>
            <Label>Email</Label>
            <Input
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* PASSWORD */}
          <div className='space-y-2'>
            <Label>Password</Label>
            <Input
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* BUTTON */}
          <Button className='w-full' onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          {/* LINK */}
          <div className='text-sm text-center text-muted-foreground'>
            Don’t have an account?{' '}
            <span
              className='underline cursor-pointer'
              onClick={() => router.push('/register')}
            >
              Register
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
