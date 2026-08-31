import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AssignPracticeForm } from '@/components/educator/AssignPracticeForm';

export default async function EducatorAssignPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-display">Assign practice</h1>
      <AssignPracticeForm educatorId={user.id} />
    </div>
  );
}
