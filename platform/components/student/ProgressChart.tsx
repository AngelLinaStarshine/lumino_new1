'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgressChartProps {
  assessments: { type: string; score: number; taken_at: string }[];
}

export function ProgressChart({ assessments }: ProgressChartProps) {
  const data = assessments.map((a) => ({
    name: a.type.replace('_', ' '),
    score: a.score,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length ? (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#534AB7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground py-8 text-center">No assessments yet</p>
        )}
      </CardContent>
    </Card>
  );
}
