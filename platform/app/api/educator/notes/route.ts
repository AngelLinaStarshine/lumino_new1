import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { studentId, body } = await request.json();
  const admin = createAdminClient();

  const { data: note, error } = await admin
    .from('educator_notes')
    .insert({ educator_id: user.id, student_id: studentId, body })
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ note });
}
