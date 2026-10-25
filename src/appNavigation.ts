import type { UserRole } from './types';

export type MobileNavigationItem = {
  id: string;
  label: string;
  icon: 'home' | 'users' | 'trophy';
};

const navigationByRole: Record<UserRole, MobileNavigationItem[]> = {
  athlete: [
    { id: 'progress', label: 'Inicio', icon: 'home' },
    { id: 'courts', label: 'Canchas', icon: 'trophy' },
    { id: 'tournaments', label: 'Torneos', icon: 'trophy' },
  ],
  coach: [
    { id: 'summary', label: 'Inicio', icon: 'home' },
    { id: 'students', label: 'Alumnos', icon: 'users' },
    { id: 'tournaments', label: 'Torneos', icon: 'trophy' },
  ],
  admin: [
    { id: 'overview', label: 'Inicio', icon: 'home' },
    { id: 'tournaments', label: 'Torneos', icon: 'trophy' },
  ],
};

export function getMobileNavigation(role: UserRole): MobileNavigationItem[] {
  return navigationByRole[role];
}
