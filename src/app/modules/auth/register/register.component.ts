import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMsg = '';
  showToast = false;
  roles = ['USER', 'ADMIN', 'MANAGER', 'DEVELOPER', 'TESTER']; // Dropdown options

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required] // 👈 Add default role
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.triggerInvalidAnimation();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.showToast = true;
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Registration failed. Try again.';
        this.triggerInvalidAnimation();
        this.showToast = true;
      }
    });
  }

  triggerInvalidAnimation() {
    const form = document.querySelector('.register-card');
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
