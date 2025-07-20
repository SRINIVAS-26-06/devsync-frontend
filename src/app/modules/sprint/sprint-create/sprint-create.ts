import { Component } from '@angular/core';
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
export class SprintCreateComponent {
  sprintForm: FormGroup;
  loading = false;
  errorMsg = '';
  showToast = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.sprintForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.sprintForm.invalid) return;

    this.loading = true;
    this.http.post('http://localhost:8080/api/sprints', this.sprintForm.value).subscribe({
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
