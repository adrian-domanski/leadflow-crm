'use client';

import StatsCards from '@/features/analytics/components/StatsCards';
import LeadsChart from '@/features/analytics/components/LeadsChart';
import StatusPieChart from '@/features/analytics/components/StatusPieChart';

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold'>Dashboard</h1>

      <StatsCards />

      <div className='grid grid-cols-2 gap-6'>
        <LeadsChart />
        <StatusPieChart />
      </div>
    </div>
  );
}
