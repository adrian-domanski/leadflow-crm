'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import LeadsTable from '@/features/leads/table/LeadsTable';
import LeadDialog from '@/features/leads/components/LeadDialog';
import { deleteLead } from '@/features/leads/api';
import { toast } from 'sonner';
import { useLeads } from '@/features/leads/hooks';
import { Input } from '@/shared/components/ui/input';
import { useDebounce } from '@/shared/lib/useDebounce';
import { Lead } from '@/features/leads/types';

export default function LeadsPageWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') ?? '';
  const initialStatus = searchParams.get('status') ?? 'all';
  const initialPage = Number(searchParams.get('page') ?? 1);

  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);
  const [page, setPage] = useState(initialPage);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, refetch } = useLeads(
    debouncedSearch,
    status === 'all' ? undefined : status,
    page,
  );

  const leads = data ?? [];
  const total = data?.total ?? 0;
  const limit = data?.limit ?? 10;
  const totalPages = Math.ceil(total / limit);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set('search', debouncedSearch);
    if (status !== 'all') params.set('status', status);
    if (page > 1) params.set('page', String(page));

    router.replace(`?${params.toString()}`);
  }, [debouncedSearch, status, page, router]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this lead?');
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteLead(id);
      toast.success('Lead deleted');
      refetch();
    } catch {
      toast.error('Failed to delete lead');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Leads</h1>
        <LeadDialog onSuccess={refetch} />
      </div>

      <div className='flex items-center gap-4'>
        <Input
          placeholder='Search leads...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='max-w-sm'
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='h-10 rounded-md border px-3 text-sm'
        >
          <option value='all'>All</option>
          <option value='new'>New</option>
          <option value='contacted'>Contacted</option>
          <option value='won'>Won</option>
        </select>
      </div>

      <LeadsTable
        leads={leads as Lead[]}
        isLoading={isLoading}
        onDelete={handleDelete}
        deletingId={deletingId}
      />

      <div className='flex items-center justify-between'>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
