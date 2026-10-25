import ProductApp from './ProductApp';
import MobileApp from './MobileApp';
import { FormEvent, useState } from 'react';
import { LogOut, ShieldCheck, Trophy, Users } from 'lucide-react';
import { MetricsDashboard } from './features/metrics/MetricsDashboard';
import { StudentManagement } from './features/coach/StudentManagement';
import { TournamentList } from './features/tournaments/TournamentList';
import { authenticateDemo, DEMO_ACCOUNTS, type DemoAccount } from './features/auth/demoAuth';
import { MOCK_CLASSES, MOCK_SCHOOL, MOCK_SESSIONS, MOCK_STUDENTS, MOCK_TOURNAMENTS } from './lib/mockData';

type AthleteView = 'progress' | 'tournaments';
type CoachView = 'summary' | 'students' | 'tournaments';

function LegacyApp() {
  const [account, setAccount] = useState<DemoAccount | null>(null);
  const [athleteView, setAthleteView] = useState<AthleteView>('progress');
  const [coachView, setCoachView] = useState<CoachView>('summary');

  if (!account) {
    return <DemoLogin onAuthenticated={setAccount} />;
  }

  const signOut = () => {
    setAccount(null);
    setAthleteView('progress');
    setCoachView('summary');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black italic tracking-tight text-blue-600">GITGUD</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">{roleLabel(account.role)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">{account.profile.full_name}</span>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {account.role === 'athlete' && (
          <>
            <TabBar
              tabs={[
                ['progress', 'Mi progreso'],
                ['tournaments', 'Torneos'],
              ]}
              active={athleteView}
              onChange={(view) => setAthleteView(view as AthleteView)}
            />
            {athleteView === 'progress' ? (
              <MetricsDashboard profile={account.profile} sessions={MOCK_SESSIONS} />
            ) : (
              <TournamentList initialTournaments={MOCK_TOURNAMENTS} athleteId={account.profile.id} />
            )}
          </>
        )}

        {account.role === 'coach' && (
          <>
            <TabBar
              tabs={[
                ['summary', 'Resumen'],
                ['students', 'Alumnos'],
                ['tournaments', 'Torneos'],
              ]}
              active={coachView}
              onChange={(view) => setCoachView(view as CoachView)}
            />
            {coachView === 'summary' && <CoachSummary />}
            {coachView === 'students' && <StudentManagement initialStudents={MOCK_STUDENTS} />}
            {coachView === 'tournaments' && <TournamentList initialTournaments={MOCK_TOURNAMENTS} />}
          </>
        )}

        {account.role === 'admin' && <AdminOverview />}
      </main>
    </div>
  );
}

type DemoLoginProps = {
  onAuthenticated: (account: DemoAccount) => void;
};

function DemoLogin({ onAuthenticated }: DemoLoginProps) {
  const [email, setEmail] = useState(DEMO_ACCOUNTS[0].email);
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0].password);
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const authenticated = authenticateDemo(email, password);
    if (!authenticated) {
      setError('Credenciales no válidas. Usa una de las cuentas de prueba.');
      return;
    }
    setError('');
    onAuthenticated(authenticated);
  };

  const useAccount = (demoAccount: DemoAccount) => {
    setEmail(demoAccount.email);
    setPassword(demoAccount.password);
    setError('');
  };

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10">
      <section className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid md:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-8 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Gitgud V1</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">Deportistas, comunidades y escuelas en un mismo lugar.</h1>
          <p className="mt-4 text-blue-100">Ingresa con una cuenta de demostración para comparar la experiencia de atleta, entrenador y administrador.</p>
          <div className="mt-8 space-y-3">
            {DEMO_ACCOUNTS.map((demoAccount) => (
              <button
                key={demoAccount.role}
                type="button"
                onClick={() => useAccount(demoAccount)}
                className="block w-full rounded-xl border border-white/15 bg-white/10 p-3 text-left transition hover:bg-white/20"
              >
                <span className="block text-sm font-bold">{roleLabel(demoAccount.role)}</span>
                <span className="block text-xs text-blue-100">{demoAccount.email}</span>
              </button>
            ))}
          </div>
        </div>
        <form onSubmit={submit} className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">Acceder</h2>
          <p className="mt-1 text-sm text-slate-500">Las cuentas son locales y solo existen para la demo V1.</p>
          <label className="mt-6 block text-sm font-semibold text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </label>
          {error && <p role="alert" className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
          <button type="submit" className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">Entrar a Gitgud</button>
        </form>
      </section>
    </main>
  );
}

type TabBarProps = {
  tabs: [string, string][];
  active: string;
  onChange: (value: string) => void;
};

function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <nav aria-label="Navegación principal" className="mb-7 flex gap-1 overflow-x-auto rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
      {tabs.map(([value, label]) => (
        <button
          type="button"
          key={value}
          onClick={() => onChange(value)}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${active === value ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

function CoachSummary() {
  const monthlyRevenue = MOCK_STUDENTS.filter((student) => student.paymentStatus === 'paid').length * MOCK_CLASSES[0].price;
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">{MOCK_SCHOOL.name}</p>
        <h1 className="text-3xl font-bold text-slate-900">Panel del entrenador</h1>
        <p className="mt-1 text-slate-500">Gestión diaria de tus clases y alumnos.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <OverviewCard label="Alumnos activos" value={MOCK_STUDENTS.length} icon={<Users className="h-5 w-5" />} />
        <OverviewCard label="Clases activas" value={MOCK_CLASSES.length} icon={<Trophy className="h-5 w-5" />} />
        <OverviewCard label="Cuotas registradas" value={`$${monthlyRevenue.toLocaleString('es-CL')}`} icon={<ShieldCheck className="h-5 w-5" />} />
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-bold text-slate-900">Clases disponibles</h2>
        <div className="mt-4 divide-y divide-slate-100">
          {MOCK_CLASSES.map((classItem) => (
            <div key={classItem.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-800">{classItem.title}</p>
                <p className="text-sm text-slate-500">{classItem.sport_type} · hasta {classItem.capacity} participantes</p>
              </div>
              <p className="text-sm font-semibold text-slate-700">${classItem.price.toLocaleString('es-CL')} por alumno</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdminOverview() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Administración</p>
        <h1 className="text-3xl font-bold text-slate-900">Estado de la plataforma</h1>
        <p className="mt-1 text-slate-500">Vista operativa global de Gitgud V1.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <OverviewCard label="Escuelas" value="1" icon={<ShieldCheck className="h-5 w-5" />} />
        <OverviewCard label="Atletas demo" value={MOCK_STUDENTS.length} icon={<Users className="h-5 w-5" />} />
        <OverviewCard label="Torneos publicados" value={MOCK_TOURNAMENTS.length} icon={<Trophy className="h-5 w-5" />} />
      </div>
      <TournamentList initialTournaments={MOCK_TOURNAMENTS} />
    </section>
  );
}

function OverviewCard({ label, value, icon }: { label: string; value: string | number; icon: JSX.Element }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="inline-flex rounded-lg bg-blue-50 p-2 text-blue-600">{icon}</div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function roleLabel(role: DemoAccount['role']) {
  return { athlete: 'Atleta', coach: 'Entrenador', admin: 'Administrador' }[role];
}

export default ProductApp;
