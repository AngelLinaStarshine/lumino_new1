'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { PracticeContent } from '@/lib/curriculum';

interface PracticeRunnerProps {
  taskId: string;
  title: string;
  subject: string;
  content: PracticeContent;
}

export function PracticeRunner({ taskId, title, subject, content }: PracticeRunnerProps) {
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState(content.starterCode ?? '// Write your code here\n');
  const [result, setResult] = useState<{ correct: boolean; explanation?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const payload =
      content.type === 'code'
        ? { value: code }
        : content.type === 'multiple_choice'
          ? { value: answer }
          : { value: answer.trim() };

    const res = await fetch('/api/student/practice/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, answer: payload }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) setResult({ correct: data.isCorrect, explanation: data.explanation });
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <p className="text-sm text-brand-teal font-semibold">{subject}</p>
        <h1 className="text-2xl font-display mt-1">{title}</h1>
      </div>

      {!result ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{content.prompt}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.type === 'multiple_choice' && content.options?.map((opt) => (
              <label key={opt} className="flex items-center gap-3 p-4 rounded-xl border border-black/10 cursor-pointer hover:bg-brand-warm/40 min-h-12">
                <input
                  type="radio"
                  name="choice"
                  value={opt}
                  checked={answer === opt}
                  onChange={() => setAnswer(opt)}
                  className="w-5 h-5"
                />
                <span>{opt}</span>
              </label>
            ))}
            {content.type === 'short_answer' && (
              <div className="space-y-2">
                <Label htmlFor="answer">Your answer</Label>
                <Input id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} className="min-h-12 text-lg" />
              </div>
            )}
            {content.type === 'code' && (
              <div className="space-y-2">
                <Label>Code editor</Label>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                  spellCheck={false}
                />
                <p className="text-xs text-muted-foreground">Monaco editor placeholder — run locally for now.</p>
              </div>
            )}
            <Button size="lg" className="w-full min-h-12" onClick={submit} disabled={loading || (!answer && content.type !== 'code')}>
              {loading ? 'Submitting…' : 'Submit'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className={result.correct ? 'border-brand-teal' : 'border-destructive/50'}>
          <CardContent className="p-6 space-y-4">
            <p className="text-lg font-semibold">{result.correct ? 'Correct!' : 'Not quite — keep going'}</p>
            {result.explanation && <p className="text-muted-foreground">{result.explanation}</p>}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="min-h-12 flex-1">
                <Link href="/student">Continue</Link>
              </Button>
              {!result.correct && (
                <Button variant="secondary" size="lg" className="min-h-12 flex-1" onClick={() => setResult(null)}>
                  Try again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
