/* ─────────────────────────────────────────────────────────────
   LuminoLearn — Email Helper (Resend)
   Checks the recipient's email preference before sending.
   class_today emails include "Add to Google/Outlook Calendar"
   links for the next occurrence of the class.
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
  // For calendar links on class_today:
  dayOfWeek?: number;   // 0 = Sunday … 6 = Saturday
  startTime?: string;   // "16:00:00"
  endTime?: string;     // "17:00:00"
  zoomLink?: string;
}

/* ─── Map event → preference column in notification_prefs ───── */
function getPrefColumn(event: EmailEvent): string {
  if (event === 'class_today') return 'email_class';
  if (event.startsWith('homework')) return 'email_homework';
  if (event === 'feedback_posted') return 'email_feedback';
  return 'email_class';
}

/* ─── Calendar link helpers ─────────────────────────────────── */

/* Given a target day-of-week + HH:MM:SS, return the next Date at
   that time that is today-or-later (in UTC). */
function nextOccurrence(dayOfWeek: number, startTime: string): Date {
  const [h, m] = startTime.split(':').map((n) => parseInt(n, 10));
  const now = new Date();
  const result = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    h || 0,
    m || 0,
    0,
  ));
  const currentDow = result.getUTCDay();
  let delta = (dayOfWeek - currentDow + 7) % 7;
  // If it's the same day but the time already passed, push to next week.
  if (delta === 0 && result.getTime() < now.getTime()) delta = 7;
  result.setUTCDate(result.getUTCDate() + delta);
  return result;
}

/* Format a Date as the compact UTC stamp calendars expect:
   YYYYMMDDTHHMMSSZ */
function toCalStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function buildCalendarButtons(ctx: EmailContext): string {
  if (ctx.dayOfWeek === undefined || !ctx.startTime) return '';

  const start = nextOccurrence(ctx.dayOfWeek, ctx.startTime);
  // Default duration 1h if no end time.
  let end: Date;
  if (ctx.endTime) {
    const [eh, em] = ctx.endTime.split(':').map((n) => parseInt(n, 10));
    end = new Date(start);
    end.setUTCHours(eh || 0, em || 0, 0, 0);
    if (end.getTime() <= start.getTime()) end = new Date(start.getTime() + 60 * 60 * 1000);
  } else {
    end = new Date(start.getTime() + 60 * 60 * 1000);
  }

  const title = `${ctx.courseName ?? 'LuminoLearn Class'}`;
  const details = [
    ctx.teacherName ? `Teacher: ${ctx.teacherName}` : '',
    ctx.zoomLink ? `Join: ${ctx.zoomLink}` : '',
  ].filter(Boolean).join('\n');

  const s = toCalStamp(start);
  const e = toCalStamp(end);

  const googleUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${s}/${e}` +
    `&details=${encodeURIComponent(details)}` +
    (ctx.zoomLink ? `&location=${encodeURIComponent(ctx.zoomLink)}` : '');

  const outlookUrl =
    `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose` +
    `&subject=${encodeURIComponent(title)}` +
    `&startdt=${start.toISOString()}` +
    `&enddt=${end.toISOString()}` +
    `&body=${encodeURIComponent(details)}` +
    (ctx.zoomLink ? `&location=${encodeURIComponent(ctx.zoomLink)}` : '');

  const btn = (href: string, label: string) =>
    `<a href="${href}" style="display:inline-block;margin:4px 8px 4px 0;padding:8px 14px;` +
    `background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;">${label}</a>`;

  return `
    <p style="margin-top:16px;">Add this class to your calendar:</p>
    <p>
      ${btn(googleUrl, 'Add to Google Calendar')}
      ${btn(outlookUrl, 'Add to Outlook')}
    </p>`;
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
            ${buildCalendarButtons(ctx)}
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

  if (prefs) {
    const col = getPrefColumn(event);
    const record = prefs as Record<string, boolean>;
    if (record[col] === false) return { success: false, reason: 'opted_out' };
  }

  /* 2. Build + send */
  const { subject, html } = buildEmail(event, context);

  try {
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