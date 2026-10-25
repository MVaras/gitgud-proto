import { useMemo, useState } from 'react';
import { Check, Search, UserCheck, UserX, WalletCards } from 'lucide-react';
import type { StudentRecord } from './studentState';
import { markStudentAttendance, matchesStudentQuery, togglePaymentStatus } from './studentState';

type MobileStudentManagementProps = {
  initialStudents: StudentRecord[];
};

const today = () => new Date().toISOString().slice(0, 10);

export function MobileStudentManagement({ initialStudents }: MobileStudentManagementProps) {
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState('');
  const [attendanceMode, setAttendanceMode] = useState(false);

  const visibleStudents = useMemo(
    () => students.filter((student) => matchesStudentQuery(student, query)),
    [students, query],
  );
  const pendingStudents = students.filter((student) => student.paymentStatus === 'pending').length;

  const updateAttendance = (studentId: string, status: 'present' | 'absent') => {
    setStudents((current) => current.map((student) =>
      student.id === studentId ? markStudentAttendance(student, status, today()) : student,
    ));
  };

  const updatePayment = (studentId: string) => {
    setStudents((current) => current.map((student) =>
      student.id === studentId ? togglePaymentStatus(student) : student,
    ));
  };

  return (
    <section className="mobile-page space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mobile-eyebrow">Escuela</p>
          <h1 className="mobile-page-title">Alumnos</h1>
          <p className="mobile-page-subtitle">{students.length} activos · {pendingStudents} con cuota pendiente</p>
        </div>
        <button
          type="button"
          onClick={() => setAttendanceMode((current) => !current)}
          className={`mt-1 grid h-11 w-11 place-items-center rounded-full transition ${attendanceMode ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}
          aria-label={attendanceMode ? 'Cerrar control de asistencia' : 'Abrir control de asistencia'}
        >
          <UserCheck className="h-5 w-5" />
        </button>
      </div>

      <label className="relative block">
        <span className="sr-only">Buscar alumno</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar alumno"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </label>

      <div className="space-y-3">
        {visibleStudents.map((student) => (
          <article key={student.id} className="mobile-student-card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                  {student.fullName.slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-bold text-slate-900">{student.fullName}</h2>
                  <p className="truncate text-xs text-slate-500">{student.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => updatePayment(student.id)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[0.68rem] font-bold ${student.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}
              >
                <span className="inline-flex items-center gap-1"><WalletCards className="h-3 w-3" />{student.paymentStatus === 'paid' ? 'Al día' : 'Pendiente'}</span>
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
              <span>{student.attendanceCount} asistencias</span>
              <span>{student.lastAttendanceDate ?? 'Sin asistencia'}</span>
            </div>

            {attendanceMode && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateAttendance(student.id, 'present')}
                  className={`rounded-xl py-2 text-xs font-bold ${student.attendanceStatus === 'present' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'}`}
                >
                  <span className="inline-flex items-center gap-1"><Check className="h-4 w-4" />Presente</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateAttendance(student.id, 'absent')}
                  className={`rounded-xl py-2 text-xs font-bold ${student.attendanceStatus === 'absent' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700'}`}
                >
                  <span className="inline-flex items-center gap-1"><UserX className="h-4 w-4" />Ausente</span>
                </button>
              </div>
            )}
          </article>
        ))}
      </div>

      {visibleStudents.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No encontramos alumnos.</p>}
    </section>
  );
}
