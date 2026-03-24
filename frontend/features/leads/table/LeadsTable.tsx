'use client';

import { Lead } from '../types';
import { useDeleteLead } from '../hooks';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/shared/components/ui/table';

type Props = {
  leads: Lead[];
  isLoading?: boolean;
};

export default function LeadsTable({ leads, isLoading }: Props) {
  const { mutate: deleteLead, isPending } = useDeleteLead();

  const showSkeleton = isLoading;
  const showEmpty = !isLoading && leads.length === 0;

  return (
    <div className='border rounded-xl overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* 🔄 LOADING */}
          {showSkeleton &&
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

          {/* 📭 EMPTY */}
          {showEmpty && (
            <TableRow>
              <TableCell
                colSpan={4}
                className='text-center py-10 text-muted-foreground'
              >
                No leads yet. Click "Add Lead" to get started.
              </TableCell>
            </TableRow>
          )}

          {/* ✅ DATA */}
          {!showSkeleton &&
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>

                <TableCell>
                  <StatusBadge status={lead.status} />
                </TableCell>

                <TableCell className='text-right'>
                  <Button
                    variant='destructive'
                    size='sm'
                    disabled={isPending}
                    onClick={() => {
                      const confirmed = confirm(`Delete lead "${lead.name}"?`);
                      if (!confirmed) return;

                      deleteLead(lead.id);
                    }}
                  >
                    {isPending ? 'Deleting...' : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <div className='h-4 w-32 bg-muted rounded animate-pulse' />
      </TableCell>
      <TableCell>
        <div className='h-4 w-40 bg-muted rounded animate-pulse' />
      </TableCell>
      <TableCell>
        <div className='h-4 w-20 bg-muted rounded animate-pulse' />
      </TableCell>
      <TableCell className='text-right'>
        <div className='h-8 w-16 bg-muted rounded animate-pulse ml-auto' />
      </TableCell>
    </TableRow>
  );
}

function StatusBadge({ status }: { status: Lead['status'] }) {
  const map: Record<Lead['status'], 'default' | 'secondary' | 'outline'> = {
    new: 'default',
    contacted: 'secondary',
    won: 'outline',
  };

  return <Badge variant={map[status]}>{status}</Badge>;
}
