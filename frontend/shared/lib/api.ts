import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

let accessToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  accessToken = token;
};

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor
api.interceptors.request.use((config) => {
  // Mixed content problem on production - find better solution with Caddy and reverse proxy later
  if (typeof window !== 'undefined') {
    const isProd = window.location.protocol === 'https:';

    if (isProd) {
      // fix baseURL
      if (config.baseURL?.startsWith('http://')) {
        config.baseURL = config.baseURL.replace('http://', 'https://');
      }

      // fix full URL (jeśli ktoś gdzieś podał absolute URL)
      if (typeof config.url === 'string' && config.url.startsWith('http://')) {
        config.url = config.url.replace('http://', 'https://');
      }
    }
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || '';

    const isAuthEndpoint =
      url.includes('/auth/login') || url.includes('/auth/refresh');

    if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const res = await api.post(`/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data.access_token;

        setAuthToken(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error('Refresh failed');
        localStorage.clear();

        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  },
);
