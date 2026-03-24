import { create } from 'zustand';
import { setAuthToken } from '@/shared/lib/api';

type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  setToken: (token) => {
    setAuthToken(token);
    set({ token });
  },

  logout: () => {
    setAuthToken(null);
    set({ token: null });
  },
}));
