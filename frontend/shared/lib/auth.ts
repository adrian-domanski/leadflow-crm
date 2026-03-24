import { setAuthToken } from './api';

export const login = (access: string, refresh: string) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
  setAuthToken(access);
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
