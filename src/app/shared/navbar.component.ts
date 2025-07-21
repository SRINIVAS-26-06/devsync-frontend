// src/app/shared/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  role: string | null = null;
  homeRoute: string = '/dashboard';

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  constructor(public authService: AuthService, private router: Router) {
    const user = this.authService.getCurrentUser();
    this.role = user?.role?.toUpperCase() || null;

    switch (this.role) {
      case 'ADMIN':
        this.homeRoute = '/admin-dashboard';
        break;
      case 'MANAGER':
        this.homeRoute = '/manager-dashboard';
        break;
      case 'DEVELOPER':
        this.homeRoute = '/developer-dashboard';
        break;
      case 'TESTER':
        this.homeRoute = '/tester-dashboard';
        break;
      case 'USER':
        this.homeRoute = '/dashboard';
        break;
      default:
        this.homeRoute = '/dashboard';
    }
  }

  logout() {
    this.authService.logout();
  }
}
