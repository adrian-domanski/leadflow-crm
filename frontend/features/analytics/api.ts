import { api } from '@/shared/lib/api';
import { getErrorMessage } from '@/shared/lib/error';
import { toast } from 'sonner';

export async function getLeadsStats() {
  try {
    const res = await api.get('/analytics/leads');
    return res.data;
  } catch (err) {
    toast.error(getErrorMessage(err));
    throw err;
  }
}

export async function getStatusBreakdown() {
  try {
    const res = await api.get('/analytics/leads/status-breakdown');
    return res.data;
  } catch (err) {
    toast.error(getErrorMessage(err));
    throw err;
  }
}

export async function getLeadsDaily() {
  try {
    const res = await api.get('/analytics/leads/daily');
    return res.data;
  } catch (err) {
    toast.error(getErrorMessage(err));
    throw err;
  }
}
