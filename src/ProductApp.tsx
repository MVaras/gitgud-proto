import { FormEvent, useMemo, useState, type ReactNode } from 'react';
import {
  Bell, CalendarDays, ChevronRight, Dumbbell, Grid2X2, Home, LogOut, MapPin, MessageCircle,
  Search, ShoppingBag, Sparkles, Trophy, UserRound, Users,
} from 'lucide-react';
import { createLocalAccount, authenticateDemo, DEMO_ACCOUNTS, type DemoAccount } from './features/auth/demoAuth';
import { StudentManagement } from './features/coach/StudentManagement';
import { MobileStudentManagement } from './features/coach/MobileStudentManagement';
import { MetricsDashboard } from './features/metrics/MetricsDashboard';
import { SchedulingView } from './features/scheduling/components/SchedulingView';
import { RivalsFeature } from './features/rivals/RivalsFeature';
import { MarketplaceFeature } from './features/marketplace/MarketplaceFeature';
import { ClassesFeature } from './features/classes/ClassesFeature';
import { TournamentList } from './features/tournaments/TournamentList';
import { MOCK_CLASSES, MOCK_SCHOOL, MOCK_SESSIONS, MOCK_STUDENTS, MOCK_TOURNAMENTS } from './lib/mockData';
import { getDesktopNavigation, getMobileNavigation, type ProductNavigationItem, type ProductView } from './productNavigation';

const athleteStats = [
  { label: 'Racha', value: '12 días' },
  { label: 'Sesiones', value: '42' },
  { label: 'Partidos', value: '8' },
  { label: 'Nivel', value: '5' },
];

type AuthMode = 'login' | 'register' | 'recover';

export default function ProductApp() {
  const [account, setAccount] = useState<DemoAccount | null>(null);
  const [activeView, setActiveView] = useState<ProductView>('home');

  if (!account) {
    return <ProductLogin onAuthenticated={(nextAccount) => {
      setAccount(nextAccount);
      setActiveView('home');
    }} />;
  }

  const navigate = (view: ProductView) => setActiveView(view);

  return (
    <div className="product-app-root">
      <div className="product-app-shell">
        <aside className="product-sidebar">
          <div className="product-sidebar-brand"><span>GITGUD</span><small>{roleLabel(account.role)}</small></div>
          <ProductNavigation
            items={getDesktopNavigation(account.role)}
            activeView={activeView}
            onNavigate={navigate}
            variant="sidebar"
          />
          <button type="button" onClick={() => setAccount(null)} className="product-signout">
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </aside>

        <div className="product-workspace">
          <header className="product-header">
            <div className="product-mobile-brand"><span>GITGUD</span><small>{roleLabel(account.role)}</small></div>
            <div className="product-header-actions">
              <button type="button" onClick={() => navigate('messages')} aria-label="Mensajes" className="product-icon-button">
                <MessageCircle className="h-5 w-5" /><span className="product-notification-dot">2</span>
              </button>
              <button type="button" onClick={() => navigate('notifications')} aria-label="Notificaciones" className="product-icon-button">
                <Bell className="h-5 w-5" /><span className="product-notification-dot">3</span>
              </button>
              <button type="button" onClick={() => navigate('profile')} aria-label="Perfil" className="product-avatar-button">
                <img src={account.profile.avatar_url ?? fallbackAvatar(account.profile.full_name)} alt="" />
              </button>
              <button type="button" onClick={() => setAccount(null)} aria-label="Cerrar sesión" className="product-mobile-logout"><LogOut className="h-5 w-5" /></button>
            </div>
          </header>

          <main className="product-content">
            <ProductContent account={account} activeView={activeView} onNavigate={navigate} />
          </main>

          <ProductNavigation
            items={getMobileNavigation(account.role)}
            activeView={activeView}
            onNavigate={navigate}
            variant="bottom"
          />
        </div>
      </div>
    </div>
  );
}

type ProductLoginProps = { onAuthenticated: (account: DemoAccount) => void };

