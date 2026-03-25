'use client';

import { Card, CardContent } from '@/shared/components/ui/card';
import { useLeadsStats } from '../hooks';

export default function StatsCards() {
  const { data, isLoading } = useLeadsStats();

  if (isLoading) return <div>Loading stats...</div>;

  return (
    <div className='grid grid-cols-4 gap-4'>
      <Card>
        <CardContent className='p-4'>
          <p className='text-sm text-muted-foreground'>Total Leads</p>
          <p className='text-2xl font-bold'>{data.total}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <p className='text-sm text-muted-foreground'>New</p>
          <p className='text-2xl font-bold'>{data.new}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <p className='text-sm text-muted-foreground'>Contacted</p>
          <p className='text-2xl font-bold'>{data.contacted}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <p className='text-sm text-muted-foreground'>Won</p>
          <p className='text-2xl font-bold'>{data.won}</p>
        </CardContent>
      </Card>
    </div>
  );
}
