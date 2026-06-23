import { BrandMark } from '@/components/shared/BrandMark';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex justify-center">
          <BrandMark size="lg" />
        </div>
        {children}
      </div>
    </div>
  );
}
