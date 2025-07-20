import { Component } from '@angular/core';
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
export class TaskCreateComponent {
  taskForm: FormGroup;
  loading = false;
  errorMsg = '';
  showToast = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['TO_DO', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.loading = true;
    this.http.post('http://localhost:8080/api/tasks', this.taskForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.errorMsg = 'Failed to create task.';
        this.loading = false;
        this.showToast = true;
      }
    });
  }

  closeToast() {
    this.showToast = false;
  }
}
