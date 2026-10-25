import { describe, expect, it } from 'vitest';
import { authenticateDemo, createLocalAccount, DEMO_ACCOUNTS } from './demoAuth';

describe('demo authentication', () => {
  it('returns the athlete profile for the athlete credentials', () => {
    const athlete = DEMO_ACCOUNTS.find((account) => account.role === 'athlete');
    if (!athlete) throw new Error('athlete fixture required');

    expect(authenticateDemo(athlete.email, athlete.password)).toMatchObject({
      role: 'athlete',
      email: athlete.email,
    });
  });

  it('creates an athlete account for the local demo session', () => {
    const account = createLocalAccount({
      fullName: 'Camila Torres',
      email: 'camila@example.com',
      password: 'secreto-demo',
    });

    expect(account).toMatchObject({
      email: 'camila@example.com',
      role: 'athlete',
      profile: { full_name: 'Camila Torres', role: 'athlete' },
    });
  });

  it('rejects an invalid password', () => {
    const athlete = DEMO_ACCOUNTS.find((account) => account.role === 'athlete');
    if (!athlete) throw new Error('athlete fixture required');

    expect(authenticateDemo(athlete.email, 'invalid-password')).toBeNull();
  });
});
