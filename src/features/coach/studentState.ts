export type PaymentStatus = 'paid' | 'pending';
export type AttendanceStatus = 'unmarked' | 'present' | 'absent';

export type StudentRecord = {
  id: string;
  fullName: string;
  email: string;
  paymentStatus: PaymentStatus;
  attendanceStatus: AttendanceStatus;
  attendanceCount: number;
  lastAttendanceDate: string | null;
};

export function markStudentAttendance(
  student: StudentRecord,
  status: Exclude<AttendanceStatus, 'unmarked'>,
  date: string,
): StudentRecord {
  const attendanceDelta =
    status === student.attendanceStatus
      ? 0
      : status === 'present'
        ? 1
        : student.attendanceStatus === 'present'
          ? -1
          : 0;
  const attendanceCount = Math.max(0, student.attendanceCount + attendanceDelta);

  return {
    ...student,
    attendanceStatus: status,
    attendanceCount,
    lastAttendanceDate: date,
  };
}

export function togglePaymentStatus(student: StudentRecord): StudentRecord {
  return {
    ...student,
    paymentStatus: student.paymentStatus === 'paid' ? 'pending' : 'paid',
  };
}

export function matchesStudentQuery(student: StudentRecord, query: string): boolean {
  const normalizedQuery = query.trim().toLocaleLowerCase('es-CL');
  if (!normalizedQuery) return true;

  return [student.fullName, student.email].some((value) =>
    value.toLocaleLowerCase('es-CL').includes(normalizedQuery),
  );
}
