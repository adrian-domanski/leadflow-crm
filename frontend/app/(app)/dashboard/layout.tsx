import AuthGuard from '@/shared/components/AuthGuard';
import Layout from '@/shared/components/Layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Layout>{children}</Layout>
    </AuthGuard>
  );
}
