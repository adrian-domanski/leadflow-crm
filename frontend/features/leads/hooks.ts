'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteLead, getLeads } from './api';
import { Lead } from './types';

export const useLeads = () => {
  return useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: getLeads,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

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
