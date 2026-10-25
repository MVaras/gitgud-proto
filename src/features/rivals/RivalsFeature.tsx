import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Search, ChevronRight, MapPin, Dumbbell, Trophy, Users } from 'lucide-react';
import { MOCK_STUDENTS } from '../../lib/mockData';

interface OpponentRecord {
  id: string;
  fullName: string;
  avatar_url: string | null;
  sport: string;
  level: number;
  xp: number;
  contactEmail: string;
  bio: string | null;
}

const OFFERED_OPPONENTS: OpponentRecord[] = [
  { id: 'athlete-2', fullName: 'María García', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria', sport: 'Tenis', level: 4, xp: 600, contactEmail: 'maria@example.com', bio: 'Jugadora juvenil del club, Dispuesta a jugar partidos.' },
  { id: 'athlete-3', fullName: 'Juan Pérez', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan', sport: 'Tenis', level: 5, xp: 900, contactEmail: 'juan@example.com', bio: 'Entrenado en pistas de hierro, se destaca en rallies intermedios.' },
  { id: 'athlete-4', fullName: 'Ana López', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana', sport: 'Running', level: 6, xp: 1200, contactEmail: 'ana@example.com', bio: 'Corredor competitivo, busca pareja para carreras por equipos.' },
];

export const RivalsFeature: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);

  const filtered = OFFERED_OPPONENTS.filter((opponent) => {
    const matchesSearch = opponent.fullName.toLowerCase().includes(search.toLowerCase()) || opponent.sport.toLowerCase().includes(search.toLowerCase());
    const matchesSport = !sportFilter || opponent.sport === sportFilter;
    const matchesLevel = !levelFilter || opponent.level === Number(levelFilter);
    return matchesSearch && matchesSport && matchesLevel;
  });

  return (
    <section className="product-page space-y-5">
      <header className="product-welcome">
        <p className="product-eyebrow">Buscar rival</p>
        <h1 className="mobile-page-title">Compite con amigos del mismo nivel</h1>
        <p className="mobile-page-subtitle">Encuentra oponentes para partidos, pruebas y mejoras.</p>
      </header>

      {/* Filters */}
      <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search className="h-4 w-4" /></span>
            <Input
              label="Buscar..."
              placeholder="Nombre o deporte"
              className="pl-9"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <select value={sportFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSportFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium bg-white outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todos los deportes</option>
            <option value="Tenis">Tenis</option>
            <option value="Running">Correr</option>
            <option value="Padel">Pádel</option>
          </select>
          <select value={levelFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLevelFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium bg-white outline-none focus:ring-2 focus:ring-blue-100">
            <option value="">Todos los niveles</option>
            <option value="3">Nivel Intermedio</option>
            <option value="5">Nivel Avanzado</option>
            <option value="7">Nivel Competitivo</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-8 text-slate-400">No se encontraron rivales para esta búsqueda.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((opponent) => (
            <button
              key={opponent.id}
              type="button"
              onClick={() => setSelectedOpponent(opponent.id)}
              className="w-full text-left rounded-xl border border-slate-100 bg-white p-4 hover:border-blue-300 hover:bg-blue-50 transition"
            >
              <div className="flex items-start gap-3">
                <img src={opponent.avatar_url ?? 'https://api.dicebear.com/7.x/initials/svg?seed=Gitgud'} alt="" className="h-11 w-11 rounded-full bg-slate-100 ring-2 ring-blue-50 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 truncate">{opponent.fullName}</h3>
                    <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">Niv. {opponent.level}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1"><Dumbbell className="h-4 w-4" /></span>
                    <span>{opponent.sport}</span>
                    {opponent.xp > 0 && <span className="ml-auto font-semibold text-blue-600">+{opponent.xp} XP</span>}
                  </div>
                  {opponent.bio && <p className="mt-1.5 line-clamp-2 text-xs text-slate-500">{opponent.bio}</p>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Contact modal */}
      {selectedOpponent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOpponent(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <img src={OFFERED_OPPONENTS.find(o => o.id === selectedOpponent)!.avatar_url ?? 'https://api.dicebear.com/7.x/initials/svg?seed=Gitgud'} alt="" className="h-14 w-14 rounded-full bg-slate-100 ring-2 ring-blue-50" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">{OFFERED_OPPONENTS.find(o => o.id === selectedOpponent)!.fullName}</h3>
                <p className="text-sm text-slate-500">{OFFERED_OPPONENTS.find(o => o.id === selectedOpponent)!.sport} · Nivel {OFFERED_OPPONENTS.find(o => o.id === selectedOpponent)!.level}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Escríbeme para coordinar un partido. Envíame al correo: {OFFERED_OPPONENTS.find(o => o.id === selectedOpponent)!.contactEmail}</p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setSelectedOpponent(null)}>Cerrar</Button>
              <Button variant="primary" onClick={async () => { await new Promise(r => setTimeout(r, 600)); setSelectedOpponent(null); }}>Enviar mensaje</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
