import { MenuItem } from '@core/interfaces/menu-item.interface';

export const menuItems: MenuItem[] = [
  { label: 'Home', icon: 'fa-house-chimney-medical', route: '/' },
  { label: 'Pacientes', icon: 'fa-users', route: '/pacientes' },
  { label: 'Exames', icon: 'fa-x-ray', route: '/exames' },
];
