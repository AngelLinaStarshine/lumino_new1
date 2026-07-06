/* ─────────────────────────────────────────────────────────────
   LuminoLearn — Email Helper (Resend)
   Checks the recipient's email preference before sending.
   Mirrors the structure of lib/sms.ts.
   ───────────────────────────────────────────────────────────── */

import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/admin';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM_EMAIL ?? 'notifications@luminolearn.ca';

/* ─── Email event types (subset we support today) ───────────── */
export type EmailEvent =
  | 'class_today'
  | 'homework_assigned'
  | 'feedback_posted';

interface EmailContext {
  studentName?: string;
  courseName?: string;
  teacherName?: string;
  classTime?: string;
  homeworkTitle?: string;
  dueDate?: string;
  score?: string;
  link?: string;
}

/* ─── Map event → preference column in notification_prefs ───── */
function getPrefColumn(event: EmailEvent): string {
  if (event === 'class_today') return 'email_class';
  if (event.startsWith('homework')) return 'email_homework';
  if (event === 'feedback_posted') return 'email_feedback';
  return 'email_class';
}

/* ─── Build subject + HTML body from event + context ────────── */
function buildEmail(event: EmailEvent, ctx: EmailContext): { subject: string; html: string } {
  const link = ctx.link
    ? `<p><a href="${ctx.link}" style="color:#2563eb;">Open LuminoLearn</a></p>`
    : '';

  switch (event) {
    case 'class_today':
      return {
        subject: `Reminder: ${ctx.studentName} has ${ctx.courseName} today`,
        html: `
          <div style="font-family:Arial,sans-serif;font-size:15px;color:#111;">
            <p>Hi,</p>
            <p><strong>${ctx.studentName}</strong> has a class today:</p>
            <p style="font-size:16px;">
              <strong>${ctx.courseName}</strong><br/>
              ${ctx.teacherName ? `with ${ctx.teacherName}<br/>` : ''}
              Starts at <strong>${ctx.classTime}</strong>
            </p>
            ${link}
            <p style="color:#666;font-size:13px;">— LuminoLearn</p>
          </div>`,
      };

    case 'homework_assigned':
      return {
        subject: `New homework for ${ctx.studentName}: ${ctx.homeworkTitle}`,
        html: `
          <div style="font-family:Arial,sans-serif;font-size:15px;color:#111;">
            <p>Hi,</p>
            <p>New homework has been assigned in <strong>${ctx.courseName}</strong>:</p>
            <p style="font-size:16px;"><strong>${ctx.homeworkTitle}</strong><br/>Due ${ctx.dueDate}</p>
            ${link}
            <p style="color:#666;font-size:13px;">— LuminoLearn</p>
          </div>`,
      };

    case 'feedback_posted':
      return {
        subject: `Feedback posted for ${ctx.studentName}`,
        html: `
          <div style="font-family:Arial,sans-serif;font-size:15px;color:#111;">
            <p>Hi,</p>
            <p>${ctx.teacherName ?? 'A teacher'} reviewed work in <strong>${ctx.courseName}</strong>.</p>
            ${ctx.score ? `<p>Score: <strong>${ctx.score}</strong></p>` : ''}
            ${link}
            <p style="color:#666;font-size:13px;">— LuminoLearn</p>
          </div>`,
      };
  }
}

/* ─── Main: send an email to a user (respects their prefs) ──── */
export async function sendEmail({
  userId,
  event,
  context,
}: {
  userId: string;
  event: EmailEvent;
  context: EmailContext;
}): Promise<{ success: boolean; reason?: string }> {
  const admin = createAdminClient();

  /* 1. Look up the user's email + preferences */
  const { data: profile } = await admin
    .from('profiles')
    .select('email, full_name')
    .eq('id', userId)
    .single();

  if (!profile?.email) return { success: false, reason: 'no_email' };

  const { data: prefs } = await admin
    .from('notification_prefs')
    .select('*')
    .eq('user_id', userId)
    .single();

  // If a prefs row exists and the relevant column is explicitly false, skip.
  // If no prefs row exists, default to sending (email defaults are `on`).
  if (prefs) {
    const col = getPrefColumn(event);
    const record = prefs as Record<string, boolean>;
    if (record[col] === false) return { success: false, reason: 'opted_out' };
  }

  /* 2. Build + send */
  const { subject, html } = buildEmail(event, context);

  try {
    await resend.emails.send({
      from: FROM,
      to: profile.email,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Resend send failed:', error);
    return { success: false, reason: 'send_failed' };
  }
}