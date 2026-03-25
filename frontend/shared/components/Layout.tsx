'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getMe, logout } from '@/shared/lib/auth';
import { useEffect, useState } from 'react';

type User = {
  email: string;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getMe();
      setUser(userData.data);
    };
    fetchUser();
  }, []);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Leads', href: '/dashboard/leads' },
  ];

  return (
    <div className='flex h-screen'>
      {/* SIDEBAR */}
      <div className='w-60 bg-zinc-900 text-white flex flex-col'>
        {/* LOGO */}
        <div className='px-6 py-5 border-b border-zinc-800'>
          <h2 className='text-lg font-semibold'>LeadFlow</h2>
        </div>

        {/* NAV */}
        <div className='flex-1 px-3 py-4 space-y-1'>
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm transition ${
                  isActive
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* USER + LOGOUT */}
        <div className='border-t border-zinc-800 p-4 space-y-3'>
          {/* USER INFO */}
          <div className='text-xs text-zinc-400 truncate'>
            {user?.email ?? 'Loading...'}
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className='w-full cursor-pointer text-left text-sm text-red-400 hover:text-red-300 transition'
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className='flex-1 overflow-auto p-6 bg-background'>{children}</div>
    </div>
  );
}
