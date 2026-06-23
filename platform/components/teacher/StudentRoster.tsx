'use client';

import { Badge } from '@/components/ui/badge';
import { SUBJECTS, STAGES, type SubjectKey, type StageKey } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StudentRosterProps {
  enrollments: {
    id: string;
    week_progress: number;
    status: string;
    student: { id: string; full_name: string; email: string; stage: StageKey | null };
    courses: { subject: SubjectKey; name: string; stage: StageKey };
  }[];
}

export function StudentRoster({ enrollments }: StudentRosterProps) {
  if (!enrollments.length) {
    return (
      <div className="border rounded-lg p-8 text-center text-sm text-muted-foreground">
        No students assigned yet.
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left font-medium px-4 py-3">Student</th>
            <th className="text-left font-medium px-4 py-3">Course</th>
            <th className="text-left font-medium px-4 py-3">Stage</th>
            <th className="text-left font-medium px-4 py-3">Progress</th>
            <th className="text-left font-medium px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e) => {
            const subject = SUBJECTS[e.courses.subject];
            return (
              <tr key={e.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="font-medium">{e.student.full_name}</div>
                  <div className="text-xs text-muted-foreground">{e.student.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn('text-xs font-medium', subject.accentText)}>{subject.name}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {STAGES[e.courses.stage]?.name ?? e.courses.stage}
                </td>
                <td className="px-4 py-3">Week {e.week_progress}</td>
                <td className="px-4 py-3">
                  <Badge variant={e.status === 'active' ? 'success' : 'secondary'}>{e.status}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
