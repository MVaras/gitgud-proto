-- PHASE 1: IDENTITY & METRICS
-- Setup roles and types
CREATE TYPE user_role AS ENUM ('athlete', 'coach', 'admin');

-- Profiles table: Central source of user identity and gamification stats
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role DEFAULT 'athlete',
  bio TEXT,
  
  -- Gamification Stats
  current_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  last_training_date TIMESTAMP WITH TIME ZONE,
  
  -- Metrics
  total_sessions_completed INTEGER DEFAULT 0,
  total_points_earned INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- XP Log: Track every grain of progress
CREATE TABLE xp_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL, -- e.g., 'class_attendance', 'tournament_win'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Training Sessions: The source of truth for metrics
CREATE TABLE training_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER,
  intensity_level TEXT, -- 'low', 'medium', 'high'
  metadata JSONB, -- store extra info like sport_type
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Indexes for performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_xp_logs_profile ON xp_logs(profile_id);
CREATE INDEX idx_training_sessions_profile ON training_sessions(profile_id);
