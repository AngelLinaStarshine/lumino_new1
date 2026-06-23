'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Calendar,
  CreditCard,
  GraduationCap,
  Home,
  LogOut,
  Settings,
  Users,
  ClipboardList,
  PenLine,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { UserRole } from '@/types/database';
import { BrandMark } from '@/components/shared/BrandMark';
import { SidebarNavLink } from '@/components/shared/SidebarNavLink';

const NAV: Record<UserRole, { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[]> = {
  student: [
    { href: '/student', label: 'Dashboard', icon: Home },
    { href: '/student/homework', label: 'Homework', icon: BookOpen },
    { href: '/student/schedule', label: 'Schedule', icon: Calendar },
    { href: '/student/progress', label: 'Progress', icon: GraduationCap },
    { href: '/student/settings', label: 'Settings', icon: Settings },
  ],
  parent: [
    { href: '/parent', label: 'Overview', icon: Home },
    { href: '/parent/payments', label: 'Payments', icon: CreditCard },
    { href: '/parent/settings', label: 'SMS & Settings', icon: Settings },
  ],
  teacher: [
    { href: '/teacher', label: 'Dashboard', icon: Home },
    { href: '/teacher/students', label: 'Students', icon: Users },
    { href: '/teacher/lessons', label: 'Lessons', icon: PenLine },
    { href: '/teacher/homework', label: 'Homework', icon: ClipboardList },
    { href: '/teacher/schedule', label: 'Schedule', icon: Calendar },
  ],
  admin: [{ href: '/teacher', label: 'Admin', icon: Home }],
};

interface NavSidebarProps {
  role: UserRole;
  userName: string;
}

export function NavSidebar({ role, userName }: NavSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const links = NAV[role] ?? NAV.student;

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <aside className="platform-sidebar w-56 shrink-0">
      <div className="mb-6">
        <BrandMark subtitle={userName} />
      </div>
      <nav className="flex-1 space-y-1">
        {links.map(({ href, label, icon }) => {
          const active = pathname === href || (href !== `/${role}` && pathname.startsWith(href));
          return (
            <SidebarNavLink key={href} href={href} active={active} icon={icon}>
              {label}
            </SidebarNavLink>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={signOut}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-white/60 hover:text-foreground mt-4"
        aria-label="Sign out"
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    </aside>
  );
}
