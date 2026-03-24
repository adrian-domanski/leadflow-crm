'use client';

import { useEffect, useState } from 'react';
import { api } from '@/shared/lib/api';
import Layout from '@/shared/components/Layout';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads');
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div>
      <h1>Leads</h1>

      {leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            padding: 10,
            border: '1px solid #ccc',
            marginTop: 10,
          }}
        >
          <div>{lead.name}</div>
          <div>{lead.email}</div>
        </div>
      ))}
    </div>
  );
}
