// src/app/modules/sprint/sprint-routing-module.ts

import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth.guard';

export const SprintRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./sprint-list/sprint-list').then(m => m.SprintListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./sprint-create/sprint-create').then(m => m.SprintCreateComponent),
    canActivate: [AuthGuard]
  }
];
