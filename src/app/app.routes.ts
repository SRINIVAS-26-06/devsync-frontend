// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProjectCreateComponent } from './project-create/project-create';
import { ProjectListComponent } from './project-list/project-list';
import { ProjectDetailComponent } from './project-detail/project-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
   { path: 'login', loadComponent: () => import('./login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register').then(m => m.RegisterComponent) },
  { path: '', component: ProjectListComponent },
  { path: 'create', component: ProjectCreateComponent },
  { path: ':id', component: ProjectDetailComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard-module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./modules/project/project-module').then((m) => m.ProjectModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sprints',
    loadChildren: () =>
      import('./modules/sprint/sprint-module').then((m) => m.SprintModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./modules/task/task-module').then((m) => m.TaskModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/user/user-module').then((m) => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  {
  path: 'unauthorized',
  loadComponent: () =>
    import('./shared/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
}
];
