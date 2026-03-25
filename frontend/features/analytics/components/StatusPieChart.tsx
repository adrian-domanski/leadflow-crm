'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { useStatusBreakdown } from '../hooks';

const COLORS = {
  new: '#6366f1',
  contacted: '#f59e0b',
  qualified: '#3b82f6',
  lost: '#ef4444',
  won: '#10b981',
  empty: '#e5e7eb',
};

export default function StatusPieChart() {
  const { data, isLoading } = useStatusBreakdown();

  const hasData = data && Object.values(data).some((v) => v > 0);

  const chartData = hasData
    ? Object.entries(data!).map(([status, count]) => ({
        status,
        count: Number(count),
      }))
    : [{ status: 'empty', count: 1 }];

  const total = hasData
    ? Object.values(data!).reduce((a, b) => a + Number(b), 0)
    : 0;

  if (isLoading) {
    return (
      <div className='h-80 w-full border rounded-xl p-4 flex items-center justify-center text-sm text-muted-foreground'>
        Loading...
      </div>
    );
  }

  return (
    <div className='h-80 w-full border rounded-xl p-5 flex flex-col'>
      {/* HEADER */}
      <div className='mb-4'>
        <p className='text-sm text-muted-foreground'>Leads by Status</p>
        <p className='text-xs text-muted-foreground'>
          Distribution of your pipeline
        </p>
      </div>

      {/* CHART */}
      <div className='flex-1 relative'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='count'
              nameKey='status'
              cx='50%'
              cy='50%'
              outerRadius={90}
              innerRadius={65}
              paddingAngle={3}
              stroke='none'
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[entry.status as keyof typeof COLORS] ?? '#8884d8'
                  }
                />
              ))}
            </Pie>

            {/* TOOLTIP */}
            <Tooltip
              formatter={(value) => [`${value ?? 0}`, 'Leads']}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}
              content={({ payload }) => {
                if (!payload || payload[0]?.name === 'empty') return null;
                return undefined;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER LABEL */}
        <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
          {hasData ? (
            <>
              <p className='text-2xl font-semibold'>{total}</p>
              <p className='text-xs text-muted-foreground'>Leads</p>
            </>
          ) : (
            <p className='text-sm text-muted-foreground'>No data</p>
          )}
        </div>
      </div>

      {/* CUSTOM LEGEND */}
      {hasData && (
        <div className='mt-4 flex flex-wrap gap-3 text-xs'>
          {chartData.map((item) => (
            <div key={item.status} className='flex items-center gap-2'>
              <div
                className='w-2.5 h-2.5 rounded-full'
                style={{
                  background: COLORS[item.status as keyof typeof COLORS],
                }}
              />
              <span className='capitalize text-muted-foreground'>
                {item.status}
              </span>
              <span className='font-medium'>{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
