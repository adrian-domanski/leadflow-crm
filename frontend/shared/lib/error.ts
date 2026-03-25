import { AxiosError } from 'axios';

export function getErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data;

    if (data?.error === 'validation_error' && data?.fields) {
      return Object.values(data.fields).join(', ');
    }

    if (Array.isArray(data?.detail)) {
      return data.detail.map((e: any) => e.msg).join(', ');
    }

    if (typeof data?.detail === 'string') {
      return data.detail;
    }

    if (typeof data?.message === 'string') {
      return data.message;
    }
  }

  return 'Something went wrong';
}
