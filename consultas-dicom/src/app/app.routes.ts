import { Routes } from '@angular/router';
import { ExameFormComponent } from '@pages/exames/exame-form/exame-form';
import { ExameListComponent } from '@pages/exames/exame-list/exame-list';
import { Home } from '@pages/home/home';
import { PacienteFormComponent } from '@pages/pacientes/paciente-form/paciente-form';
import { PacienteListComponent } from '@pages/pacientes/paciente-list/paciente-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pacientes', component: PacienteListComponent },
  { path: 'pacientes/novo', component: PacienteFormComponent },
  { path: 'pacientes/editar/:id', component: PacienteFormComponent },
  { path: 'exames', component: ExameListComponent },
  { path: 'exames/novo', component: ExameFormComponent },
  { path: 'exames/editar/:id', component: ExameFormComponent },
  { path: '**', redirectTo: '' },
];
