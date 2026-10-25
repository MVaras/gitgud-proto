-- PHASE 3: TOURNAMENTS
-- Public tournament board and athlete registrations.

CREATE TYPE tournament_status AS ENUM ('draft', 'published', 'closed', 'completed', 'cancelled');
CREATE TYPE tournament_registration_status AS ENUM ('confirmed', 'waitlist', 'cancelled');

CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID NOT NULL REFERENCES profiles(id),
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  sport_type TEXT NOT NULL,
  description TEXT,
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  location_name TEXT NOT NULL,
  location_lat DECIMAL,
  location_lng DECIMAL,
  max_participants INTEGER NOT NULL CHECK (max_participants > 1),
  status tournament_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  CONSTRAINT tournaments_deadline_before_start CHECK (registration_deadline < starts_at)
);

CREATE TABLE tournament_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  athlete_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status tournament_registration_status NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  CONSTRAINT tournament_registrations_unique_athlete UNIQUE (tournament_id, athlete_id)
);

CREATE INDEX idx_tournaments_public_board
  ON tournaments(status, sport_type, starts_at);

CREATE INDEX idx_tournament_registrations_tournament
  ON tournament_registrations(tournament_id, status);
