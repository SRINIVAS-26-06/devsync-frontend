import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth.guard';

export const UserRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./user-list/user-list.component').then(m => m.UserListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./user-profile/user-profile.component').then(m => m.UserProfileComponent),
    canActivate: [AuthGuard]
  }
];
