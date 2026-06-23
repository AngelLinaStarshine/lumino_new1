'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Calculator } from 'lucide-react';
import { SUBJECTS, type SubjectKey } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  enrollment: {
    id: string;
    week_progress: number;
    courses: {
      id: string;
      subject: SubjectKey;
      name: string;
      stage: string;
    };
    teacher?: { full_name: string };
  };
}

const ICON_MAP = {
  number_ninjas: Calculator,
  word_wizards:  BookOpen,
  code_explorers: Code,
};

export function CourseCard({ enrollment }: CourseCardProps) {
  const subject = SUBJECTS[enrollment.courses.subject];
  const Icon    = ICON_MAP[enrollment.courses.subject];
  const totalWeeks = 24;
  const progress = Math.round((enrollment.week_progress / totalWeeks) * 100);

  return (
    <Link
      href={`/student/courses/${enrollment.courses.id}`}
      className="block bg-card border rounded-lg p-4 hover:border-foreground/30 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={cn('w-8 h-8 rounded-md flex items-center justify-center', subject.accentBg, subject.accentText)}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-medium">{subject.name}</div>
          <div className="text-[10px] text-muted-foreground">{subject.subject}</div>
        </div>
      </div>

      <div className="text-sm font-medium mb-1">{enrollment.courses.name}</div>
      <div className="text-xs text-muted-foreground mb-2">
        {enrollment.teacher?.full_name ?? 'Teacher TBD'} · Lesson {enrollment.week_progress} of {totalWeeks}
      </div>

      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div className={cn('h-full', subject.accentFill)} style={{ width: `${progress}%` }} />
      </div>

      <div className="flex justify-between text-[11px] text-muted-foreground mt-2">
        <span>{progress}% complete</span>
        <span className="flex items-center gap-1 text-primary">
          Join class <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
