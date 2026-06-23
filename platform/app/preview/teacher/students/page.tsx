import { NavSidebar } from '@/components/shared/NavSidebar';
import { Topbar } from '@/components/shared/Topbar';
import { StudentRoster } from '@/components/teacher/StudentRoster';

const MOCK_ENROLLMENTS = [
  {
    id: 'e1',
    week_progress: 6,
    status: 'active',
    student: { id: 's1', full_name: 'Alex Rivera', email: 'alex@example.com', stage: 'growth' as const },
    courses: { subject: 'number_ninjas' as const, name: 'Number Ninjas — Growth', stage: 'growth' as const },
  },
  {
    id: 'e2',
    week_progress: 4,
    status: 'active',
    student: { id: 's2', full_name: 'Maya Singh', email: 'maya@example.com', stage: 'growth' as const },
    courses: { subject: 'word_wizards' as const, name: 'Word Wizards — Growth', stage: 'growth' as const },
  },
  {
    id: 'e3',
    week_progress: 3,
    status: 'active',
    student: { id: 's3', full_name: 'Ethan Brooks', email: 'ethan@example.com', stage: 'foundations' as const },
    courses: { subject: 'code_explorers' as const, name: 'Code Explorers — Foundations', stage: 'foundations' as const },
  },
];

export default function TeacherRosterPreview() {
  return (
    <div className="flex min-h-screen">
      <NavSidebar role="teacher" userName="Jordan Kim" />
      <div className="flex-1 overflow-auto">
        <main className="space-y-6 p-6 max-w-5xl">
          <Topbar
            greeting="Student roster"
            subtitle="All students in your assigned classes"
            name="Jordan Kim"
          />
          <StudentRoster enrollments={MOCK_ENROLLMENTS} />
        </main>
      </div>
    </div>
  );
}
