'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ProgressBar } from '@/components/ui/progress';
import { fmtClassTime } from '@/lib/utils';

interface StudentDetailTabsProps {
  educatorId: string;
  student: { id: string; name: string };
  enrolments: { subject?: string; tier?: string; mastery?: number }[];
  submissions: Array<{ id: string; is_correct: boolean; submitted_at: string; practice_tasks?: { title?: string } }>;
  classes: Array<{ id: string; scheduled_at: string; format: string; subjects?: { name?: string }; status: string }>;
  notes: Array<{ id: string; body: string; created_at: string }>;
}

export function StudentDetailTabs(props: StudentDetailTabsProps) {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(props.notes);

  async function addNote() {
    if (!note.trim()) return;
    const res = await fetch('/api/educator/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: props.student.id, body: note }),
    });
    const data = await res.json();
    if (res.ok) {
      setNotes((n) => [data.note, ...n]);
      setNote('');
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-display">{props.student.name}</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="practice">Practice history</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {props.enrolments.map((e, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <p className="font-medium">{e.subject}</p>
                <p className="text-sm text-muted-foreground">{e.tier}</p>
                <ProgressBar value={e.mastery ?? 0} className="mt-2" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="progress">
          <p className="text-sm text-muted-foreground">Accuracy trends — detailed charts ship in a later release.</p>
          <div className="grid gap-3 mt-4">
            {props.enrolments.map((e, i) => (
              <div key={i} className="text-sm">
                {e.subject}: {e.mastery ?? 0}% mastery
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.submissions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.practice_tasks?.title}</TableCell>
                  <TableCell>{s.is_correct ? 'Correct' : 'Incorrect'}</TableCell>
                  <TableCell>{new Date(s.submitted_at).toLocaleString('en-CA')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="classes">
          <div className="space-y-2">
            {props.classes.map((c) => (
              <Card key={c.id}>
                <CardContent className="p-3 text-sm">
                  {c.subjects?.name} · {fmtClassTime(c.scheduled_at)} · {c.format} · {c.status}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Private note (not visible to student or parent)…" />
          <Button onClick={addNote}>Add note</Button>
          <div className="space-y-2">
            {notes.map((n) => (
              <Card key={n.id}>
                <CardContent className="p-3 text-sm">
                  <p>{n.body}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(n.created_at).toLocaleString('en-CA')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <p className="text-sm">
            <a href="/educator/messages" className="text-brand-teal hover:underline">
              Open message centre →
            </a>
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
