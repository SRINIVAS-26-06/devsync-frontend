// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { RoleGuard } from './core/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // 🔐 Auth Pages
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-module').then(m => m.AuthModule)
  },

  // 🧠 DASHBOARDS per ROLE
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./modules/dashboard/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'manager-dashboard',
    loadComponent: () =>
      import('./modules/dashboard/manager-dashboard/manager-dashboard.component').then(m => m.ManagerDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['MANAGER'] }
  },
  {
    path: 'developer-dashboard',
    loadComponent: () =>
      import('./modules/dashboard/developer-dashboard/developer-dashboard.component').then(m => m.DeveloperDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['DEVELOPER'] }
  },
  {
    path: 'tester-dashboard',
    loadComponent: () =>
      import('./modules/dashboard/tester-dashboard/tester-dashboard.component').then(m => m.TesterDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['TESTER'] }
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/dashboard/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['USER'] }
  },

  // 👥 USER MANAGEMENT (Admin only)
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/user/user-module').then(m => m.UserModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },

  // 📁 PROJECTS (Admin & Manager)
  {
    path: 'projects',
    loadChildren: () =>
      import('./modules/project/project-module').then(m => m.ProjectModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MANAGER'] }
  },

  // 🏃‍♂️ SPRINTS (Admin, Manager, Developer)
  {
    path: 'sprints',
    loadChildren: () =>
      import('./modules/sprint/sprint-module').then(m => m.SprintModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'MANAGER', 'DEVELOPER'] }
  },

  // ✅ TASKS (All authenticated users)
  {
    path: 'tasks',
    loadChildren: () =>
      import('./modules/task/task-module').then(m => m.TaskModule),
    canActivate: [AuthGuard]
  },

  // 🚫 Unauthorized
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },

  // 🌐 Wildcard fallback
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
