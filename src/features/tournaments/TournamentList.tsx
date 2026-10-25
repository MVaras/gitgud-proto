import { useMemo, useState } from 'react';
import { CalendarDays, MapPin, Search, Trophy, Users } from 'lucide-react';
import type { TournamentRecord } from './tournamentState';
import { filterTournaments, registerForTournament } from './tournamentState';

type TournamentListProps = {
  initialTournaments: TournamentRecord[];
  athleteId?: string;
};

export function TournamentList({ initialTournaments, athleteId }: TournamentListProps) {
  const [tournaments, setTournaments] = useState(initialTournaments);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');

  const visibleTournaments = useMemo(
    () => filterTournaments(tournaments, query),
    [query, tournaments],
  );

  const register = (tournamentId: string) => {
    if (!athleteId) return;
    const selectedTournament = tournaments.find((tournament) => tournament.id === tournamentId);
    if (!selectedTournament) return;

    const result = registerForTournament(selectedTournament, athleteId);
    setNotice(result.message);
    if (result.ok) {
      setTournaments((current) =>
        current.map((tournament) => (tournament.id === tournamentId ? result.tournament : tournament)),
      );
    }
  };

  return (
    <section className="mobile-page space-y-4">
      <header className="space-y-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Competencia</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Torneos</h1>
          <p className="mt-1 text-slate-500">Descubre competencias cercanas e inscríbete en pocos pasos.</p>
        </div>
        <label className="relative block w-full">
          <span className="sr-only">Buscar torneos</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busca por deporte o comuna"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </header>

      {notice && (
        <div role="status" className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
          {notice}
        </div>
      )}

      <div className="grid gap-3">
        {visibleTournaments.map((tournament) => {
          const seatsLeft = tournament.maxParticipants - tournament.participantIds.length;
          const isRegistered = athleteId ? tournament.participantIds.includes(athleteId) : false;
          const isFull = seatsLeft === 0;

          return (
            <article key={tournament.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Trophy className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{tournament.sport}</span>
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">{tournament.name}</h2>
              <dl className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-slate-400" /><dd>{formatDate(tournament.date)}</dd></div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" /><dd>{tournament.location}</dd></div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-slate-400" /><dd>{tournament.participantIds.length} inscritos · {seatsLeft} cupos disponibles</dd></div>
              </dl>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500">Cierre: {formatDate(tournament.registrationDeadline)}</p>
                {athleteId && (
                  <button
                    type="button"
                    onClick={() => register(tournament.id)}
                    disabled={isRegistered || isFull}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {isRegistered ? 'Inscrito' : isFull ? 'Sin cupos' : 'Inscribirme'}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {visibleTournaments.length === 0 && (
        <p className="rounded-2xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-200">
          No encontramos torneos con ese criterio.
        </p>
      )}
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${date}T12:00:00`),
  );
}
