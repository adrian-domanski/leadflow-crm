'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/lib/error';
import { AuthCard } from '@/features/auth/components/AuthCard';
import { register } from '@/shared/lib/auth';

export default function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register(email, password);
      toast.success('Account created 🎉');
      router.replace('/dashboard');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title='Create account'
      subtitle='Start finding clients in minutes'
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* EMAIL */}
        <div className='space-y-2'>
          <Label>Email</Label>
          <Input
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
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
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className='space-y-2'>
          <Label>Confirm password</Label>
          <Input
            type='password'
            placeholder='••••••••'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* LIVE VALIDATION */}
          {confirmPassword.length > 0 && (
            <p
              className={`text-xs ${
                passwordsMatch ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <Button
          type='submit'
          className='w-full'
          disabled={loading || !passwordsMatch}
        >
          {loading ? 'Creating...' : 'Create account'}
        </Button>

        {/* LINK */}
        <div className='text-sm text-center text-muted-foreground'>
          Already have an account?{' '}
          <span
            className='underline cursor-pointer hover:text-foreground'
            onClick={() => router.push('/login')}
          >
            Sign in
          </span>
        </div>
      </form>
    </AuthCard>
  );
}
