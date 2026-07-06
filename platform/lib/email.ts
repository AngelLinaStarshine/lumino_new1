/* ─────────────────────────────────────────────────────────────
   LuminoLearn — Email Helper (Resend)
   Checks the recipient's email preference before sending.
   Resend is initialized lazily (inside the function) so the
   production build does not fail when env vars are absent at
   build time.
   ───────────────────────────────────────────────────────────── */

import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/admin';

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
  // Lazily initialize Resend at call time (not module load), so a
  // missing key never breaks the build — only this call.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { success: false, reason: 'no_api_key' };
  const resend = new Resend(apiKey);

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
    // IMPORTANT: Resend returns { data, error } — it does NOT throw on
    // API errors. We must inspect `error` explicitly, otherwise a
    // rejected send would be falsely reported as success.
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: profile.email,
      subject,
      html,
    });

    if (error) {
      console.error('Resend returned error:', JSON.stringify(error));
      return { success: false, reason: `resend_error: ${error.message ?? 'unknown'}` };
    }

    if (!data?.id) {
      console.error('Resend returned no id and no error:', JSON.stringify({ data, error }));
      return { success: false, reason: 'no_id_returned' };
    }

    return { success: true };
  } catch (err) {
    console.error('Resend send threw:', err);
    return { success: false, reason: 'send_threw' };
  }
}