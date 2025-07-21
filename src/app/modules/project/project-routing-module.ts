// src/app/modules/project/project-routing-module.ts

import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth.guard';

export const ProjectRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./project-list/project-list.component').then(m => m.ProjectListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./project-create/project-create.component').then(m => m.ProjectCreateComponent),
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
    canActivate: [AuthGuard]
  }
];
