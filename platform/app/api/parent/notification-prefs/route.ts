import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendOptInConfirmation } from '@/lib/sms';

export async function PUT(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { phone, sms_homework, sms_class, sms_payment, sms_feedback } = body;

  if (phone) {
    await supabase.from('profiles').update({ phone }).eq('id', user.id);
  }

  const anySmsOn = sms_homework || sms_class || sms_payment || sms_feedback;
  const { data: existing } = await supabase
    .from('notification_prefs')
    .select('opted_in_at, sms_homework, sms_class, sms_payment, sms_feedback')
    .eq('user_id', user.id)
    .single();

  const wasOptedIn =
    existing &&
    (existing.sms_homework || existing.sms_class || existing.sms_payment || existing.sms_feedback);

  const { data: prefs, error } = await supabase
    .from('notification_prefs')
    .upsert({
      user_id: user.id,
      sms_homework: Boolean(sms_homework),
      sms_class: Boolean(sms_class),
      sms_payment: Boolean(sms_payment),
      sms_feedback: Boolean(sms_feedback),
      opted_in_at: anySmsOn ? existing?.opted_in_at ?? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  if (anySmsOn && !wasOptedIn && phone) {
    await sendOptInConfirmation(user.id, phone);
  }

  return NextResponse.json({ prefs });
}
