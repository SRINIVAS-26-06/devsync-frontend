import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule] // ✅ Angular modules only
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';
  loading = false;
  showToast = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.triggerInvalidAnimation();
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.showToast = true;
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Invalid credentials';
        this.triggerInvalidAnimation();
        this.showToast = true;
      }
    });
  }

  triggerInvalidAnimation() {
    const form = document.querySelector('.login-card');
    if (form) {
      form.classList.remove('shake');
      void (form as HTMLElement).offsetWidth; // trigger reflow
      form.classList.add('shake');
    }
  }

  closeToast() {
    this.showToast = false;
  }
}
