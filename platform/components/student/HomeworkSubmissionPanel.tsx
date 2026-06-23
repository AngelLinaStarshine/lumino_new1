'use client';

import { useRouter } from 'next/navigation';
import { FileUploadField } from '@/components/student/FileUploadField';

interface HomeworkSubmissionPanelProps {
  homeworkId: string;
  studentId: string;
  allowGoogleDocs: boolean;
}

export function HomeworkSubmissionPanel({
  homeworkId,
  studentId,
  allowGoogleDocs,
}: HomeworkSubmissionPanelProps) {
  const router = useRouter();

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Submit your work</h3>
      <FileUploadField
        homeworkId={homeworkId}
        studentId={studentId}
        onUploaded={() => {
          router.refresh();
        }}
      />
      {!allowGoogleDocs && (
        <p className="text-xs text-muted-foreground mt-2">Google Docs links are not allowed for this assignment.</p>
      )}
    </div>
  );
}
