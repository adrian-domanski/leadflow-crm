'use client';
import { logout } from '@/shared/lib/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: 240,
          background: '#111',
          color: 'white',
          padding: 20,
        }}
      >
        <h2>LeadFlow</h2>

        <div style={{ marginTop: 20 }}>
          <a href='/dashboard'>Dashboard</a>
        </div>

        <div style={{ marginTop: 10 }}>
          <a href='/dashboard/leads'>Leads</a>
        </div>

        <button onClick={logout} style={{ marginTop: 40 }}>
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 30 }}>{children}</div>
    </div>
  );
}
