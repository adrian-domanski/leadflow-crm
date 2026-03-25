'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useLeadsStats } from '../hooks';

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 400;
    const step = Math.ceil(value / (duration / 16));

    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value]);

  return <span>{display}</span>;
}

function StatCard({
  label,
  value,
  growth,
}: {
  label: string;
  value: number;
  growth?: string;
}) {
  return (
    <Card>
      <CardContent className='p-5'>
        <p className='text-sm text-muted-foreground'>{label}</p>

        <div className='flex items-end justify-between mt-2'>
          <p className='text-3xl font-semibold'>
            <AnimatedNumber value={value} />
          </p>

          {growth && (
            <span className='text-xs text-green-600 font-medium'>{growth}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonCard() {
  return <div className='h-[88px] bg-muted animate-pulse rounded-xl' />;
}

export default function StatsCards() {
  const { data, isLoading } = useLeadsStats();

  const hasConversionData = data?.won + data?.lost > 0;

  const formatPercent = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  if (isLoading) {
    return (
      <div className='grid grid-cols-4 gap-4'>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-4 gap-4'>
      <StatCard label='Total Leads' value={data.total} />
      <StatCard label='New' value={data.new} />
      <StatCard label='Contacted' value={data.contacted} />
      <StatCard
        label='Won'
        value={data.won}
        growth={
          hasConversionData ? formatPercent(data.conversion_rate) : undefined
        }
      />
    </div>
  );
}
