'use client';

import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ScheduleList() {
  const slots = [
    { day: 'Tuesday', time: '3:00 PM', course: 'Number Ninjas', teacher: 'Ms. Chen' },
    { day: 'Thursday', time: '4:30 PM', course: 'Code Explorers', teacher: 'Mr. Patel' },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Upcoming classes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {slots.map((s) => (
          <div key={s.day + s.time} className="flex justify-between items-start text-sm border-b last:border-0 pb-3 last:pb-0">
            <div>
              <div className="font-medium">{s.course}</div>
              <div className="text-xs text-muted-foreground">{s.teacher}</div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div>{s.day}</div>
              <div>{s.time}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
