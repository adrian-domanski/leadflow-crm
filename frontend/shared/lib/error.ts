import { AxiosError } from 'axios';

export function getErrorMessage(err: any): string {
  const detail = err?.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail.map((e) => e.msg).join(', ');
  }

  if (typeof detail === 'string') {
    return detail;
  }

  if (err instanceof AxiosError) {
    return err?.response?.data?.message;
  }

  return 'Something went wrong';
}
