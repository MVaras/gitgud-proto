import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';
import { MOCK_COACH, MOCK_SCHOOL, MOCK_CLASSES, MOCK_ENROLLMENTS, MOCK_ATTENDANCE } from '@/lib/mockData';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  MoreVertical, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const CoachDashboard: React.FC = () => {
  // For simplicity in this prototype, we assume the coach is logged in and viewing their school.
  const coach = MOCK_COACH;
  const school = MOCK_SCHOOL;
  const classes = MOCK_CLASSES;
  const enrollments = MOCK_ENROLLMENTS;

  // Calculate some stats
  const totalStudents = enrollments.length;
  const activeClasses = classes.length;
  
  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Panel de Gestión</h1>
          <p className="text-slate-500 text-lg">Bienvenido, {coach.full_name} 👋</p>
          <div className="flex items-center gap-2 mt-1 text-sm text-blue-600 font-medium">
            <span className="bg-blue-100 px-2 py-0.5 rounded-full">{school.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Generar Reporte</Button>
          <Button>Nueva Clase</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Estudiantes" 
          value={totalStudents.toString()} 
          icon={<Users className="w-5 h-5 text-blue-600" />}
          description="+2 desde la última semana"
        />
        <StatCard 
          title="Clases Activas" 
          value={activeClasses.toString()} 
          icon={<Calendar className="w-5 h-5 text-emerald-600" />}
          description="Próxima: Tenis Mañana"
        />
        <StatCard 
          title="Ingresos Mensuales" 
          value="$450.000" 
          icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
          description="85% de la meta cumplida"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Próximas Clases</CardTitle>
            <CardDescription>Gestiona tus horarios y cupos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classes.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{cls.title}</h4>
                      <p className="text-sm text-slate-500">{cls.sport_type} • {cls.capacity} cupos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right mr-2">
                      <p className="text-sm font-medium text-slate-900">${cls.price.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">por alumno</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance / Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimos registros de asistencia y pagos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {MOCK_ATTENDANCE.map((att) => (
                <div key={att.id} className="flex items-start gap-4">
                  <div className={`mt-1 p-1 rounded-full ${att.is_present ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {att.is_present ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-slate-900">Asistencia marcada</h4>
                      <span className="text-xs text-slate-400">{att.date}</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {enrollments.find(e => e.id === att.enrollment_id)?.user_id || 'Estudiante'} asistió a la clase.
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100 text-center">
                <Button variant="ghost" className="text-sm text-blue-600">Ver historial completo</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
