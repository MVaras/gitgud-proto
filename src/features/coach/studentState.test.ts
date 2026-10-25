import { describe, expect, it } from 'vitest';
import {
  markStudentAttendance,
  matchesStudentQuery,
  togglePaymentStatus,
  type StudentRecord,
} from './studentState';

const student: StudentRecord = {
  id: 'student-1',
  fullName: 'María García',
  email: 'maria@example.com',
  paymentStatus: 'pending',
  attendanceStatus: 'unmarked',
  attendanceCount: 4,
  lastAttendanceDate: '2026-10-10',
};

describe('student state', () => {
  it('marks attendance and increases the count only when the student is present', () => {
    const result = markStudentAttendance(student, 'present', '2026-10-13');

    expect(result.attendanceStatus).toBe('present');
    expect(result.attendanceCount).toBe(5);
    expect(result.lastAttendanceDate).toBe('2026-10-13');
  });

  it('marks an absence without adding an attended class', () => {
    const result = markStudentAttendance(student, 'absent', '2026-10-13');

    expect(result.attendanceStatus).toBe('absent');
    expect(result.attendanceCount).toBe(4);
    expect(result.lastAttendanceDate).toBe('2026-10-13');
  });

  it('keeps the count consistent when a coach corrects attendance', () => {
    const markedPresent = markStudentAttendance(student, 'present', '2026-10-13');
    const correctedToAbsent = markStudentAttendance(markedPresent, 'absent', '2026-10-13');
    const correctedToPresent = markStudentAttendance(correctedToAbsent, 'present', '2026-10-13');

    expect(correctedToAbsent.attendanceCount).toBe(4);
    expect(correctedToPresent.attendanceCount).toBe(5);
  });

  it('toggles a manual payment record', () => {
    expect(togglePaymentStatus(student).paymentStatus).toBe('paid');
    expect(togglePaymentStatus({ ...student, paymentStatus: 'paid' }).paymentStatus).toBe('pending');
  });

  it('finds students by name or email without case sensitivity', () => {
    expect(matchesStudentQuery(student, 'MARÍA')).toBe(true);
    expect(matchesStudentQuery(student, 'maria@example')).toBe(true);
    expect(matchesStudentQuery(student, 'tenis')).toBe(false);
  });
});
