import LeadsPageWrapper from '@/features/leads/components/LeadsPageWrapper';
import { Suspense } from 'react';

const LeadsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeadsPageWrapper />
    </Suspense>
  );
};

export default LeadsPage;
