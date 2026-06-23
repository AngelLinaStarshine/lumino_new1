'use client';

import { Check } from 'lucide-react';
import { CYCLE_STEPS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CycleProgressStripProps {
  currentStep: 'discovery' | 'lumino_start' | 'lumino_core' | 'lumino_path';
  weekProgress?: number;
  totalWeeks?: number;
}

export function CycleProgressStrip({ currentStep, weekProgress, totalWeeks }: CycleProgressStripProps) {
  const currentIndex = CYCLE_STEPS.findIndex(s => s.id === currentStep);

  return (
    <div className="grid grid-cols-4 gap-2 bg-white/70 border border-black/[0.06] rounded-xl p-3 shadow-soft">
      {CYCLE_STEPS.map((step, idx) => {
        const done    = idx < currentIndex;
        const current = idx === currentIndex;

        return (
          <div key={step.id} className="text-center">
            <div className={cn(
              'w-5 h-5 rounded-full mx-auto mb-2 flex items-center justify-center text-[10px] border',
              done    && 'bg-brand-teal border-brand-teal text-white',
              current && 'bg-gradient-to-r from-brand-yellow to-brand-accent border-brand-accent text-brand-navy',
              !done && !current && 'bg-white border-black/10 text-muted-foreground',
            )}>
              {done ? <Check className="w-3 h-3" /> : idx + 1}
            </div>
            <div className={cn(
              'text-[11px] font-medium mb-0.5',
              current && 'text-brand-teal',
            )}>
              {step.name}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {done && 'Completed'}
              {current && weekProgress && totalWeeks && `Week ${weekProgress} of ${totalWeeks}`}
              {!done && !current && step.duration}
            </div>
          </div>
        );
      })}
    </div>
  );
}
