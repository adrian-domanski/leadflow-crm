'use client';
import { useRouter } from 'next/navigation';
import { login as saveAuth } from '@/shared/lib/auth';
import { loginRequest, registerRequest } from './api';

export const useAuth = () => {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const data = await loginRequest({ email, password });

    saveAuth(data.access_token, data.refresh_token);

    router.replace('/dashboard');
  };

  const handleRegister = async (email: string, password: string) => {
    const data = await registerRequest({ email, password });

    saveAuth(data.access_token, data.refresh_token);

    router.replace('/dashboard');
  };

  return {
    handleLogin,
    handleRegister,
  };
};
