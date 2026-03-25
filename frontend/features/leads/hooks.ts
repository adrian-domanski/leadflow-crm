'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteLead, getLeads } from './api';
import { Lead } from './types';

export function useLeads(search?: string, status?: string, page = 1) {
  return useQuery({
    queryKey: ['leads', search ?? '', status ?? 'all', page],
    queryFn: () => getLeads(search, status, page),
    placeholderData: (prev) => prev,
  });
}

export const useDeleteLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLead,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['leads'] });

      const previousLeads = queryClient.getQueryData<Lead[]>(['leads']);

      queryClient.setQueryData<Lead[]>(['leads'], (old) =>
        old ? old.filter((lead) => lead.id !== String(id)) : [],
      );

      return { previousLeads };
    },

    onError: (err, id, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(['leads'], context.previousLeads);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
};
