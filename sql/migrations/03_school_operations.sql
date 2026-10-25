-- PHASE 2: OPERATIONS
-- Manual fee control and attendance integrity for school administrators.

CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'waived');

CREATE TABLE manual_payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  amount INTEGER NOT NULL CHECK (amount >= 0),
  status payment_status NOT NULL DEFAULT 'pending',
  recorded_by UUID REFERENCES profiles(id),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  notes TEXT,
  CONSTRAINT manual_payment_records_unique_period UNIQUE (enrollment_id, period_start)
);

-- One attendance record per enrolled student and calendar day.
ALTER TABLE attendance
  ADD CONSTRAINT attendance_one_record_per_day UNIQUE (enrollment_id, date);

CREATE INDEX idx_manual_payment_records_enrollment
  ON manual_payment_records(enrollment_id);

CREATE INDEX idx_manual_payment_records_status
  ON manual_payment_records(status);
