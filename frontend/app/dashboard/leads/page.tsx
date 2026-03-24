'use client';

import { useLeads } from '@/features/leads/hooks';
import LeadsTable from '@/features/leads/table/LeadsTable';
import CreateLeadDialog from '@/features/leads/components/CreateLeadDialog';
import { deleteLead } from '@/features/leads/api';
import { toast } from 'sonner';

export default function LeadsPage() {
  const { data: leads, isLoading: loading, refetch } = useLeads();

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this lead?');
    if (!confirmed) return;

    try {
      await deleteLead(id);
      toast.success('Lead deleted');
      refetch();
    } catch (err) {
      toast.error('Failed to delete lead');
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Leads</h1>
        <CreateLeadDialog onCreated={refetch} />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <LeadsTable leads={leads} onDelete={handleDelete} />
      )}
    </div>
  );
}
