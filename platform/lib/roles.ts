import type { UserRole } from '@/types/database';

/** DB role `teacher` maps to product surface "educator". */
export function roleDashboardPath(role: UserRole): string {
  switch (role) {
    case 'student':
      return '/student';
    case 'parent':
      return '/student/family/unlock';
    case 'teacher':
      return '/educator';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
}

export function isEducatorRole(role: UserRole | string | null | undefined): boolean {
  return role === 'teacher' || role === 'admin';
}

export function displayRole(role: UserRole): string {
  if (role === 'teacher') return 'Educator';
  return role.charAt(0).toUpperCase() + role.slice(1);
}
