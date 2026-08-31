'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function ProfileSettings({ highContrast, userId }: { highContrast: boolean; userId: string }) {
  const [contrast, setContrast] = useState(highContrast);

  async function toggle(checked: boolean) {
    setContrast(checked);
    await fetch('/api/student/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ highContrast: checked }),
    });
    document.documentElement.classList.toggle('high-contrast', checked);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Accessibility</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="contrast" className="flex-1">High contrast mode</Label>
          <Switch id="contrast" checked={contrast} onCheckedChange={toggle} />
        </div>
      </CardContent>
    </Card>
  );
}
