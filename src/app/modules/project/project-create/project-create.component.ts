// src/app/modules/project/project-create/project-create.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar.component';


@Component({
  selector: 'app-project-create',
  standalone: true,
  templateUrl: './project-create.html',
  styleUrls: ['./project-create.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent]
})
export class ProjectCreateComponent {
  projectForm: FormGroup;
  loading = false;
  showToast = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      this.triggerShake();
      return;
    }

    this.loading = true;
    this.http.post('http://localhost:8080/api/projects', this.projectForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.showToast = true;
        setTimeout(() => this.router.navigate(['/projects']), 1500);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Failed to create project.';
        this.showToast = true;
        this.triggerShake();
      }
    });
  }

  triggerShake() {
    const form = document.querySelector('.project-card');
    if (form) {
      form.classList.remove('shake');
      void (form as HTMLElement).offsetWidth;
      form.classList.add('shake');
    }
  }

  closeToast() {
    this.showToast = false;
  }
}
