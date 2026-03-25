'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import { useLeadsDaily } from '../hooks';

export default function LeadsChart() {
  const { data, isLoading } = useLeadsDaily();

  if (isLoading) return <div>Loading chart...</div>;
  console.log(data);
  const chartData =
    data?.map((item: any) => ({
      date:
        typeof item.date === 'string'
          ? item.date.slice(5) // np. "03-01"
          : String(item.date),
      count: Number(item.count),
    })) ?? [];

  return (
    <div className='h-80 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='count'
            stroke='#6366f1'
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
