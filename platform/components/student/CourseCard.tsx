'use client';
import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Calculator, ExternalLink } from 'lucide-react';
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
      google_classroom_url?: string | null;
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
  const totalWeeks = 12;
  const progress = Math.min(100, Math.round((enrollment.week_progress / totalWeeks) * 100));
  const classroomUrl = enrollment.courses.google_classroom_url;

  return (
    <div className="bg-card border rounded-lg p-4 hover:border-foreground/30 transition-colors">
      <Link href={`/student/courses/${enrollment.courses.id}`} className="block">
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
            View course <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>

      {classroomUrl && (
        <a
          href={classroomUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium rounded-md border px-3 py-2 hover:bg-muted transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Open Google Classroom
        </a>
      )}
    </div>
  );
}
