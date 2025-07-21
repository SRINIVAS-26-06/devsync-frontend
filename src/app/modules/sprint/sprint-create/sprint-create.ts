import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar.component';

@Component({
  selector: 'app-sprint-create',
  standalone: true,
  templateUrl: './sprint-create.html',
  styleUrls: ['./sprint-create.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent]
})
export class SprintCreateComponent implements OnInit {
  sprintForm: FormGroup;
  loading = false;
  errorMsg = '';
  showToast = false;
  projects: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.sprintForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      projectId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
  const token = localStorage.getItem('token');
  const options = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  this.http.get<any[]>('http://localhost:8080/api/projects', options).subscribe({
    next: (data) => this.projects = data,
    error: () => {
      this.errorMsg = 'Failed to load projects.';
      this.showToast = true;
    }
  });
}


  onSubmit(): void {
  if (this.sprintForm.invalid) return;

  const formValue = this.sprintForm.value;
  const payload = {
    name: formValue.name,
    startDate: formValue.startDate,
    endDate: formValue.endDate,
    project: {
      id: formValue.projectId
    }
  };

  const token = localStorage.getItem('token');
  const options = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  this.loading = true;
  this.http.post('http://localhost:8080/api/sprints', payload, options).subscribe({
    next: () => {
      this.loading = false;
      this.router.navigate(['/sprints']);
    },
    error: () => {
      this.errorMsg = 'Sprint creation failed.';
      this.loading = false;
      this.showToast = true;
    }
  });
}


  closeToast() {
    this.showToast = false;
  }
}
