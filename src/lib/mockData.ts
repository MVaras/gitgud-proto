import {
  Profile,
  TrainingSession,
  School,
  Class,
  Enrollment,
  Attendance,
} from '../types';
import type { StudentRecord } from '../features/coach/studentState';
import type { TournamentRecord } from '../features/tournaments/tournamentState';

// --- ATHLETE USER ---
export const MOCK_ATHLETE: Profile = {
  id: 'athlete-1',
  email: 'atleta@example.com',
  full_name: 'Matías Varas',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=matias',
  role: 'athlete',
  bio: 'Entusiasta del tenis y runner de fin de semana.',
  current_xp: 450,
  current_level: 5,
  streak_count: 12,
  last_training_date: '2026-10-12T10:00:00Z',
  total_sessions_completed: 42,
  total_points_earned: 1250,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-10-13T00:00:00Z',
};

// --- COACH USER ---
export const MOCK_COACH: Profile = {
  id: 'coach-1',
  email: 'coach@academy.com',
  full_name: 'Coach Rodrigo',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rodrigo',
  role: 'coach',
  bio: 'Entrenador profesional de tenis con 10 años de experiencia.',
  current_xp: 5000,
  current_level: 25,
  streak_count: 45,
  last_training_date: '2026-10-13T09:00:00Z',
  total_sessions_completed: 1200,
  total_points_earned: 50000,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2026-10-13T10:00:00Z',
};

// --- ADMIN USER ---
export const MOCK_ADMIN: Profile = {
  id: 'admin-1',
  email: 'admin@gitgud.com',
  full_name: 'System Admin',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  role: 'admin',
  bio: 'Administrador global del sistema.',
  current_xp: 0,
  current_level: 1,
  streak_count: 0,
  last_training_date: null,
  total_sessions_completed: 0,
  total_points_earned: 0,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-01T00:00:00Z',
};

// --- B2B ENTITIES ---

export const MOCK_SCHOOL: School = {
  id: 'school-1',
  owner_id: 'coach-1',
  name: 'Elite Tennis Academy',
  description: 'La mejor academia para perfeccionar tu técnica.',
  location_lat: -33.4489,
  location_lng: -70.6693,
  logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=ETA',
  is_verified: true,
  created_at: '2025-01-01T00:00:00Z',
};

export const MOCK_CLASSES: Class[] = [
  {
    id: 'class-1',
    school_id: 'school-1',
    coach_id: 'coach-1',
    title: 'Tenis Intensivo - Nivel Intermedio',
    sport_type: 'Tenis',
    description: 'Clases de alta intensidad para mejorar el drive y el revés.',
    capacity: 12,
    price: 15000,
    schedule_cron: '0 10 * * 2,4',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'class-2',
    school_id: 'school-1',
    coach_id: 'coach-1',
    title: 'Fundamentos para Niños',
    sport_type: 'Tenis',
    description: 'Iniciación al deporte con juegos y técnica básica.',
    capacity: 8,
    price: 10000,
    schedule_cron: '0 16 * * 6',
    created_at: '2026-01-01T00:00:00Z',
  },
];

export const MOCK_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-1',
    user_id: 'athlete-1',
    class_id: 'class-1',
    status: 'active',
    enrolled_at: '2026-09-01T10:00:00Z',
  },
];

export const MOCK_ATTENDANCE: Attendance[] = [
  {
    id: 'att-1',
    enrollment_id: 'enr-1',
    date: '2026-10-13',
    is_present: true,
    marked_by: 'coach-1',
    created_at: '2026-10-13T10:05:00Z',
  },
];

export const MOCK_STUDENTS: StudentRecord[] = [
  {
    id: 'athlete-1',
    fullName: 'Matías Varas',
    email: 'atleta@gitgud.demo',
    paymentStatus: 'paid',
    attendanceStatus: 'unmarked',
    attendanceCount: 11,
    lastAttendanceDate: '2026-10-12',
  },
  {
    id: 'athlete-2',
    fullName: 'María García',
    email: 'maria@example.com',
    paymentStatus: 'pending',
    attendanceStatus: 'unmarked',
    attendanceCount: 4,
    lastAttendanceDate: '2026-10-10',
  },
  {
    id: 'athlete-3',
    fullName: 'Juan Pérez',
    email: 'juan@example.com',
    paymentStatus: 'paid',
    attendanceStatus: 'unmarked',
    attendanceCount: 9,
    lastAttendanceDate: '2026-10-11',
  },
  {
    id: 'athlete-4',
    fullName: 'Ana López',
    email: 'ana@example.com',
    paymentStatus: 'pending',
    attendanceStatus: 'unmarked',
    attendanceCount: 2,
    lastAttendanceDate: '2026-10-04',
  },
];

export const MOCK_TOURNAMENTS: TournamentRecord[] = [
  {
    id: 'copa-verano-tenis',
    name: 'Copa Verano de Tenis',
    sport: 'Tenis',
    date: '2026-11-15',
    location: 'Complejo El Golf, Santiago',
    registrationDeadline: '2026-11-10',
    maxParticipants: 32,
    participantIds: ['athlete-2', 'athlete-3'],
  },
  {
    id: 'open-padel-macul',
    name: 'Open Pádel Macul',
    sport: 'Pádel',
    date: '2026-11-22',
    location: 'Macul, Santiago',
    registrationDeadline: '2026-11-17',
    maxParticipants: 16,
    participantIds: ['athlete-4'],
  },
];

// --- ATHLETE PROGRESSION DATA ---

export const MOCK_SESSIONS: TrainingSession[] = [
  {
    id: 's1',
    profile_id: 'athlete-1',
    session_date: '2026-10-12T10:00:00Z',
    duration_minutes: 60,
    intensity_level: 'high',
    metadata: { sport: 'Tenis' },
    created_at: '2026-10-12T11:00:00Z',
  },
  {
    id: 's2',
    profile_id: 'athlete-1',
    session_date: '2026-10-10T08:00:00Z',
    duration_minutes: 45,
    intensity_level: 'medium',
    metadata: { sport: 'Running' },
    created_at: '2026-10-10T09:00:00Z',
  },
];
