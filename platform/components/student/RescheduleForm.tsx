'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function RescheduleForm({ classId }: { classId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const res = await fetch('/api/student/reschedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ classId, reason }),
    });
    setLoading(false);
    if (res.ok) {
      setSent(true);
      setOpen(false);
    }
  }

  if (sent) return <p className="text-sm text-brand-teal">Request sent to your educator.</p>;

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Request reschedule
      </Button>
    );
  }

  return (
    <div className="space-y-2 pt-2">
      <Textarea
        placeholder="Tell your educator why you need to reschedule…"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={2}
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={submit} disabled={loading || !reason.trim()}>
          Send request
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
