import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth.guard';

export const TaskRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./task-list/task-list').then(m => m.TaskListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./task-create/task-create').then(m => m.TaskCreateComponent),
    canActivate: [AuthGuard]
  }
];
