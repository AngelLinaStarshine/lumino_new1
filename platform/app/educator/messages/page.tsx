import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardContent } from '@/components/ui/card';

export default async function EducatorMessagesPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const admin = createAdminClient();
  const { data: threads } = await admin
    .from('message_threads')
    .select('id, student:profiles!message_threads_student_id_fkey(full_name)')
    .eq('educator_id', user.id);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-display">Message centre</h1>
      <p className="text-sm text-muted-foreground">Messages to students are copied to parents automatically.</p>
      <div className="space-y-2">
        {(threads ?? []).map((t) => (
          <Card key={t.id}>
            <CardContent className="p-4">
              <Link href={`/educator/students/${(t as { student?: { id?: string } }).student ? '' : ''}`} className="font-medium">
                {(t.student as { full_name?: string })?.full_name ?? 'Student'}
              </Link>
              <p className="text-xs text-muted-foreground mt-1">Open student detail → Messages tab</p>
            </CardContent>
          </Card>
        ))}
        {!threads?.length && <p className="text-muted-foreground">No active threads.</p>}
      </div>
    </div>
  );
}
