export type TournamentRecord = {
  id: string;
  name: string;
  sport: string;
  date: string;
  location: string;
  registrationDeadline: string;
  maxParticipants: number;
  participantIds: string[];
};

export type TournamentRegistrationResult = {
  ok: boolean;
  tournament: TournamentRecord;
  message: string;
};

export function registerForTournament(
  tournament: TournamentRecord,
  athleteId: string,
): TournamentRegistrationResult {
  if (tournament.participantIds.includes(athleteId)) {
    return { ok: false, tournament, message: 'El atleta ya está inscrito en este torneo.' };
  }

  if (tournament.participantIds.length >= tournament.maxParticipants) {
    return { ok: false, tournament, message: 'El torneo está sin cupos disponibles.' };
  }

  return {
    ok: true,
    tournament: {
      ...tournament,
      participantIds: [...tournament.participantIds, athleteId],
    },
    message: 'Inscripción confirmada.',
  };
}

export function filterTournaments(tournaments: TournamentRecord[], query: string): TournamentRecord[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('es-CL');
  if (!normalizedQuery) return tournaments;

  return tournaments.filter((tournament) =>
    [tournament.name, tournament.sport, tournament.location].some((value) =>
      value.toLocaleLowerCase('es-CL').includes(normalizedQuery),
    ),
  );
}
