'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

import { useCreateLead, useUpdateLead } from '../hooks';
import { Lead, UpdateLeadDto } from '../types';

type Props = {
  mode?: 'create' | 'edit';
  lead?: Lead;
  onSuccess?: () => void;
};

export default function LeadDialog({
  mode = 'create',
  lead,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<Lead['status']>('new');

  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead();

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (value) {
      if (mode === 'edit' && lead) {
        setName(lead.name);
        setCompany(lead.company ?? '');
        setStatus(lead.status);
      } else {
        setName('');
        setEmail('');
        setCompany('');
        setStatus('new');
      }
    }
  };

  const handleSubmit = async () => {
    if (!name) return;

    if (mode === 'create') {
      if (!email) return;

      await createMutation.mutateAsync({
        name,
        email,
        company,
      });
    } else {
      await updateMutation.mutateAsync({
        id: lead!.id,
        data: {
          name,
          company,
          status,
        } satisfies UpdateLeadDto,
      });
    }

    setOpen(false);
    onSuccess?.();
  };

  return (
    <>
      <Button onClick={() => handleOpenChange(true)}>
        {mode === 'create' ? 'Add Lead' : 'Edit'}
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Create Lead' : 'Edit Lead'}
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            {/* NAME */}
            <Input
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* EMAIL tylko przy CREATE */}
            {mode === 'create' && (
              <Input
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}

            {/* COMPANY */}
            <Input
              placeholder='Company'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            {/* STATUS tylko przy EDIT */}
            {mode === 'edit' && (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Lead['status'])}
                className='h-10 rounded-md border px-3 text-sm'
              >
                <option value='new'>New</option>
                <option value='contacted'>Contacted</option>
                <option value='won'>Won</option>
              </select>
            )}

            <Button
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {mode === 'create'
                ? createMutation.isPending
                  ? 'Creating...'
                  : 'Create'
                : updateMutation.isPending
                  ? 'Saving...'
                  : 'Save'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
