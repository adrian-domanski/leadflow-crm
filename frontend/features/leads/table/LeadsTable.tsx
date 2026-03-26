'use client';

import { Lead, LeadStatus } from '../types';
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
import LeadDialog from '../components/LeadDialog';
import { VariantProps } from 'class-variance-authority';

type Props = {
  leads?: Lead[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
};

export default function LeadsTable({
  leads,
  isLoading,
  onDelete,
  deletingId,
}: Props) {
  const showSkeleton = isLoading;
  const showEmpty = !isLoading && (!leads || leads.length === 0);

  return (
    <div className='border rounded-xl overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>

            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {showSkeleton &&
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

          {showEmpty && (
            <TableRow>
              <TableCell
                colSpan={4}
                className='text-center py-10 text-muted-foreground'
              >
                No leads yet. Click {'"'}Add Lead{'"'} to get started.
              </TableCell>
            </TableRow>
          )}

          {!showSkeleton &&
            leads?.map((lead) => (
              <TableRow key={lead.id} className='hover:bg-muted/50 transition'>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.company}</TableCell>

                <TableCell>
                  <StatusBadge status={lead.status} />
                </TableCell>

                <TableCell className='text-right'>
                  <LeadDialog mode='edit' lead={lead} />
                  <Button
                    variant='destructive'
                    size='sm'
                    disabled={deletingId === lead.id}
                    onClick={() => onDelete?.(lead.id)}
                  >
                    {deletingId === lead.id ? 'Deleting...' : 'Delete'}
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

type BadgeVariant = VariantProps<typeof Badge>['variant'];

interface ConfigVariant {
  label: string;
  variant: BadgeVariant;
}

const STATUS_CONFIG: Record<LeadStatus, ConfigVariant> = {
  new: { label: 'New', variant: 'default' },
  contacted: { label: 'Contacted', variant: 'secondary' },
  qualified: { label: 'Qualified', variant: 'secondary' },
  lost: { label: 'Lost', variant: 'destructive' },
  won: { label: 'Won', variant: 'outline' },
};

function StatusBadge({ status }: { status: LeadStatus }) {
  const config = STATUS_CONFIG[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
