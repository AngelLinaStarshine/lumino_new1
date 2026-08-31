'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface StudentRow {
  id: string;
  name: string;
  dob?: string | null;
  lastActive?: string | null;
  subjects: (string | undefined)[];
  nextClass?: string | null;
}

export function EducatorRoster({ students }: { students: StudentRow[] }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    return students.filter((s) => s.name.toLowerCase().includes(term));
  }, [students, q]);

  return (
    <div className="space-y-4">
      <Input placeholder="Search students…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
      <div className="border rounded-xl overflow-hidden bg-white/90">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Last active</TableHead>
              <TableHead>Next class</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s) => (
              <TableRow key={s.id} className="cursor-pointer">
                <TableCell>
                  <Link href={`/educator/students/${s.id}`} className="font-medium hover:text-brand-teal">
                    {s.name}
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{s.subjects.join(', ') || '—'}</TableCell>
                <TableCell className="text-sm">
                  {s.lastActive ? new Date(s.lastActive).toLocaleDateString('en-CA') : '—'}
                </TableCell>
                <TableCell className="text-sm">
                  {s.nextClass ? new Date(s.nextClass).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
