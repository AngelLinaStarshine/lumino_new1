export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole = 'student' | 'parent' | 'teacher' | 'admin';
export type Stage = 'foundations' | 'growth' | 'mastery';
export type Subject = 'number_ninjas' | 'word_wizards' | 'code_explorers';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type HwStatus = 'assigned' | 'in_progress' | 'submitted' | 'graded';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  stage: Stage | null;
  date_of_birth: string | null;
  created_at: string;
  updated_at: string;
}

export interface FamilyLink {
  id: string;
  parent_id: string;
  student_id: string;
  passcode_hash: string;
  relationship: string;
  created_at: string;
}

export interface Course {
  id: string;
  subject: Subject;
  stage: Stage;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  week: number;
  title: string;
  chapters: Json;
  zoom_link: string | null;
  scheduled_at: string | null;
  created_at: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  teacher_id: string | null;
  cycle: string;
  week_progress: number;
  status: string;
  enrolled_at: string;
}

export interface Homework {
  id: string;
  lesson_id: string;
  title: string;
  instructions: string | null;
  due_date: string;
  attachment_types: Json;
  allow_google_docs: boolean;
  max_score: number;
  created_by: string | null;
  created_at: string;
}

export interface Submission {
  id: string;
  homework_id: string;
  student_id: string;
  file_url: string | null;
  google_doc_url: string | null;
  notes: string | null;
  submitted_at: string;
  score: number | null;
  feedback: string | null;
  audio_feedback_url: string | null;
  graded_at: string | null;
  graded_by: string | null;
  status: HwStatus;
}

export interface Payment {
  id: string;
  parent_id: string;
  student_id: string;
  amount_cents: number;
  currency: string;
  stripe_payment_id: string | null;
  status: PaymentStatus;
  invoice_url: string | null;
  description: string | null;
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface NotificationPrefs {
  user_id: string;
  sms_homework: boolean;
  sms_class: boolean;
  sms_payment: boolean;
  sms_feedback: boolean;
  email_homework: boolean;
  email_class: boolean;
  email_payment: boolean;
  email_feedback: boolean;
  phone_verified: boolean;
  opted_in_at: string | null;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & { created_at?: string; updated_at?: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      family_links: {
        Row: FamilyLink;
        Insert: Omit<FamilyLink, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<FamilyLink>;
        Relationships: [];
      };
      courses: {
        Row: Course;
        Insert: Omit<Course, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Course>;
        Relationships: [];
      };
      lessons: {
        Row: Lesson;
        Insert: Omit<Lesson, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Lesson>;
        Relationships: [];
      };
      enrollments: {
        Row: Enrollment;
        Insert: Omit<Enrollment, 'id' | 'enrolled_at'> & { id?: string; enrolled_at?: string };
        Update: Partial<Enrollment>;
        Relationships: [];
      };
      homework: {
        Row: Homework;
        Insert: Omit<Homework, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Homework>;
        Relationships: [];
      };
      submissions: {
        Row: Submission;
        Insert: Omit<Submission, 'id' | 'submitted_at'> & { id?: string; submitted_at?: string };
        Update: Partial<Submission>;
        Relationships: [];
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Payment>;
        Relationships: [];
      };
      notification_prefs: {
        Row: NotificationPrefs;
        Insert: NotificationPrefs;
        Update: Partial<NotificationPrefs>;
        Relationships: [];
      };
      assessments: {
        Row: { id: string; student_id: string; course_id: string; type: string; score: number; max_score: number; baseline_score: number | null; notes: string | null; taken_at: string };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      notifications: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      sms_log: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      schedule_slots: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
