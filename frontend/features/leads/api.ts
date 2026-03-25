import { api } from '@/shared/lib/api';
import { Lead, LeadsResponse } from './types';

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

export async function updateLead(id: string, data: Partial<Lead>) {
  const res = await api.put(`/leads/${id}`, data);
  return res.data;
}

export async function getLeads(
  search?: string,
  status?: string,
  page = 1,
  limit = 10,
): Promise<LeadsResponse> {
  const res = await api.get('/leads', {
    params: { search, status, page, limit },
  });

  return res.data;
}
