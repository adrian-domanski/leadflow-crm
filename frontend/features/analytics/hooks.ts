import { useQuery } from '@tanstack/react-query';
import { getLeadsStats, getStatusBreakdown, getLeadsDaily } from './api';

export function useLeadsStats() {
  return useQuery({
    queryKey: ['analytics', 'stats'],
    queryFn: getLeadsStats,
  });
}

export function useStatusBreakdown() {
  return useQuery({
    queryKey: ['analytics', 'status'],
    queryFn: getStatusBreakdown,
  });
}

export function useLeadsDaily() {
  return useQuery({
    queryKey: ['analytics', 'daily'],
    queryFn: getLeadsDaily,
  });
}
