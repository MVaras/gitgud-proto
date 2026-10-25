-- PHASE 2: B2B CORE
-- Setup Schools and Coaching structure

-- 1. Schools Table
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  description TEXT,
  location_lat DECIMAL,
  location_lng DECIMAL,
  logo_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Classes Table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  coach_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  sport_type TEXT NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  schedule_cron TEXT, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Enrollments (Linking Athlete to Class)
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  class_id UUID REFERENCES classes(id),
  status TEXT DEFAULT 'active', -- 'active', 'waitlist', 'completed'
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Attendance (Tracking student presence)
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id),
  date DATE NOT NULL,
  is_present BOOLEAN DEFAULT false,
  marked_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Indexes for B2B Queries
CREATE INDEX idx_classes_coach ON classes(coach_id);
CREATE INDEX idx_classes_school ON classes(school_id);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_class ON enrollments(class_id);
CREATE INDEX idx_attendance_enrollment ON attendance(enrollment_id);