function ProductLogin({ onAuthenticated }: ProductLoginProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState(DEMO_ACCOUNTS[0].email);
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0].password);
  const [fullName, setFullName] = useState('');
  const [notice, setNotice] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === 'recover') {
      setNotice(`En una integración productiva enviaríamos instrucciones a ${email}. En esta demo no se envían correos.`);
      return;
    }
    if (mode === 'register') {
      const account = createLocalAccount({ fullName, email, password });
      onAuthenticated(account);
      return;
    }
    const account = authenticateDemo(email, password);
    if (!account) {
      setNotice('Email o contraseña incorrectos. Puedes seleccionar una cuenta de prueba.');
      return;
    }
    onAuthenticated(account);
  };

  const selectDemo = (account: DemoAccount) => {
    setEmail(account.email);
    setPassword(account.password);
    setMode('login');
    setNotice('');
  };

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setNotice('');
  };

  const copy = {
    login: { title: 'Ingresa a Gitgud', button: 'Iniciar sesión' },
    register: { title: 'Crea tu cuenta', button: 'Crear cuenta' },
    recover: { title: 'Recupera tu acceso', button: 'Enviar instrucciones' },
  }[mode];

  return (
    <div className="auth-page-root">
      <div className="auth-page-shell">
        <section className="auth-intro-panel">
          <p className="auth-logo">GITGUD</p>
          <div>
            <h1>Tu próxima cancha, clase o rival está aquí.</h1>
            <p>Reserva, entrena, compite y encuentra comunidad en una sola plataforma deportiva.</p>
          </div>
          <div className="auth-graphic" aria-hidden="true"><Dumbbell /><span>+</span><Trophy /></div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-mode-tabs" role="tablist" aria-label="Acceso">
            <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => changeMode('login')}>Entrar</button>
            <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => changeMode('register')}>Crear cuenta</button>
          </div>
          <h2>{copy.title}</h2>
          <form onSubmit={submit} className="auth-form-fields">
            {mode === 'register' && (
              <label>Nombre completo<input required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Tu nombre" /></label>
            )}
            <label>Email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nombre@email.com" /></label>
            {mode !== 'recover' && (
              <label>Contraseña<input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} /></label>
            )}
            {notice && <p role="status" className="auth-notice">{notice}</p>}
            <button type="submit" className="auth-submit">{copy.button}</button>
          </form>
          {mode === 'login' && <button type="button" onClick={() => changeMode('recover')} className="auth-link">¿Olvidaste tu contraseña?</button>}
          {mode === 'recover' && <button type="button" onClick={() => changeMode('login')} className="auth-link">Volver a iniciar sesión</button>}

          <div className="demo-selector">
            <p>Probar como</p>
            <div>{DEMO_ACCOUNTS.map((account) => (
              <button key={account.role} type="button" onClick={() => selectDemo(account)}>{roleLabel(account.role)}</button>
            ))}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

type ProductContentProps = {
  account: DemoAccount;
  activeView: ProductView;
  onNavigate: (view: ProductView) => void;
};

function ProductContent({ account, activeView, onNavigate }: ProductContentProps) {
  if (activeView === 'home') {
    return account.role === 'athlete'
      ? <AthleteHome account={account} onNavigate={onNavigate} />
      : <ProfessionalHome account={account} onNavigate={onNavigate} />;
  }

  if (activeView === 'tournaments') return <TournamentList initialTournaments={MOCK_TOURNAMENTS} athleteId={account.role === 'athlete' ? account.profile.id : undefined} />;
  if (activeView === 'students' && account.role === 'coach') return <StudentsResponsive />;
  if (activeView === 'explore') return <ExploreView onNavigate={onNavigate} />;
  if (activeView === 'messages') return <InboxView />;
  if (activeView === 'notifications') return <NotificationsView />;
  if (activeView === 'profile') return <ProfileView account={account} />;
  if (activeView === 'courts') return <CourtsView userId={account.profile.id} />;
  if (activeView === 'classes') return <ClassesFeature />;
  if (activeView === 'rivals') return <RivalsFeature />;
  if (activeView === 'marketplace') return <MarketplaceFeature />;

  return <ExploreView onNavigate={onNavigate} />;
}

type AthleteHomeProps = { account: DemoAccount; onNavigate: (view: ProductView) => void };

