import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HomeworkSubmissionPanel } from '@/components/student/HomeworkSubmissionPanel';
import { SUBJECTS, type SubjectKey } from '@/lib/constants';
import { cn, fmtDueDate } from '@/lib/utils';

interface Props {
  params: { id: string };
}

export default async function HomeworkDetailPage({ params }: Props) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single();

  const { data: homework } = await supabase
    .from('homework')
    .select(`
      *,
      lessons(title, week, courses(subject, name)),
      submissions(id, status, score, feedback, submitted_at, file_url, google_doc_url)
    `)
    .eq('id', params.id)
    .single();

  if (!homework) notFound();

  const submission = homework.submissions?.[0];
  const subject = homework.lessons?.courses?.subject as SubjectKey | undefined;
  const brand = subject ? SUBJECTS[subject] : null;

  return (
    <main className="space-y-6 p-6 max-w-2xl">
      <Topbar
        greeting={homework.title}
        subtitle={homework.lessons?.courses?.name ?? 'Assignment'}
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            {brand && (
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', brand.accentBg, brand.accentText)}>
                {brand.name}
              </span>
            )}
            <Badge variant={submission ? 'success' : 'warning'}>
              {submission ? submission.status : 'Not submitted'}
            </Badge>
          </div>
          <CardTitle className="text-lg">{homework.title}</CardTitle>
          <p className="text-sm text-muted-foreground">Due {fmtDueDate(homework.due_date)}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {homework.instructions && (
            <div>
              <h3 className="text-sm font-medium mb-2">Instructions</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{homework.instructions}</p>
            </div>
          )}

          {submission?.feedback && (
            <div className="bg-lumino-teal-50 border border-lumino-teal-600/20 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-1">Teacher feedback</h3>
              <p className="text-sm">{submission.feedback}</p>
              {submission.score != null && (
                <p className="text-xs text-muted-foreground mt-2">Score: {submission.score}/{homework.max_score}</p>
              )}
            </div>
          )}

          {!submission || submission.status === 'assigned' || submission.status === 'in_progress' ? (
            <HomeworkSubmissionPanel
              homeworkId={homework.id}
              studentId={user.id}
              allowGoogleDocs={homework.allow_google_docs}
            />
          ) : (
            <div className="text-sm text-muted-foreground">
              Submitted {submission.submitted_at ? fmtDueDate(submission.submitted_at) : ''}
              {submission.google_doc_url && (
                <a href={submission.google_doc_url} target="_blank" rel="noopener noreferrer" className="text-primary block mt-1 hover:underline">
                  View Google Doc →
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
