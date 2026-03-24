import { api } from '@/shared/lib/api';
import { Lead } from './types';

export const createLead = async (data: {
  name: string;
  email: string;
}): Promise<Lead> => {
  const res = await api.post('/leads', data);
  return res.data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

export const getLeads = async (): Promise<Lead[]> => {
  const res = await api.get('/leads');
  return res.data;
};
