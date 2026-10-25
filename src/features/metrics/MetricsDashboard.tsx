import React from 'react';
import { Profile, TrainingSession } from '../../types';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { StatCard } from '../../components/ui/StatCard';
import { 
  Zap, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  User, 
  Activity 
} from 'lucide-react';

interface MetricsDashboardProps {
  profile: Profile;
  sessions: TrainingSession[];
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ profile, sessions }) => {
  // Calculated logic for "Next Level"
  const xpPerLevel = 1000; 
  const currentLevelProgress = profile.current_xp % xpPerLevel;
  const nextLevelXP = profile.current_xp - currentLevelProgress + xpPerLevel;

  return (
    <div className="space-y-4">
      <header className="rounded-2xl bg-white px-4 py-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <img 
            src={profile.avatar_url || 'https://via.placeholder.com/150'} 
            alt={profile.full_name}
            className="w-16 h-16 rounded-full ring-4 ring-indigo-50"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{profile.full_name}</h1>
            <p className="text-sm text-slate-500">{profile.role.toUpperCase()}</p>
          </div>
        </div>

        <div className="mt-8">
          <ProgressBar 
            label={`Progreso del nivel ${profile.current_level}`}
            currentXP={currentLevelProgress}
            nextLevelXP={xpPerLevel}
          />
        </div>
      </header>

      <main className="space-y-4">
        {/* Quick Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <StatCard 
            label="Racha"
            value={`${profile.streak_count} días`} 
            icon={Zap}
            trend={{ type: 'up', value: '+2' }}
          />
          <StatCard 
            label="Sesiones"
            value={profile.total_sessions_completed} 
            icon={Calendar}
          />
          <StatCard 
            label="Puntos"
            value={profile.total_points_earned} 
            icon={Trophy}
          />
          <StatCard 
            label="Intensidad" 
            value="Alta" 
            icon={Activity}
          />
        </section>

        {/* Recent Activity Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Entrenamientos recientes</h2>
          </div>
          
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 capitalize">{session.metadata.sport || 'General'}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(session.session_date).toLocaleDateString()} • {session.duration_minutes} min
                    </p>
                  </div>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                  session.intensity_level === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {session.intensity_level?.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
