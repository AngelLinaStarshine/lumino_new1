import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { TIER_LABELS } from '@/lib/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function EducatorCurriculumPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const admin = createAdminClient();
  const { data: subjects } = await admin.from('subjects').select('*').order('name');
  const { data: levels } = await admin.from('levels').select('*');
  const { data: tasks } = await admin.from('practice_tasks').select('id, title, estimated_minutes, level_id');

  const levelsBySubject = (levels ?? []).reduce<Record<string, typeof levels>>((acc, l) => {
    (acc[l.subject_id] ??= []).push(l);
    return acc;
  }, {});

  const tasksByLevel = (tasks ?? []).reduce<Record<string, typeof tasks>>((acc, t) => {
    (acc[t.level_id] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-display">Curriculum browser</h1>
        <p className="text-sm text-muted-foreground">Read-only. Contact admin to edit curriculum.</p>
      </header>
      {(subjects ?? []).map((s) => (
        <Card key={s.id}>
          <CardHeader>
            <CardTitle>{s.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(levelsBySubject[s.id] ?? []).map((level) => (
              <div key={level.id} className="border-t pt-3 first:border-0 first:pt-0">
                <p className="font-medium">{TIER_LABELS[level.tier as keyof typeof TIER_LABELS] ?? level.name}</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {(tasksByLevel[level.id] ?? []).map((t) => (
                    <li key={t.id}>{t.title} · {t.estimated_minutes} min</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
