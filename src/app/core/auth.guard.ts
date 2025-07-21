// // src/app/core/auth.guard.ts

// import { Injectable } from '@angular/core';
// import {
//   CanActivateFn,
//   Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot
// } from '@angular/router';

// import { AuthService } from './auth.service';
// import { inject } from '@angular/core';

// export const AuthGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (authService.getToken()) {
//     return true;
//   } else {
//     router.navigate(['/auth/login']);
//     return false;
//   }
// };


// src/app/core/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return this.router.parseUrl('/auth/login');
  }
}
