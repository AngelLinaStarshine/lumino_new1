'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
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
import type { Course } from '@/types/database';

interface Chapter {
  title: string;
  content: string;
}

interface LessonBuilderProps {
  courses: Course[];
}

export function LessonBuilder({ courses }: LessonBuilderProps) {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [week, setWeek] = useState(1);
  const [title, setTitle] = useState('');
  const [zoomLink, setZoomLink] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([{ title: '', content: '' }]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function updateChapter(idx: number, field: keyof Chapter, value: string) {
    setChapters((prev) => prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c)));
  }

  function addChapter() {
    setChapters((prev) => [...prev, { title: '', content: '' }]);
  }

  function removeChapter(idx: number) {
    setChapters((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await fetch('/api/teacher/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        course_id: courseId,
        week,
        title,
        zoom_link: zoomLink || null,
        chapters: chapters.filter((c) => c.title.trim()),
      }),
    });

    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setMessage(data.error ?? 'Failed to save lesson');
      return;
    }

    setMessage('Lesson saved');
    setTitle('');
    setChapters([{ title: '', content: '' }]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson plan builder</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Course</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="week">Week</Label>
              <Input
                id="week"
                type="number"
                min={1}
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Lesson title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zoom">Zoom / Meet link</Label>
            <Input id="zoom" type="url" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Chapters</Label>
              <Button type="button" variant="outline" size="sm" onClick={addChapter}>
                <Plus className="w-4 h-4 mr-1" /> Add chapter
              </Button>
            </div>
            {chapters.map((ch, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Chapter {idx + 1}</span>
                  {chapters.length > 1 && (
                    <button type="button" onClick={() => removeChapter(idx)} aria-label="Remove chapter">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <Input
                  placeholder="Chapter title"
                  value={ch.title}
                  onChange={(e) => updateChapter(idx, 'title', e.target.value)}
                />
                <Textarea
                  placeholder="Chapter content / notes"
                  value={ch.content}
                  onChange={(e) => updateChapter(idx, 'content', e.target.value)}
                  rows={3}
                />
              </div>
            ))}
          </div>

          {message && <p className="text-sm text-muted-foreground">{message}</p>}

          <Button type="submit" disabled={saving || !courseId}>
            {saving ? 'Saving…' : 'Save lesson plan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
