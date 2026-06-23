import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default async function TeacherDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single();

  const { count: studentCount } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('teacher_id', user!.id);

  const { count: hwCount } = await supabase
    .from('homework')
    .select('*', { count: 'exact', head: true })
    .eq('created_by', user!.id);

  return (
    <main className="space-y-6 p-6 max-w-5xl">
      <Topbar
        greeting={`Hello, ${profile?.full_name.split(' ')[0]}`}
        subtitle="Manage your classes and students"
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{studentCount ?? 0}</div>
            <Link href="/teacher/students" className="text-sm text-primary hover:underline mt-2 block">
              View roster →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/teacher/lessons" className="text-sm text-primary hover:underline">
              Build lesson plans →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Homework</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">{hwCount ?? 0}</div>
            <Link href="/teacher/homework" className="text-sm text-primary hover:underline mt-2 block">
              Assign homework →
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
