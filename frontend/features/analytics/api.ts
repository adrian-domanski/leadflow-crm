import { api } from '@/shared/lib/api';

export async function getLeadsStats() {
  const res = await api.get('/analytics/leads');
  return res.data;
}

export async function getStatusBreakdown() {
  const res = await api.get('/analytics/leads/status-breakdown');
  return res.data;
}

export async function getLeadsDaily() {
  const res = await api.get('/analytics/leads/daily');
  return res.data;
}