function AthleteHome({ account, onNavigate }: AthleteHomeProps) {
  const actions: { label: string; caption: string; view: ProductView; icon: ReactNode }[] = [
    { label: 'Reservar cancha', caption: 'Horarios cerca de ti', view: 'courts', icon: <CalendarDays /> },
    { label: 'Buscar rival', caption: 'Juega esta semana', view: 'rivals', icon: <Users /> },
    { label: 'Entrenar', caption: 'Clases y coaches', view: 'classes', icon: <Dumbbell /> },
    { label: 'Torneos', caption: 'Compite y sube', view: 'tournaments', icon: <Trophy /> },
    { label: 'Marketplace', caption: 'Equipo deportivo', view: 'marketplace', icon: <ShoppingBag /> },
  ];

  return (
    <section className="product-page athlete-home space-y-7">
      <header className="product-welcome">
        <p className="product-eyebrow">Martes · Santiago</p>
        <h1>Hola, {account.profile.full_name.split(' ')[0]}</h1>
        <p>¿Qué quieres hacer hoy?</p>
      </header>

      <section>
        <div className="product-section-heading"><h2>Acciones rápidas</h2></div>
        <div className="quick-actions-grid">
          {actions.map((action) => (
            <button type="button" key={action.view} onClick={() => onNavigate(action.view)} className="quick-action-card">
              <span className="quick-action-icon">{action.icon}</span>
              <span><strong>{action.label}</strong><small>{action.caption}</small></span>
              <ChevronRight className="quick-action-arrow" />
            </button>
          ))}
        </div>
      </section>

      <section className="upcoming-activity-card">
        <div className="upcoming-activity-top"><span className="upcoming-dot" /> Próximo</div>
        <div className="upcoming-activity-content">
          <div className="upcoming-icon"><CalendarDays /></div>
          <div><h2>Cancha reservada</h2><p>Martes 19:00 · Club Deportivo UC</p><p className="upcoming-meta"><MapPin /> San Carlos de Apoquindo</p></div>
          <button type="button" onClick={() => onNavigate('courts')} className="upcoming-link">Ver</button>
        </div>
      </section>

      <section>
        <div className="product-section-heading"><h2>Tu actividad</h2><button type="button" onClick={() => onNavigate('profile')}>Ver perfil</button></div>
        <div className="compact-stats-row">
          {athleteStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </div>
      </section>

      <section className="discover-strip">
        <div><Sparkles /><span><strong>Más para explorar</strong><small>Clases, rivales, torneos y equipamiento deportivo.</small></span></div>
        <button type="button" onClick={() => onNavigate('explore')}>Explorar</button>
      </section>
    </section>
  );
}

function ProfessionalHome({ account, onNavigate }: { account: DemoAccount; onNavigate: (view: ProductView) => void }) {
  const isCoach = account.role === 'coach';
  return (
    <section className="product-page space-y-6">
      <header className="product-welcome"><p className="product-eyebrow">{isCoach ? MOCK_SCHOOL.name : 'Administración Gitgud'}</p><h1>Hola, {account.profile.full_name.split(' ')[0]}</h1><p>{isCoach ? 'Gestiona tus alumnos y tus próximas clases.' : 'Supervisa la actividad general de la plataforma.'}</p></header>
      <div className="professional-stats">
        <InfoCard label={isCoach ? 'Alumnos activos' : 'Atletas activos'} value={isCoach ? MOCK_STUDENTS.length : MOCK_STUDENTS.length + 38} icon={<Users />} />
        <InfoCard label={isCoach ? 'Clases activas' : 'Escuelas activas'} value={isCoach ? MOCK_CLASSES.length : 6} icon={<Dumbbell />} />
        <InfoCard label="Torneos publicados" value={MOCK_TOURNAMENTS.length} icon={<Trophy />} />
      </div>
      <div className="professional-actions">
        {isCoach && <button type="button" onClick={() => onNavigate('students')}><Users /> Gestionar alumnos <ChevronRight /></button>}
        <button type="button" onClick={() => onNavigate('classes')}><Dumbbell /> Ver clases <ChevronRight /></button>
        <button type="button" onClick={() => onNavigate('tournaments')}><Trophy /> Ver torneos <ChevronRight /></button>
      </div>
    </section>
  );
}

function CourtsView({ userId }: { userId: string }) {
  return <SchedulingView userId={userId} />;
}

function ExploreView({ onNavigate }: { onNavigate: (view: ProductView) => void }) {
  const items: { title: string; description: string; view: ProductView; icon: ReactNode }[] = [
    { title: 'Entrenamiento', description: 'Clases, escuelas y coaches.', view: 'classes', icon: <Dumbbell /> },
    { title: 'Buscar rival', description: 'Partidos por nivel y zona.', view: 'rivals', icon: <Users /> },
    { title: 'Torneos', description: 'Compite y revisa inscripciones.', view: 'tournaments', icon: <Trophy /> },
    { title: 'Marketplace', description: 'Compra y vende equipamiento.', view: 'marketplace', icon: <ShoppingBag /> },
  ];
  return <section className="product-page"><header className="product-welcome"><p className="product-eyebrow">Explorar</p><h1>Todo Gitgud</h1><p>Accede a las experiencias deportivas de la plataforma.</p></header><div className="explore-grid">{items.map((item) => <button type="button" key={item.view} onClick={() => onNavigate(item.view)}><span>{item.icon}</span><strong>{item.title}</strong><small>{item.description}</small><ChevronRight /></button>)}</div></section>;
}

function ConceptView({ icon, title, description, status, inline = false }: { icon: ReactNode; title: string; description: string; status: string; inline?: boolean }) {
  return <section className={`concept-view ${inline ? 'concept-inline' : 'product-page'}`}><div className="concept-icon">{icon}</div><div><p className="product-eyebrow">En construcción</p><h1>{title}</h1><p>{description}</p><div className="concept-status">{status}</div></div></section>;
}

function MarketplaceView() {
  return <section className="product-page space-y-5"><header className="product-welcome"><p className="product-eyebrow">Marketplace</p><h1>Equipamiento deportivo</h1><p>Compra y vende entre personas de la comunidad.</p></header><div className="marketplace-listings"><MarketplaceCard name="Raqueta Babolat Pure Drive" price="$95.000" tag="Tenis" /><MarketplaceCard name="Zapatillas Nike Court" price="$42.000" tag="Talla 42" /></div><ConceptView inline icon={<ShoppingBag />} title="Publica tu equipo" description="Crea avisos con fotos, estado y ubicación para conectar con deportistas interesados." status="La publicación y mensajería de avisos se habilitarán en este flujo." /></section>;
}

function MarketplaceCard({ name, price, tag }: { name: string; price: string; tag: string }) {
  return <article className="marketplace-card"><div className="marketplace-image"><ShoppingBag /></div><div><span>{tag}</span><h2>{name}</h2><strong>{price}</strong></div></article>;
}

function InboxView() {
  return <section className="product-page"><header className="product-welcome"><p className="product-eyebrow">Conversaciones</p><h1>Mensajes</h1><p>Coordina reservas, partidos y actividades.</p></header><div className="inbox-list"><InboxItem initials="CR" name="Club Recreo" message="Tu reserva está confirmada para hoy." time="10:32" unread /><InboxItem initials="MG" name="María García" message="¿Jugamos el jueves a las 19:00?" time="Ayer" /><InboxItem initials="ETA" name="Elite Tennis Academy" message="Nueva clase disponible para ti." time="Lun" /></div></section>;
}

function InboxItem({ initials, name, message, time, unread = false }: { initials: string; name: string; message: string; time: string; unread?: boolean }) {
  return <article className="inbox-item"><span>{initials}</span><div><h2>{name}</h2><p>{message}</p></div><time>{time}</time>{unread && <i />}</article>;
}

function NotificationsView() {
  return <section className="product-page"><header className="product-welcome"><p className="product-eyebrow">Actualizaciones</p><h1>Notificaciones</h1><p>Mantente al día con tu actividad deportiva.</p></header><div className="notification-list"><NotificationItem title="Reserva confirmada" text="Cancha 3 reservada hoy a las 19:00." /><NotificationItem title="Nuevo torneo disponible" text="Copa Verano de Tenis abrió sus inscripciones." /><NotificationItem title="Racha en curso" text="Entrena hoy para mantener tus 12 días de racha." /></div></section>;
}

function NotificationItem({ title, text }: { title: string; text: string }) { return <article className="notification-item"><Bell /><div><h2>{title}</h2><p>{text}</p></div></article>; }

function ProfileView({ account }: { account: DemoAccount }) {
  const profile = account.profile;
  return <section className="product-page space-y-5"><header className="profile-hero"><img src={profile.avatar_url ?? fallbackAvatar(profile.full_name)} alt="" /><div><p className="product-eyebrow">{roleLabel(profile.role)}</p><h1>{profile.full_name}</h1><p>{profile.bio || 'Deportista de la comunidad Gitgud.'}</p></div></header><div className="compact-stats-row">{athleteStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></section>;
}

function StudentsResponsive() {
  return <><div className="student-mobile-view"><MobileStudentManagement initialStudents={MOCK_STUDENTS} /></div><div className="student-desktop-view"><StudentManagement initialStudents={MOCK_STUDENTS} /></div></>;
}

function InfoCard({ label, value, icon }: { label: string; value: string | number; icon: ReactNode }) { return <article className="info-card"><span>{icon}</span><strong>{value}</strong><small>{label}</small></article>; }

type ProductNavigationProps = { items: ProductNavigationItem[]; activeView: ProductView; onNavigate: (view: ProductView) => void; variant: 'sidebar' | 'bottom' };
function ProductNavigation({ items, activeView, onNavigate, variant }: ProductNavigationProps) {
  return <nav aria-label={variant === 'sidebar' ? 'Navegación principal' : 'Navegación inferior'} className={variant === 'sidebar' ? 'product-sidebar-nav' : 'product-mobile-nav'}>{items.map((item) => { const Icon = iconFor(item.icon); const selected = activeView === item.id || (activeView === 'notifications' && item.id === 'notifications'); return <button type="button" key={item.id} onClick={() => onNavigate(item.id)} className={selected ? 'active' : ''}><Icon /><span>{item.label}</span></button>; })}</nav>;
}

function iconFor(icon: ProductNavigationItem['icon']) {
  return ({ home: Home, calendar: CalendarDays, dumbbell: Dumbbell, users: Users, trophy: Trophy, store: ShoppingBag, message: MessageCircle, bell: Bell, profile: UserRound, grid: Grid2X2 } as const)[icon];
}

function fallbackAvatar(seed: string) { return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}`; }
function roleLabel(role: DemoAccount['role']) { return { athlete: 'Atleta', coach: 'Entrenador', admin: 'Administrador' }[role]; }
