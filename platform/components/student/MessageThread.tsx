'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  body: string;
  sender_id: string;
  created_at: string;
}

interface MessageThreadProps {
  threadId: string;
  educatorName: string;
  initialMessages: Message[];
  currentUserId: string;
}

export function MessageThread({ threadId, educatorName, initialMessages, currentUserId }: MessageThreadProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!body.trim()) return;
    setLoading(true);
    const res = await fetch('/api/messages/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId, body: body.trim() }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.message) {
      setMessages((m) => [...m, data.message]);
      setBody('');
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-[400px] border rounded-xl bg-white/90">
      <div className="p-3 border-b text-sm font-medium">{educatorName}</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'max-w-[85%] rounded-xl px-4 py-2 text-sm',
              m.sender_id === currentUserId
                ? 'ml-auto bg-brand-teal text-white'
                : 'bg-brand-warm text-brand-navy'
            )}
          >
            {m.body}
          </div>
        ))}
      </div>
      <div className="p-3 border-t flex gap-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a message…"
          rows={2}
          className="min-h-12"
        />
        <Button onClick={send} disabled={loading || !body.trim()} className="shrink-0 self-end min-h-12">
          Send
        </Button>
      </div>
    </div>
  );
}
