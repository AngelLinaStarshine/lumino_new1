import { StudentNavSidebar } from '@/components/student/StudentNavSidebar';
import { Topbar } from '@/components/shared/Topbar';
import { CycleProgressStrip } from '@/components/student/CycleProgressStrip';
import { CourseCard } from '@/components/student/CourseCard';
import { HomeworkRow } from '@/components/student/HomeworkRow';
import { ScheduleList } from '@/components/student/ScheduleList';
import { ProgressChart } from '@/components/student/ProgressChart';
import { StatCard } from '@/components/shared/StatCard';
import { STAGES } from '@/lib/constants';

const MOCK_ENROLLMENTS = [
  {
    id: 'e1',
    week_progress: 6,
    courses: { id: 'c1', subject: 'number_ninjas' as const, name: 'Number Ninjas — Growth', stage: 'growth' },
    teacher: { full_name: 'Ms. Chen' },
  },
  {
    id: 'e2',
    week_progress: 4,
    courses: { id: 'c2', subject: 'word_wizards' as const, name: 'Word Wizards — Growth', stage: 'growth' },
    teacher: { full_name: 'Mr. Okonkwo' },
  },
  {
    id: 'e3',
    week_progress: 3,
    courses: { id: 'c3', subject: 'code_explorers' as const, name: 'Code Explorers — Growth', stage: 'growth' },
    teacher: { full_name: 'Ms. Patel' },
  },
];

const MOCK_HOMEWORK = [
  {
    id: 'h1',
    title: 'Fractions practice set',
    due_date: new Date(Date.now() + 2 * 86400000).toISOString(),
    lessons: { courses: { subject: 'number_ninjas' as const, name: 'Number Ninjas' } },
    submissions: [],
  },
  {
    id: 'h2',
    title: 'Persuasive essay draft',
    due_date: new Date(Date.now() + 5 * 86400000).toISOString(),
    lessons: { courses: { subject: 'word_wizards' as const, name: 'Word Wizards' } },
    submissions: [{ id: 's1', status: 'submitted', score: null, submitted_at: new Date().toISOString() }],
  },
];

const MOCK_ASSESSMENTS = [
  { type: 'lumino_start', score: 72, taken_at: '2025-09-01' },
  { type: 'three_week', score: 78, taken_at: '2025-10-01' },
  { type: 'three_month', score: 85, taken_at: '2026-01-01' },
];

/** Public demo view of the student dashboard (sample data, no login required) */
export default function StudentAccountPreview() {
  const stage = STAGES.growth;

  return (
    <div className="flex min-h-screen">
      <StudentNavSidebar userName="Alex Rivera" familyViewUnlocked={false} />
      <div className="flex-1 overflow-auto bg-background">
        <div className="bg-brand-mint/20 border-b border-brand-mint/40 px-6 py-2 text-xs text-brand-teal font-medium">
          Preview mode — sample student account (demo data)
        </div>
        <main className="space-y-6 p-6 max-w-6xl mx-auto">
          <Topbar
            greeting="Welcome back, Alex"
            subtitle="3 active courses · 2 assignments due this week"
            stagePill={`${stage.name} stage · ages ${stage.ageRange}`}
            name="Alex Rivera"
          />

          <CycleProgressStrip currentStep="lumino_core" weekProgress={6} totalWeeks={12} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Active subjects" value={3} icon="books" sub="Math · Language · CS" />
            <StatCard label="Next class" value="3:00 PM" icon="clock" sub="Number Ninjas in 2h" />
            <StatCard label="Cycle progress" value="78%" icon="target" sub="+6% this month" />
            <StatCard label="Streak" value="12 days" icon="flame" sub="Keep it going" />
          </div>

          <section>
            <h2 className="text-base font-medium mb-3">My pathway</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {MOCK_ENROLLMENTS.map((enrollment) => (
                <CourseCard key={enrollment.id} enrollment={enrollment} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3">Homework &amp; assignments</h2>
            <div className="border rounded-lg overflow-hidden bg-card">
              {MOCK_HOMEWORK.map((hw) => (
                <HomeworkRow key={hw.id} homework={hw} />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ScheduleList />
            <ProgressChart assessments={MOCK_ASSESSMENTS} />
          </div>
        </main>
      </div>
    </div>
  );
}
