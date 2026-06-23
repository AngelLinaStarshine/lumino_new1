'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface LessonOption {
  id: string;
  title: string;
  week: number;
  courses?: { name: string };
}

interface HomeworkAssignerProps {
  lessons: LessonOption[];
}

export function HomeworkAssigner({ lessons }: HomeworkAssignerProps) {
  const [lessonId, setLessonId] = useState(lessons[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [maxScore, setMaxScore] = useState(100);
  const [allowGoogleDocs, setAllowGoogleDocs] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await fetch('/api/teacher/homework', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lesson_id: lessonId,
        title,
        instructions,
        due_date: new Date(dueDate).toISOString(),
        max_score: maxScore,
        allow_google_docs: allowGoogleDocs,
        attachment_types: ['pdf', 'document', 'image'],
      }),
    });

    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setMessage(data.error ?? 'Failed to assign homework');
      return;
    }

    setMessage('Homework assigned — students and parents will be notified');
    setTitle('');
    setInstructions('');
    setDueDate('');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign homework</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Lesson</Label>
            <Select value={lessonId} onValueChange={setLessonId}>
              <SelectTrigger>
                <SelectValue placeholder="Select lesson" />
              </SelectTrigger>
              <SelectContent>
                {lessons.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    Week {l.week}: {l.title} ({l.courses?.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hw-title">Assignment title</Label>
            <Input id="hw-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
              placeholder="What should students complete?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due">Due date & time</Label>
              <Input
                id="due"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="score">Max score</Label>
              <Input
                id="score"
                type="number"
                min={1}
                value={maxScore}
                onChange={(e) => setMaxScore(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="google-docs">Allow Google Docs URL</Label>
              <p className="text-xs text-muted-foreground">Students can paste a shared doc link</p>
            </div>
            <Switch id="google-docs" checked={allowGoogleDocs} onCheckedChange={setAllowGoogleDocs} />
          </div>

          {message && <p className="text-sm text-muted-foreground">{message}</p>}

          <Button type="submit" disabled={saving || !lessonId}>
            {saving ? 'Assigning…' : 'Assign homework'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
