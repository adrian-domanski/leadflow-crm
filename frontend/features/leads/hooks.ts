'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLead, deleteLead, getLeads, updateLead } from './api';
import { CreateLeadDto, Lead, UpdateLeadDto } from './types';

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

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeadDto) => createLead(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadDto }) =>
      updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}
