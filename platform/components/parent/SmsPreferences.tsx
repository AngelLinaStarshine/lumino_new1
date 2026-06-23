'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { NotificationPrefs } from '@/types/database';

interface SmsPreferencesProps {
  prefs: NotificationPrefs;
  phone: string | null;
}

export function SmsPreferences({ prefs: initial, phone: initialPhone }: SmsPreferencesProps) {
  const [prefs, setPrefs] = useState(initial);
  const [phone, setPhone] = useState(initialPhone ?? '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMessage(null);

    const res = await fetch('/api/parent/notification-prefs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...prefs, phone }),
    });

    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setMessage(data.error ?? 'Failed to save');
      return;
    }
    setMessage('Preferences saved');
    if (data.prefs) setPrefs(data.prefs);
  }

  function toggle(key: keyof NotificationPrefs) {
    if (typeof prefs[key] !== 'boolean') return;
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

  const toggles = [
    { key: 'sms_homework' as const, label: 'Homework assigned', desc: 'When new homework is posted' },
    { key: 'sms_class' as const, label: 'Class reminders', desc: '30 minutes before live class' },
    { key: 'sms_payment' as const, label: 'Payment alerts', desc: 'Due dates and overdue notices' },
    { key: 'sms_feedback' as const, label: 'Teacher feedback', desc: 'When work is graded' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>SMS notification preferences</CardTitle>
        <CardDescription>
          Manage how Luminolearn contacts you by text. You can opt out at any time by replying STOP.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Mobile number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (437) 424-1380"
          />
          {prefs.phone_verified && (
            <p className="text-xs text-lumino-teal-800">Phone verified</p>
          )}
        </div>

        <div className="space-y-4">
          {toggles.map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor={key}>{label}</Label>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                id={key}
                checked={Boolean(prefs[key])}
                onCheckedChange={() => toggle(key)}
              />
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground border-t pt-4">
          By enabling SMS, you consent to receive automated messages from Luminolearn Inc. Message and
          data rates may apply. This consent is required under CASL. You may withdraw consent at any
          time in Settings or by replying STOP.
        </p>

        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        <Button onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save preferences'}
        </Button>
      </CardContent>
    </Card>
  );
}
