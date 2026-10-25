import type { UserRole } from './types';

export type ProductView =
  | 'home'
  | 'courts'
  | 'classes'
  | 'rivals'
  | 'tournaments'
  | 'marketplace'
  | 'messages'
  | 'notifications'
  | 'profile'
  | 'explore'
  | 'students';

export type ProductNavigationItem = {
  id: ProductView;
  label: string;
  icon: 'home' | 'calendar' | 'dumbbell' | 'users' | 'trophy' | 'store' | 'message' | 'bell' | 'profile' | 'grid';
};

const athleteDesktop: ProductNavigationItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'courts', label: 'Reservas y canchas', icon: 'calendar' },
  { id: 'classes', label: 'Entrenamiento', icon: 'dumbbell' },
  { id: 'rivals', label: 'Buscar rival', icon: 'users' },
  { id: 'tournaments', label: 'Torneos', icon: 'trophy' },
  { id: 'marketplace', label: 'Marketplace', icon: 'store' },
  { id: 'messages', label: 'Mensajes', icon: 'message' },
  { id: 'notifications', label: 'Notificaciones', icon: 'bell' },
  { id: 'profile', label: 'Perfil', icon: 'profile' },
];

const coachDesktop: ProductNavigationItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'students', label: 'Alumnos', icon: 'users' },
  { id: 'classes', label: 'Clases', icon: 'dumbbell' },
  { id: 'courts', label: 'Reservas y canchas', icon: 'calendar' },
  { id: 'tournaments', label: 'Torneos', icon: 'trophy' },
  { id: 'marketplace', label: 'Marketplace', icon: 'store' },
  { id: 'messages', label: 'Mensajes', icon: 'message' },
  { id: 'notifications', label: 'Notificaciones', icon: 'bell' },
  { id: 'profile', label: 'Perfil', icon: 'profile' },
];

const adminDesktop: ProductNavigationItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'courts', label: 'Reservas y canchas', icon: 'calendar' },
  { id: 'classes', label: 'Entrenamiento', icon: 'dumbbell' },
  { id: 'rivals', label: 'Rivales', icon: 'users' },
  { id: 'tournaments', label: 'Torneos', icon: 'trophy' },
  { id: 'marketplace', label: 'Marketplace', icon: 'store' },
  { id: 'messages', label: 'Mensajes', icon: 'message' },
  { id: 'notifications', label: 'Notificaciones', icon: 'bell' },
  { id: 'profile', label: 'Perfil', icon: 'profile' },
];

const mobileNavigation: ProductNavigationItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'courts', label: 'Reservas', icon: 'calendar' },
  { id: 'explore', label: 'Explorar', icon: 'grid' },
  { id: 'messages', label: 'Mensajes', icon: 'message' },
  { id: 'profile', label: 'Perfil', icon: 'profile' },
];

export function getDesktopNavigation(role: UserRole): ProductNavigationItem[] {
  if (role === 'coach') return coachDesktop;
  if (role === 'admin') return adminDesktop;
  return athleteDesktop;
}

export function getMobileNavigation(_role: UserRole): ProductNavigationItem[] {
  return mobileNavigation;
}
