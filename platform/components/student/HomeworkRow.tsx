'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SUBJECTS, type SubjectKey } from '@/lib/constants';
import { cn, daysUntil, fmtDueDate } from '@/lib/utils';

interface HomeworkRowProps {
  homework: {
    id: string;
    title: string;
    due_date: string;
    lessons?: {
      courses?: { subject: SubjectKey; name: string };
    };
    submissions?: { id: string; status: string; score: number | null }[];
  };
}

export function HomeworkRow({ homework }: HomeworkRowProps) {
  const submission = homework.submissions?.[0];
  const days = daysUntil(homework.due_date);
  const subject = homework.lessons?.courses?.subject
    ? SUBJECTS[homework.lessons.courses.subject]
    : null;

  let status: 'submitted' | 'due_soon' | 'in_progress' | 'overdue' = 'in_progress';
  if (submission?.status === 'submitted' || submission?.status === 'graded') status = 'submitted';
  else if (days < 0) status = 'overdue';
  else if (days <= 2) status = 'due_soon';

  const badgeVariant =
    status === 'submitted' ? 'success' : status === 'overdue' ? 'destructive' : status === 'due_soon' ? 'warning' : 'secondary';

  const badgeLabel =
    status === 'submitted' ? 'Submitted' : status === 'overdue' ? 'Overdue' : status === 'due_soon' ? 'Due soon' : 'In progress';

  return (
    <Link
      href={`/student/homework/${homework.id}`}
      className="flex items-center justify-between gap-4 px-4 py-3 border-b last:border-0 hover:bg-muted/40 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          {subject && (
            <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', subject.accentBg, subject.accentText)}>
              {subject.name}
            </span>
          )}
          <Badge variant={badgeVariant}>{badgeLabel}</Badge>
        </div>
        <div className="text-sm font-medium truncate">{homework.title}</div>
        <div className="text-xs text-muted-foreground">Due {fmtDueDate(homework.due_date)}</div>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </Link>
  );
}
