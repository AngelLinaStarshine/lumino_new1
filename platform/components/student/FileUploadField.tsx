'use client';

import { useState, useRef } from 'react';
import { Upload, File, Link as LinkIcon, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FileUploadFieldProps {
  homeworkId: string;
  studentId: string;
  onUploaded?: (url: string, type: 'file' | 'google_doc') => void;
}

export function FileUploadField({ homeworkId, studentId, onUploaded }: FileUploadFieldProps) {
  const [mode, setMode] = useState<'file' | 'google_doc'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [googleUrl, setGoogleUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  /* Build accepted file types string */
  const acceptedExtensions = [
    ...ALLOWED_FILE_TYPES.document,
    ...ALLOWED_FILE_TYPES.pdf,
    ...ALLOWED_FILE_TYPES.image,
    ...ALLOWED_FILE_TYPES.text,
  ].join(',');

  /* Handle file selection + validation */
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File too large (max ${MAX_FILE_SIZE_MB} MB)`);
      return;
    }
    setError(null);
    setFile(f);
  }

  /* Upload to Supabase Storage */
  async function uploadFile() {
    if (!file) return;
    setUploading(true);
    setError(null);

    const path = `${studentId}/${homeworkId}/${Date.now()}-${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from('homework-submissions')
      .upload(path, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    /* Create submission record */
    const { error: dbError } = await supabase.from('submissions').upsert({
      homework_id: homeworkId,
      student_id:  studentId,
      file_url:    data.path,
      status:      'submitted',
      submitted_at: new Date().toISOString(),
    });

    if (dbError) {
      setError(dbError.message);
      setUploading(false);
      return;
    }

    setUploading(false);
    onUploaded?.(data.path, 'file');
  }

  /* Submit Google Docs URL */
  async function submitGoogleDoc() {
    if (!googleUrl.trim()) return;

    if (!googleUrl.includes('docs.google.com')) {
      setError('Please paste a valid Google Docs URL');
      return;
    }

    setUploading(true);
    const { error: dbError } = await supabase.from('submissions').upsert({
      homework_id:    homeworkId,
      student_id:     studentId,
      google_doc_url: googleUrl,
      status:         'submitted',
      submitted_at:   new Date().toISOString(),
    });

    if (dbError) {
      setError(dbError.message);
      setUploading(false);
      return;
    }

    setUploading(false);
    onUploaded?.(googleUrl, 'google_doc');
  }

  return (
    <div className="space-y-4">
      {/* Tabs: file vs Google Docs */}
      <div className="flex gap-1 bg-muted rounded-md p-1">
        <button
          onClick={() => setMode('file')}
          className={cn(
            'flex-1 px-3 py-2 text-xs font-medium rounded-sm transition-colors',
            mode === 'file' ? 'bg-background shadow-sm' : 'text-muted-foreground',
          )}
        >
          <Upload className="w-3.5 h-3.5 inline mr-1.5" />Upload file
        </button>
        <button
          onClick={() => setMode('google_doc')}
          className={cn(
            'flex-1 px-3 py-2 text-xs font-medium rounded-sm transition-colors',
            mode === 'google_doc' ? 'bg-background shadow-sm' : 'text-muted-foreground',
          )}
        >
          <LinkIcon className="w-3.5 h-3.5 inline mr-1.5" />Google Docs link
        </button>
      </div>

      {/* File upload area */}
      {mode === 'file' && (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-foreground/40 transition-colors">
          {!file ? (
            <>
              <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm mb-1">Drop your file here, or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-primary hover:underline"
              >
                browse to upload
              </button>
              <p className="text-xs text-muted-foreground mt-2">
                Word, PDF, image · max {MAX_FILE_SIZE_MB} MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={acceptedExtensions}
                onChange={handleFileSelect}
              />
            </>
          ) : (
            <div className="flex items-center justify-between gap-3 bg-muted/50 rounded-md p-3">
              <div className="flex items-center gap-3 min-w-0">
                <File className="w-5 h-5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <button onClick={() => setFile(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Google Docs URL */}
      {mode === 'google_doc' && (
        <div className="space-y-2">
          <label className="text-xs font-medium">Paste your Google Docs URL</label>
          <input
            type="url"
            value={googleUrl}
            onChange={e => setGoogleUrl(e.target.value)}
            placeholder="https://docs.google.com/document/d/..."
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground">
            Make sure your document is shared with view access.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-md">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={mode === 'file' ? uploadFile : submitGoogleDoc}
        disabled={uploading || (mode === 'file' ? !file : !googleUrl)}
        className="w-full bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
      >
        {uploading ? 'Submitting...' : 'Submit homework'}
      </button>
    </div>
  );
}
