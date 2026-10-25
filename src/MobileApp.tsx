import { FormEvent, useState, type ReactNode } from 'react';
import { Home, LogOut, ShieldCheck, Trophy, Users } from 'lucide-react';
import { getMobileNavigation, type MobileNavigationItem } from './appNavigation';
import { authenticateDemo, DEMO_ACCOUNTS, type DemoAccount } from './features/auth/demoAuth';
import { SchedulingView } from './features/scheduling/components/SchedulingView';
import { MobileStudentManagement } from './features/coach/MobileStudentManagement';
import { MetricsDashboard } from './features/metrics/MetricsDashboard';
import { TournamentList } from './features/tournaments/TournamentList';
import { MOCK_CLASSES, MOCK_SCHOOL, MOCK_SESSIONS, MOCK_STUDENTS, MOCK_TOURNAMENTS } from './lib/mockData';

type AthleteView = 'progress' | 'tournaments' | 'courts';
type CoachView = 'summary' | 'students' | 'tournaments';
type AdminView = 'overview' | 'tournaments';
type ActiveView = AthleteView | CoachView | AdminView;

export default function MobileApp() {
  const [account, setAccount] = useState<DemoAccount | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('progress');

  const signOut = () => {
    setAccount(null);
    setActiveView('progress');
  };

  const changeView = (view: string) => setActiveView(view as ActiveView);

  return (
    <div className="mobile-app-root">
      <div className="mobile-app-shell">
        {!account ? (
          <MobileLogin onAuthenticated={(demoAccount) => {
            setAccount(demoAccount);
            setActiveView(defaultViewFor(demoAccount));
          }} />
        ) : (
          <>
            <header className="mobile-topbar">
              <div>
                <p className="mobile-brand">GITGUD</p>
                <p className="mobile-topbar-subtitle">{roleLabel(account.role)}</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={account.profile.avatar_url ?? 'https://api.dicebear.com/7.x/initials/svg?seed=Gitgud'}
                  alt={account.profile.full_name}
                  className="h-9 w-9 rounded-full bg-slate-100 ring-2 ring-blue-50"
                />
                <button
                  type="button"
                  aria-label="Cerrar sesión"
                  onClick={signOut}
                  className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </header>

            <main className="mobile-scroll-content">
              <MobileContent account={account} activeView={activeView} />
            </main>

            <MobileBottomNavigation
              items={getMobileNavigation(account.role)}
              activeView={activeView}
              onChange={changeView}
            />
          </>
        )}
      </div>
    </div>
  );
}

type MobileLoginProps = {
  onAuthenticated: (account: DemoAccount) => void;
};

