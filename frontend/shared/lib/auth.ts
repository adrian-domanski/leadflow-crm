import { toast } from 'sonner';
import { api, setAuthToken } from './api';
import { getErrorMessage } from './error';

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', {
    email,
    password,
  });

  if (res.status === 200) {
    localStorage.setItem('accessToken', res.data.access_token);
    localStorage.setItem('refreshToken', res.data.refresh_token);
    setAuthToken(res.data.access_token);
  }

  return res.data;
};

export const getMe = async () => {
  return await api.get('/auth/me');
};

export const logout = () => {
  localStorage.clear();
  setAuthToken(null);
  window.location.href = '/login';
};

export const initAuth = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    setAuthToken(token);
  }
};
