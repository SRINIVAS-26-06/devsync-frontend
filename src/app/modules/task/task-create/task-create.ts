import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar.component';

@Component({
  selector: 'app-task-create',
  standalone: true,
  templateUrl: './task-create.html',
  styleUrls: ['./task-create.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent]
})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;
  loading = false;
  errorMsg = '';
  showToast = false;

  sprints: any[] = [];
  users: any[] = [];
  projects: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['TO_DO', Validators.required],
      sprintId: ['', Validators.required],
      assignedToId: [''],
      projectId: ['']
    });
  }

  ngOnInit(): void {
    this.loadSprints();
    this.loadUsers();
    this.loadProjects();
  }

  loadSprints(): void {
  const token = localStorage.getItem('token');
  const headers = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  this.http.get<any[]>('http://localhost:8080/api/sprints', headers).subscribe({
    next: (data) => this.sprints = data,
    error: () => {
      this.errorMsg = 'Failed to load sprints.';
      this.showToast = true;
    }
  });
}


  loadUsers(): void {
  const token = localStorage.getItem('token');
  const headers = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  this.http.get<any[]>('http://localhost:8080/api/users', headers).subscribe({
    next: (data) => this.users = data,
    error: () => {
      this.errorMsg = 'Failed to load users.';
      this.showToast = true;
    }
  });
}


  loadProjects(): void {
  const token = localStorage.getItem('token');
  const headers = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  this.http.get<any[]>('http://localhost:8080/api/projects', headers).subscribe({
    next: (data) => this.projects = data,
    error: () => {
      this.errorMsg = 'Failed to load projects.';
      this.showToast = true;
    }
  });
}


  onSubmit(): void {
  if (this.taskForm.invalid) return;

  const formValue = this.taskForm.value;

  const payload: any = {
    title: formValue.title,
    description: formValue.description,
    status: formValue.status,
    sprint: { id: formValue.sprintId }
  };

  if (formValue.assignedToId) {
    payload.assignedTo = { id: formValue.assignedToId };
  }

  if (formValue.projectId) {
    payload.project = { id: formValue.projectId };
  }

  console.log('Payload being sent:', payload); // Helpful for debugging

  this.loading = true;
  const token = localStorage.getItem('token');
  const headers = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  this.http.post('http://localhost:8080/api/tasks', payload, headers).subscribe({
    next: () => {
      this.loading = false;
      this.router.navigate(['/tasks']);
    },
    error: (err) => {
      console.error('Task creation error:', err);
      this.loading = false;
      this.errorMsg = 'Failed to create task.';
      this.showToast = true;
    }
  });
}


  closeToast() {
    this.showToast = false;
  }
}
