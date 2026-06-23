/* ─────────────────────────────────────────────────────────────
   LuminoLearn — SMS Helper (Twilio)
   CASL-compliant. Checks opt-in. Logs every send.
   ───────────────────────────────────────────────────────────── */

import twilio from 'twilio';
import { createClient } from '@/lib/supabase/server';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken  = process.env.TWILIO_AUTH_TOKEN!;
const fromNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

/* ─── SMS event types ────────────────────────────────────────── */
export type SmsEvent =
  | 'homework_assigned'
  | 'homework_submitted'
  | 'feedback_posted'
  | 'payment_reminder'
  | 'payment_overdue'
  | 'class_starting'
  | 'pre_assessment_ready'
  | 'evaluation_due';

interface SmsContext {
  studentName?:   string;
  parentName?:    string;
  teacherName?:   string;
  courseName?:    string;
  homeworkTitle?: string;
  dueDate?:       string;
  amount?:        string;
  score?:         string;
  classTime?:     string;
  link?:          string;
}

/* ─── Build SMS body from event + context ────────────────────── */
function buildMessage(event: SmsEvent, ctx: SmsContext): string {
  const link = ctx.link ? `\n${ctx.link}` : '';
  const optOut = '\nReply STOP to opt out.';

  switch (event) {
    case 'homework_assigned':
      return `LuminoLearn: New homework in ${ctx.courseName} — ${ctx.homeworkTitle}. Due ${ctx.dueDate}.${link}${optOut}`;

    case 'homework_submitted':
      return `LuminoLearn: ${ctx.studentName} submitted ${ctx.homeworkTitle} in ${ctx.courseName}. Awaiting review.${link}${optOut}`;

    case 'feedback_posted':
      return `LuminoLearn: ${ctx.teacherName} reviewed your work in ${ctx.courseName}. Score: ${ctx.score}.${link}${optOut}`;

    case 'payment_reminder':
      return `LuminoLearn: Your tuition payment of ${ctx.amount} CAD is due ${ctx.dueDate}.${link}${optOut}`;

    case 'payment_overdue':
      return `LuminoLearn: Your tuition payment is overdue. Please update to avoid pause in classes.${link}${optOut}`;

    case 'class_starting':
      return `LuminoLearn reminder: ${ctx.courseName} with ${ctx.teacherName} starts at ${ctx.classTime}.${link}${optOut}`;

    case 'pre_assessment_ready':
      return `LuminoLearn: ${ctx.studentName}'s LuminoStart assessment is ready to begin.${link}${optOut}`;

    case 'evaluation_due':
      return `LuminoLearn: It's time for ${ctx.studentName}'s quarterly evaluation.${link}${optOut}`;
  }
}

/* ─── Map event → preference column ──────────────────────────── */
function getPrefColumn(event: SmsEvent): string {
  if (event.startsWith('homework')) return 'sms_homework';
  if (event === 'feedback_posted')  return 'sms_feedback';
  if (event.startsWith('payment'))  return 'sms_payment';
  if (event === 'class_starting')   return 'sms_class';
  return 'sms_homework';
}

/* ─── Main: trigger an SMS ───────────────────────────────────── */
export async function triggerSms({
  userId,
  event,
  context,
}: {
  userId:  string;
  event:   SmsEvent;
  context: SmsContext;
}): Promise<{ success: boolean; reason?: string }> {
  const supabase = createClient();

  /* 1. Check user preferences */
  const { data: prefs } = await supabase
    .from('notification_prefs')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!prefs) return { success: false, reason: 'no_prefs' };
  if (!prefs.phone_verified) return { success: false, reason: 'phone_not_verified' };

  const prefColumn = getPrefColumn(event);
  const prefsRecord = prefs as Record<string, boolean>;
  if (!prefsRecord[prefColumn]) return { success: false, reason: 'opted_out' };

  /* 2. Fetch user phone */
  const { data: profile } = await supabase
    .from('profiles')
    .select('phone, full_name')
    .eq('id', userId)
    .single();

  if (!profile?.phone) return { success: false, reason: 'no_phone' };

  /* 3. Build message */
  const body = buildMessage(event, context);

  /* 4. Send via Twilio */
  let twilioSid: string | null = null;
  let status = 'sent';
  try {
    const message = await client.messages.create({
      body,
      from: fromNumber,
      to:   profile.phone,
    });
    twilioSid = message.sid;
  } catch (error) {
    status = 'failed';
    console.error('Twilio send failed:', error);
  }

  /* 5. Log every send */
  await supabase.from('sms_log').insert({
    user_id:       userId,
    trigger_event: event,
    message_body:  body,
    twilio_sid:    twilioSid,
    status,
  });

  return { success: status === 'sent' };
}

/* ─── Send confirmation SMS on opt-in ────────────────────────── */
export async function sendOptInConfirmation(userId: string, phone: string) {
  const body =
    `LuminoLearn: You're subscribed to SMS updates. ` +
    `Reply STOP at any time to opt out. ` +
    `Message and data rates may apply.`;

  try {
    await client.messages.create({ body, from: fromNumber, to: phone });
  } catch (err) {
    console.error('Opt-in SMS failed:', err);
  }
}
