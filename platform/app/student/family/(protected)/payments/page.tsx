import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { PaymentHistory } from '@/components/parent/PaymentHistory';

export default async function FamilyPaymentsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user!.id)
    .single();

  const { data: payments } = await supabase
    .from('payments')
    .select('*, student:profiles!payments_student_id_fkey(full_name)')
    .eq('student_id', user!.id)
    .order('created_at', { ascending: false });

  return (
    <main className="space-y-6 p-6 max-w-5xl">
      <Topbar
        greeting="Payment history"
        subtitle="Family tuition invoices and receipts (read-only)"
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />
      <PaymentHistory payments={payments ?? []} />
    </main>
  );
}