function MobileLogin({ onAuthenticated }: MobileLoginProps) {
  const [email, setEmail] = useState(DEMO_ACCOUNTS[0].email);
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0].password);
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const authenticated = authenticateDemo(email, password);
    if (!authenticated) {
      setError('Credenciales inválidas. Selecciona una cuenta demo.');
      return;
    }
    setError('');
    onAuthenticated(authenticated);
  };

  const prefill = (demoAccount: DemoAccount) => {
    setEmail(demoAccount.email);
    setPassword(demoAccount.password);
    setError('');
  };

  return (
    <main className="mobile-login-content">
      <div className="mobile-login-hero">
        <p className="mobile-brand">GITGUD</p>
        <h1>Tu deporte, en progreso.</h1>
        <p>Entra como atleta, entrenador o administrador para explorar cada experiencia.</p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <label className="mobile-field">
          <span>Email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="mobile-field">
          <span>Contraseña</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error && <p role="alert" className="mobile-login-error">{error}</p>}
        <button type="submit" className="mobile-primary-button">Entrar</button>
      </form>

      <section className="mt-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Cuentas de prueba</p>
        <div className="space-y-2">
          {DEMO_ACCOUNTS.map((demoAccount) => (
            <button key={demoAccount.role} type="button" onClick={() => prefill(demoAccount)} className="mobile-demo-account">
              <span className="font-semibold text-slate-800">{roleLabel(demoAccount.role)}</span>
              <span>{demoAccount.email}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

type MobileContentProps = {
  account: DemoAccount;
  activeView: ActiveView;
};

function MobileContent({ account, activeView }: MobileContentProps) {
  if (account.role === 'athlete') {
    if (activeView === 'tournaments') {
      return <TournamentList initialTournaments={MOCK_TOURNAMENTS} athleteId={account.profile.id} />;
    }
    if (activeView === 'courts') {
      return <SchedulingView userId={account.profile.id} />;
    }
    return <MetricsDashboard profile={account.profile} sessions={MOCK_SESSIONS} />;
  }

  if (account.role === 'coach') {
    if (activeView === 'students') return <MobileStudentManagement initialStudents={MOCK_STUDENTS} />;
    if (activeView === 'tournaments') return <TournamentList initialTournaments={MOCK_TOURNAMENTS} />;
    return <CoachSummary />;
  }

  return activeView === 'tournaments'
    ? <TournamentList initialTournaments={MOCK_TOURNAMENTS} />
    : <AdminOverview />;
}

type MobileBottomNavigationProps = {
  items: MobileNavigationItem[];
  activeView: ActiveView;
  onChange: (view: string) => void;
};

function MobileBottomNavigation({ items, activeView, onChange }: MobileBottomNavigationProps) {
  return (
    <nav aria-label="Navegación inferior" className="mobile-bottom-navigation">
      {items.map((item) => {
        const Icon = item.icon === 'home' ? Home : item.icon === 'users' ? Users : Trophy;
        const selected = item.id === activeView;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            aria-current={selected ? 'page' : undefined}
            className={`mobile-bottom-item ${selected ? 'mobile-bottom-item-active' : ''}`}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function CoachSummary() {
  const paidStudents = MOCK_STUDENTS.filter((student) => student.paymentStatus === 'paid').length;
  const monthlyRevenue = paidStudents * MOCK_CLASSES[0].price;

  return (
    <section className="mobile-page space-y-5">
      <div>
        <p className="mobile-eyebrow">{MOCK_SCHOOL.name}</p>
        <h1 className="mobile-page-title">Hoy en tu escuela</h1>
        <p className="mobile-page-subtitle">Todo lo esencial para organizar tus clases.</p>
      </div>
      <div className="mobile-stat-grid">
        <MiniStat label="Alumnos" value={MOCK_STUDENTS.length} icon={<Users className="h-4 w-4" />} />
        <MiniStat label="Clases" value={MOCK_CLASSES.length} icon={<Trophy className="h-4 w-4" />} />
        <MiniStat label="Cuotas" value={`$${monthlyRevenue.toLocaleString('es-CL')}`} icon={<ShieldCheck className="h-4 w-4" />} />
      </div>
      <section className="mobile-surface-card">
        <h2 className="text-base font-bold text-slate-900">Clases activas</h2>
        <div className="mt-2 divide-y divide-slate-100">
          {MOCK_CLASSES.map((classItem) => (
            <div key={classItem.id} className="py-3">
              <p className="font-semibold text-slate-800">{classItem.title}</p>
              <p className="mt-0.5 text-sm text-slate-500">{classItem.sport_type} · {classItem.capacity} cupos</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function AdminOverview() {
  return (
    <section className="mobile-page space-y-5">
      <div>
        <p className="mobile-eyebrow">Administración</p>
        <h1 className="mobile-page-title">Estado de Gitgud</h1>
        <p className="mobile-page-subtitle">Resumen operativo de la plataforma.</p>
      </div>
      <div className="mobile-stat-grid">
        <MiniStat label="Escuelas" value="1" icon={<ShieldCheck className="h-4 w-4" />} />
        <MiniStat label="Atletas" value={MOCK_STUDENTS.length} icon={<Users className="h-4 w-4" />} />
        <MiniStat label="Torneos" value={MOCK_TOURNAMENTS.length} icon={<Trophy className="h-4 w-4" />} />
      </div>
    </section>
  );
}

function MiniStat({ label, value, icon }: { label: string; value: string | number; icon: ReactNode }) {
  return (
    <article className="mobile-mini-stat">
      <div className="mobile-mini-stat-icon">{icon}</div>
      <p>{value}</p>
      <span>{label}</span>
    </article>
  );
}

function defaultViewFor(account: DemoAccount): ActiveView {
  return account.role === 'athlete' ? 'progress' : account.role === 'coach' ? 'summary' : 'overview';
}

function roleLabel(role: DemoAccount['role']) {
  return { athlete: 'Atleta', coach: 'Entrenador', admin: 'Administrador' }[role];
}
