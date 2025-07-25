import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  loading = true;
  errorMsg = '';
  showToast = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
  const token = localStorage.getItem('token');
  const options = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  this.http.get<any[]>('http://localhost:8080/api/tasks', options).subscribe({
    next: (data) => {
      this.tasks = data;
      this.loading = false;
    },
    error: (err) => {
      console.error(err); // helpful for debugging
      this.errorMsg = 'Failed to load tasks.';
      this.loading = false;
      this.showToast = true;
    }
  });
}


  closeToast() {
    this.showToast = false;
  }
}
