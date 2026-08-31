'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, BookOpen, Calendar, Home, LogOut, MessageSquare, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { BrandMark } from '@/components/shared/BrandMark';
import { SidebarNavLink } from '@/components/shared/SidebarNavLink';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

const LINKS = [
  { href: '/student', label: 'Home', icon: Home },
  { href: '/student/schedule', label: 'Schedule', icon: Calendar },
  { href: '/student/messages', label: 'Messages', icon: MessageSquare },
  { href: '/student/profile', label: 'Profile', icon: User },
];

interface StudentShellProps {
  userName: string;
  children: React.ReactNode;
}

/** Minimal chrome — focus on the current task */
export function StudentShell({ userName, children }: StudentShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isPractice = pathname.startsWith('/student/practice');

  async function signOut() {
    await fetch('/api/auth/signout', { method: 'POST' });
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  if (isPractice) {
    return <div className="min-h-screen bg-brand-bg">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="platform-sidebar w-full md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-black/[0.06]">
        <div className="p-4 md:p-5">
          <BrandMark subtitle={userName} compact />
        </div>
        <nav className="flex md:flex-col gap-1 px-2 pb-3 overflow-x-auto">
          {LINKS.map(({ href, label, icon }) => (
            <SidebarNavLink
              key={href}
              href={href}
              active={pathname === href || (href !== '/student' && pathname.startsWith(href))}
              icon={icon}
            >
              {label}
            </SidebarNavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-black/[0.06] bg-white/70 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground hidden sm:block">Today&apos;s work</p>
          <div className="flex items-center gap-3 ml-auto">
            <button type="button" className="p-2 rounded-lg hover:bg-brand-warm/60" aria-label="Notifications">
              <Bell className="w-5 h-5 text-brand-teal" />
            </button>
            <Avatar className="h-9 w-9">
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={signOut}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-brand-warm/60"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
