// src/app/core/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  getCurrentUser(): { id: number; email: string; role: string } | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload?.sub,
      email: payload?.email,
      role: payload?.role
    };
  } catch (e) {
    console.error('Failed to parse token payload', e);
    return null;
  }
}


  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
  const token = localStorage.getItem(this.tokenKey);
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiry = payload.exp;
  const now = Math.floor(Date.now() / 1000);

  if (expiry && expiry < now) {
    this.logout(); // Clear token & redirect
    return null;
  }

  return token;
}


  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
