'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  Calendar,
  CreditCard,
  GraduationCap,
  Home,
  LogOut,
  Lock,
  Settings,
  Users,
  Unlock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { BrandMark } from '@/components/shared/BrandMark';
import { SidebarNavLink } from '@/components/shared/SidebarNavLink';

const STUDENT_LINKS = [
  { href: '/student', label: 'Dashboard', icon: Home },
  { href: '/student/homework', label: 'Homework', icon: BookOpen },
  { href: '/student/schedule', label: 'Schedule', icon: Calendar },
  { href: '/student/progress', label: 'Progress', icon: GraduationCap },
];

const FAMILY_LINKS = [
  { href: '/student/family', label: 'Family overview', icon: Users },
  { href: '/student/family/payments', label: 'Payments', icon: CreditCard },
  { href: '/student/family/settings', label: 'SMS & alerts', icon: Settings },
];

interface StudentNavSidebarProps {
  userName: string;
  familyViewUnlocked: boolean;
}

export function StudentNavSidebar({ userName, familyViewUnlocked }: StudentNavSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const inFamilySection = pathname.startsWith('/student/family') && pathname !== '/student/family/unlock';

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  async function exitFamilyView() {
    await fetch('/api/student/verify-family-passcode', { method: 'DELETE' });
    router.push('/student');
    router.refresh();
  }

  function isActive(href: string, basePath: string) {
    return pathname === href || (href !== basePath && pathname.startsWith(href));
  }

  return (
    <aside className="platform-sidebar w-56 shrink-0">
      <div className="mb-6">
        <BrandMark subtitle={userName} />
        {familyViewUnlocked && inFamilySection && (
          <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wide bg-brand-warm text-brand-accent px-2 py-0.5 rounded-full">
            Parent view
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Student
        </p>
        {STUDENT_LINKS.map(({ href, label, icon }) => (
          <SidebarNavLink key={href} href={href} active={isActive(href, '/student')} icon={icon}>
            {label}
          </SidebarNavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-black/[0.06]">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Family
          </p>
          {familyViewUnlocked ? (
            <>
              {FAMILY_LINKS.map(({ href, label, icon }) => (
                <SidebarNavLink key={href} href={href} active={isActive(href, '/student/family')} icon={icon}>
                  {label}
                </SidebarNavLink>
              ))}
              <button
                type="button"
                onClick={exitFamilyView}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-white/60 hover:text-foreground w-full"
              >
                <Unlock className="w-4 h-4" />
                Exit parent view
              </button>
            </>
          ) : (
            <Link
              href="/student/family/unlock"
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === '/student/family/unlock'
                  ? 'bg-brand-warm text-brand-accent font-semibold'
                  : 'text-muted-foreground hover:bg-white/60 hover:text-foreground'
              )}
            >
              <Lock className="w-4 h-4" />
              Parent view
            </Link>
          )}
        </div>
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
