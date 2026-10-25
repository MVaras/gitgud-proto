export type UserRole = 'athlete' | 'coach' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  bio: string | null;
  current_xp: number;
  current_level: number;
  streak_count: number;
  last_training_date: string | null;
  total_sessions_completed: number;
  total_points_earned: number;
  created_at: string;
  updated_at: string;
}

export interface XPLog {
  id: string;
  profile_id: string;
  amount: number;
  reason: string;
  created_at: string;
}

export interface TrainingSession {
  id: string;
  profile_id: string;
  session_date: string;
  duration_minutes: number | null;
  intensity_level: 'low' | 'medium' | 'high' | null;
  metadata: Record<string, any>;
  created_at: string;
}

// B2B Entities
export type School = {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  location_lat: number | null;
  location_lng: number | null;
  logo_url: string | null;
  is_verified: boolean;
  created_at: string;
};

export type Class = {
  id: string;
  school_id: string;
  coach_id: string;
  title: string;
  sport_type: string;
  description: string | null;
  capacity: number;
  price: number;
  schedule_cron: string | null;
  created_at: string;
};

export type Enrollment = {
  id: string;
  user_id: string;
  class_id: string;
  status: 'active' | 'waitlist' | 'completed';
  enrolled_at: string;
};

export type Attendance = {
  id: string;
  enrollment_id: string;
  date: string;
  is_present: boolean;
  marked_by: string;
  created_at: string;
};

export interface Court {
  id: string;
  name: string;
  category: string;
  location: string | null;
  price_per_hour: number;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

