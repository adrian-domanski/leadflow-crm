'use client';

import { useState } from 'react';
import { useAuth } from '../hooks';
import { useRouter } from 'next/navigation';

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

export default function RegisterForm() {
  const { handleRegister } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await handleRegister(email, password);
      toast.success('Account created successfully 🎉');
    } catch (err: any) {
      console.error(err);
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex bg-accent items-center justify-center px-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label>Email</Label>
            <Input
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label>Password</Label>
            <Input
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className='w-full' onClick={onSubmit} disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </Button>

          <div className='text-sm text-center text-muted-foreground'>
            Already have an account?{' '}
            <span
              className='underline cursor-pointer'
              onClick={() => router.push('/login')}
            >
              Login
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
