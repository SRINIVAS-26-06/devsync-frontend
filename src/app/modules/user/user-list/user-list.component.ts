import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  const token = localStorage.getItem('token'); // Get token from localStorage

  if (token) {
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    this.http.get<any[]>('http://localhost:8080/api/users', { headers }).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  } else {
    console.error('No token found. User might not be authenticated.');
  }
}

}
