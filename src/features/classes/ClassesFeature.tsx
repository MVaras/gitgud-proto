import React from 'react';
import { Dumbbell, CalendarDays, Users } from 'lucide-react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '../../lib/mockData';

export const ClassesFeature: React.FC = () => {
  return (
    <section className="product-page space-y-5">
      <header className="product-welcome">
        <p className="product-eyebrow">Entrenamiento y clases</p>
        <h1>Clases disponibles</h1>
        <p className="text-sm text-slate-500">Encuentra entrenadores, escuelas y sesiones grupales.</p>
      </header>

      <div className="space-y-3">
        {MOCK_CLASSES.map((cls) => (
          <article key={cls.id} className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-slate-900 truncate">{cls.title}</h2>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{cls.sport_type}</p>
                <p className="text-sm text-slate-600 mt-1">{cls.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Hasta {cls.capacity}</span>
                  <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {cls.schedule_cron ?? 'Horario flexible'}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <strong className="text-lg font-extrabold text-blue-600">${cls.price.toLocaleString('es-CL')}</strong>
                <p className="text-xs text-slate-400">por alumno</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
