import { MOCK_ADMIN, MOCK_ATHLETE, MOCK_COACH } from '../../lib/mockData';
import type { Profile, UserRole } from '../../types';

export type DemoAccount = {
  email: string;
  password: string;
  role: UserRole;
  profile: Profile;
};

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'atleta@gitgud.demo',
    password: 'Atleta2026!',
    role: 'athlete',
    profile: { ...MOCK_ATHLETE, email: 'atleta@gitgud.demo' },
  },
  {
    email: 'coach@gitgud.demo',
    password: 'Coach2026!',
    role: 'coach',
    profile: { ...MOCK_COACH, email: 'coach@gitgud.demo' },
  },
  {
    email: 'admin@gitgud.demo',
    password: 'Admin2026!',
    role: 'admin',
    profile: { ...MOCK_ADMIN, email: 'admin@gitgud.demo' },
  },
];

export function createLocalAccount({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}): DemoAccount {
  const normalizedEmail = email.trim().toLocaleLowerCase('es-CL');
  const id = `local-${normalizedEmail.replace(/[^a-z0-9]/g, '-')}`;
  const now = new Date().toISOString();

  return {
    email: normalizedEmail,
    password,
    role: 'athlete',
    profile: {
      ...MOCK_ATHLETE,
      id,
      email: normalizedEmail,
      full_name: fullName.trim(),
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(normalizedEmail)}`,
      current_xp: 0,
      current_level: 1,
      streak_count: 0,
      last_training_date: null,
      total_sessions_completed: 0,
      total_points_earned: 0,
      created_at: now,
      updated_at: now,
    },
  };
}

export function authenticateDemo(email: string, password: string): DemoAccount | null {
  const normalizedEmail = email.trim().toLocaleLowerCase('es-CL');
  return DEMO_ACCOUNTS.find(
    (account) => account.email.toLocaleLowerCase('es-CL') === normalizedEmail && account.password === password,
  ) ?? null;
}
