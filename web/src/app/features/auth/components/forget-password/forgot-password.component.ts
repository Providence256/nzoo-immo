// src/app/features/auth/components/forgot-password/forgot-password.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/authentication/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    // Initialize form
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.requestPasswordReset(this.f['email'].value)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe({
        next: () => {
          this.emailSent = true;
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Password Reset Requested', 
            detail: 'We have sent a password reset link to your email address.' 
          });
        },
        error: error => {
          const errorMessage = error.error?.message || 'Failed to send password reset email. Please try again.';
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Request Failed', 
            detail: errorMessage 
          });
        }
      });
  }

  backToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}