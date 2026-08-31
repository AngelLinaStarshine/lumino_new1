'use client';

import { useRouter } from 'next/navigation';
import { Home, Users, Link2, Calendar, CreditCard, Mail, LogOut, Shield } from 'lucide-react';
import { BrandMark } from '@/components/shared/BrandMark';
import { cn } from '@/lib/utils';

export type AdminTab = 'overview' | 'users' | 'assignments' | 'classes' | 'payments' | 'invites';

const TABS: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'assignments', label: 'Assignments', icon: Link2 },
  { id: 'classes', label: 'Classes', icon: Calendar },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'invites', label: 'Invites', icon: Mail },
];

interface AdminShellProps {
  userName: string;
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: React.ReactNode;
}

export function AdminShell({ userName, activeTab, onTabChange, children }: AdminShellProps) {
  const router = useRouter();

  async function signOut() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-52 shrink-0 bg-brand-navy text-white flex flex-col min-h-screen">
        <div className="p-5">
          <BrandMark subtitle={`Admin · ${userName}`} inverted />
        </div>
        <nav className="space-y-0.5 px-2 flex-1">
          {TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left',
                activeTab === id
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              {(() => {
                const Icon = icon;
                return <Icon className="w-4 h-4 shrink-0" />;
              })()}
              {label}
            </button>
          ))}
        </nav>
        <div className="p-2 space-y-1">
          <a
            href="/api/health"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10"
          >
            <Shield className="w-4 h-4" />
            System health
          </a>
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 w-full"
          >
            <LogOut className="w-4 h-4" />
            Lock admin
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-brand-bg/50">{children}</main>
    </div>
  );
}
