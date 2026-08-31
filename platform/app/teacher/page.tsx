import { redirect } from 'next/navigation';

export default function TeacherRedirect({ params }: { params?: { path?: string[] } }) {
  redirect('/educator');
}
