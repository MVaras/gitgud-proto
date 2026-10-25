import { useMemo, useState } from 'react';
import { CheckCircle2, Search, UserCheck, UserX, WalletCards } from 'lucide-react';
import type { StudentRecord } from './studentState';
import { markStudentAttendance, matchesStudentQuery, togglePaymentStatus } from './studentState';

type StudentManagementProps = {
  initialStudents: StudentRecord[];
};

const today = () => new Date().toISOString().slice(0, 10);

export function StudentManagement({ initialStudents }: StudentManagementProps) {
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState('');
  const [attendanceMode, setAttendanceMode] = useState(false);

  const visibleStudents = useMemo(
    () => students.filter((student) => matchesStudentQuery(student, query)),
    [students, query],
  );

  const paidStudents = students.filter((student) => student.paymentStatus === 'paid').length;
  const pendingStudents = students.length - paidStudents;

  const updateAttendance = (studentId: string, status: 'present' | 'absent') => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId ? markStudentAttendance(student, status, today()) : student,
      ),
    );
  };

  const updatePayment = (studentId: string) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId ? togglePaymentStatus(student) : student,
      ),
    );
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Escuela</p>
          <h1 className="text-3xl font-bold text-slate-900">Alumnos</h1>
          <p className="mt-1 text-slate-500">Control de cuotas y asistencia por clase.</p>
        </div>
        <button
          type="button"
          onClick={() => setAttendanceMode((current) => !current)}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            attendanceMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="h-4 w-4" />
          {attendanceMode ? 'Cerrar asistencia' : 'Pasar asistencia'}
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Alumnos activos" value={students.length} tone="blue" />
        <SummaryCard label="Cuotas al día" value={paidStudents} tone="emerald" />
        <SummaryCard label="Pagos pendientes" value={pendingStudents} tone="amber" />
      </div>

      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <label className="relative block max-w-md">
            <span className="sr-only">Buscar alumno</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre o email"
              className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Alumno</th>
                <th className="px-5 py-3 font-semibold">Cuota</th>
                <th className="px-5 py-3 font-semibold">Asistencias</th>
                <th className="px-5 py-3 font-semibold">Última clase</th>
                {attendanceMode && <th className="px-5 py-3 text-right font-semibold">Registrar hoy</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleStudents.map((student) => (
                <tr key={student.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{student.fullName}</p>
                    <p className="text-xs text-slate-500">{student.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => updatePayment(student.id)}
                      aria-label={`Cambiar estado de pago de ${student.fullName}`}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                        student.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      <WalletCards className="h-3.5 w-3.5" />
                      {student.paymentStatus === 'paid' ? 'Al día' : 'Pendiente'}
                    </button>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-700">{student.attendanceCount}</td>
                  <td className="px-5 py-4 text-slate-600">{student.lastAttendanceDate ?? 'Sin registro'}</td>
                  {attendanceMode && (
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => updateAttendance(student.id, 'present')}
                          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            student.attendanceStatus === 'present'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" /> Presente
                        </button>
                        <button
                          type="button"
                          onClick={() => updateAttendance(student.id, 'absent')}
                          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            student.attendanceStatus === 'absent'
                              ? 'bg-rose-600 text-white'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          }`}
                        >
                          <UserX className="h-4 w-4" /> Ausente
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleStudents.length === 0 && (
          <p className="p-10 text-center text-sm text-slate-500">No hay alumnos que coincidan con la búsqueda.</p>
        )}
      </div>
    </section>
  );
}

type SummaryCardProps = {
  label: string;
  value: number;
  tone: 'blue' | 'emerald' | 'amber';
};

function SummaryCard({ label, value, tone }: SummaryCardProps) {
  const tones = {
    blue: 'border-blue-100 bg-blue-50 text-blue-700',
    emerald: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    amber: 'border-amber-100 bg-amber-50 text-amber-800',
  };

  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
}
