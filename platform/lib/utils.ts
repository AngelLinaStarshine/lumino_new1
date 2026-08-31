import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Currency formatting (CAD) */
export function fmtCAD(cents: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(cents / 100);
}

/* Date formatting for due dates */
export function fmtDueDate(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/* Get initials from full name */
export function getInitials(name: string) {
  return name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function joinRow<T>(row: unknown): T | null {
  if (!row) return null;
  if (Array.isArray(row)) return (row[0] as T) ?? null;
  return row as T;
}
export function fmtClassTime(scheduledAt: string) {
  return new Date(scheduledAt).toLocaleString('en-CA', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function canJoinClass(scheduledAt: string): boolean {
  const start = new Date(scheduledAt).getTime();
  const now = Date.now();
  return now >= start - 10 * 60 * 1000;
}

/* Calculate days until a due date */
export function daysUntil(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = d.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
