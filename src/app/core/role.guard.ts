// import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from './auth.service';

// export const RoleGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   const token = authService.getToken();
//   if (!token) {
//     router.navigate(['/unauthorized']);
//     return false;
//   }

//   const payload = JSON.parse(atob(token.split('.')[1]));
//   const userRole = payload?.role || null;
//   const allowedRoles = route.data['roles'] as string[];

//   if (allowedRoles.includes(userRole)) {
//     return true;
//   } else {
//     router.navigate(['/unauthorized']);
//     return false;
//   }
// };


// src/app/core/role.guard.ts
// src/app/core/role.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const expectedRoles: string[] = route.data['roles'];

    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return this.router.parseUrl('/auth/login');
    }

    try {
      const user = JSON.parse(userStr);
      const userRole = user?.role;

      if (!userRole) {
        return this.router.parseUrl('/unauthorized');
      }

      if (expectedRoles.includes(userRole)) {
        return true;
      }

      return this.router.parseUrl('/unauthorized');
    } catch (e) {
      console.error('RoleGuard error parsing user from localStorage:', e);
      return this.router.parseUrl('/auth/login');
    }
  }
}
