import { api } from '@/shared/lib/api';
import { Lead } from './types';

export const createLead = async (data: {
  name: string;
  email: string;
}): Promise<Lead> => {
  const res = await api.post('/leads', data);
  return res.data;
};
