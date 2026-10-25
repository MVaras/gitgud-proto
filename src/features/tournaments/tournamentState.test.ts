import { describe, expect, it } from 'vitest';
import {
  filterTournaments,
  registerForTournament,
  type TournamentRecord,
} from './tournamentState';

const tournament: TournamentRecord = {
  id: 'summer-tennis',
  name: 'Copa Verano de Tenis',
  sport: 'Tenis',
  date: '2026-11-15',
  location: 'Santiago',
  registrationDeadline: '2026-11-10',
  maxParticipants: 4,
  participantIds: ['athlete-2', 'athlete-3'],
};

describe('tournament state', () => {
  it('registers an athlete while capacity remains', () => {
    const result = registerForTournament(tournament, 'athlete-1');

    expect(result.ok).toBe(true);
    expect(result.tournament.participantIds).toContain('athlete-1');
    expect(result.tournament.participantIds).toHaveLength(3);
  });

  it('does not duplicate a participant registration', () => {
    const result = registerForTournament(tournament, 'athlete-2');

    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/ya está inscrito/i);
  });

  it('does not register when the tournament is full', () => {
    const fullTournament = { ...tournament, participantIds: ['a', 'b', 'c', 'd'] };
    const result = registerForTournament(fullTournament, 'athlete-1');

    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/sin cupos/i);
  });

  it('filters by sport, name or location', () => {
    expect(filterTournaments([tournament], 'tenis')).toHaveLength(1);
    expect(filterTournaments([tournament], 'santiago')).toHaveLength(1);
    expect(filterTournaments([tournament], 'running')).toHaveLength(0);
  });
});
