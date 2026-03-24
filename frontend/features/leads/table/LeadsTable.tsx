'use client';

import { Lead } from '../types';
import { Badge } from '@/shared/components/ui/badge';
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
};

export default function LeadsTable({ leads }: Props) {
  return (
    <div className='border rounded-xl overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>
                <StatusBadge status={lead.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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
