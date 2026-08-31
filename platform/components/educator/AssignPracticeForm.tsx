'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface Student { id: string; name: string }
interface Task { id: string; title: string; subject: string; estimated_minutes: number }

export function AssignPracticeForm({ educatorId }: { educatorId: string }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [studentId, setStudentId] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/educator/assign')
      .then((r) => r.json())
      .then((d) => {
        setStudents(d.students ?? []);
        setTasks(d.tasks ?? []);
      });
  }, []);

  function toggleTask(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length < 5 ? [...s, id] : s));
  }

  async function submit() {
    const res = await fetch('/api/educator/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, taskIds: selected, instructionNote: note }),
    });
    setStatus(res.ok ? 'Assigned!' : 'Failed to assign');
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Student</Label>
        <Select value={studentId} onValueChange={setStudentId}>
          <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
          <SelectContent>
            {students.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Tasks (1 to 5)</Label>
        <div className="space-y-2">
          {tasks.map((t) => (
            <Card
              key={t.id}
              className={selected.includes(t.id) ? 'ring-2 ring-brand-teal' : ''}
              onClick={() => toggleTask(t.id)}
            >
              <CardContent className="p-3 cursor-pointer">
                <p className="font-medium text-sm">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.subject} · {t.estimated_minutes} min</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Instruction note (optional)</Label>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} />
      </div>

      <Button onClick={submit} disabled={!studentId || !selected.length}>Assign</Button>
      {status && <p className="text-sm text-brand-teal">{status}</p>}
    </div>
  );
}
