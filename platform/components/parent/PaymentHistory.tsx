'use client';

import { ExternalLink, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fmtCAD } from '@/lib/utils';
import type { Payment } from '@/types/database';

type PaymentRow = Payment & { student?: { full_name: string } | null };

interface PaymentHistoryProps {
  payments: PaymentRow[];
}

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  paid: 'success',
  pending: 'warning',
  failed: 'destructive',
  refunded: 'secondary',
};

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  if (!payments.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-sm text-muted-foreground">
          No payment records yet. Invoices will appear here after enrollment.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment history</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left font-medium px-6 py-3">Date</th>
                <th className="text-left font-medium px-6 py-3">Student</th>
                <th className="text-left font-medium px-6 py-3">Description</th>
                <th className="text-left font-medium px-6 py-3">Amount</th>
                <th className="text-left font-medium px-6 py-3">Status</th>
                <th className="text-right font-medium px-6 py-3">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.paid_at
                      ? new Date(p.paid_at).toLocaleDateString('en-CA')
                      : p.due_date
                        ? `Due ${new Date(p.due_date).toLocaleDateString('en-CA')}`
                        : new Date(p.created_at).toLocaleDateString('en-CA')}
                  </td>
                  <td className="px-6 py-4">{p.student?.full_name ?? '—'}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.description ?? 'Tuition'}</td>
                  <td className="px-6 py-4 font-medium">{fmtCAD(p.amount_cents)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={STATUS_VARIANT[p.status] ?? 'secondary'}>{p.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {p.invoice_url ? (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={p.invoice_url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-1" />
                          Receipt
                          <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                        </a>
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
