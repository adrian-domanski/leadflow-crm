'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className='flex items-center justify-center px-4 bg-accent'
      style={{ minHeight: 'calc(100vh - 135px)' }}
    >
      <Card className='w-full max-w-sm shadow-xl'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl font-semibold'>{title}</CardTitle>
          {subtitle && (
            <p className='text-sm text-muted-foreground'>{subtitle}</p>
          )}
        </CardHeader>

        <CardContent className='space-y-5'>{children}</CardContent>
      </Card>
    </div>
  );
}
