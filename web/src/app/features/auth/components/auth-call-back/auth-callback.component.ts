import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthService,
  User,
} from '../../../../core/authentication/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth-callback',
  template: `
    <div class="flex justify-center items-center h-screen">
      <div class="text-center">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p class="mt-4">Finalisation de la connexion...</p>
      </div>
    </div>
  `,
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.handleGoogleCallback();
  }

  private handleGoogleCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const displayName = urlParams.get('displayName');
    const role = urlParams.get('role') || 'client';

    if (token && email) {
      const user: User = {
        id: urlParams.get('id') || '',
        email: email,
        displayName: displayName || email,
        token: token,
        role: role,
      };

      this.authService.setCurrentUser(user);

      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Connexion Google réussie',
      });

      const returnUrl = sessionStorage.getItem('returnUrl') || '/';

      sessionStorage.removeItem('returnUrl');

      window.history.replaceState({}, document.title, 'auth/auth-callback');

      setTimeout(() => {
        this.router.navigateByUrl(returnUrl);
      }, 1000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Échec de la connexion Google',
      });
      this.router.navigate(['/auth/login']);
    }
  }
}
