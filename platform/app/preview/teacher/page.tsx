import { NavSidebar } from '@/components/shared/NavSidebar';
import { Topbar } from '@/components/shared/Topbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

/** Public demo view of the teacher dashboard (sample data, no login required) */
export default function TeacherAccountPreview() {
  return (
    <div className="flex min-h-screen">
      <NavSidebar role="teacher" userName="Jordan Kim" />
      <div className="flex-1 overflow-auto bg-background">
        <div className="bg-brand-mint/20 border-b border-brand-mint/40 px-6 py-2 text-xs text-brand-teal font-medium">
          Preview mode — sample teacher account (demo data)
        </div>
        <main className="space-y-6 p-6 max-w-5xl">
          <Topbar
            greeting="Hello, Jordan"
            subtitle="Manage your classes and students"
            name="Jordan Kim"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal">Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">8</div>
                <Link href="/preview/teacher/students" className="text-sm text-primary hover:underline mt-2 block">
                  View roster →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal">Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/preview/teacher/lessons" className="text-sm text-primary hover:underline">
                  Build lesson plans →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal">Homework</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">12</div>
                <Link href="/preview/teacher/homework" className="text-sm text-primary hover:underline mt-2 block">
                  Assign homework →
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
