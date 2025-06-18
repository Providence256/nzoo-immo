import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/authentication/auth.service';
import { finalize } from 'rxjs/operators';
import { BecomeHostService } from '../../../../core/authentication/become-host.service';

@Component({
  selector: 'app-become-host',
  templateUrl: './become-host.component.html',
})
export class BecomeHostComponent implements OnInit {
  becomeHostForm: FormGroup;
  loading = false;
  submitted = false;
  currentStep = 1;
  totalSteps = 3;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hostService: BecomeHostService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.becomeHostForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\+]?[0-9\s\-\(\)]{10,15}$/),
        ],
      ],
      acceptTerms: [false, Validators.requiredTrue],
      motivation: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: '/become-host' },
      });
      return;
    }
  }

  get f() {
    return this.becomeHostForm.controls;
  }

  nextStep(): void {
    this.submitted = true;

    // Validation spécifique par étape
    if (this.currentStep === 1 && this.f['phoneNumber'].invalid) {
      this.showValidationError();
      return;
    }

    if (this.currentStep === 2 && this.f['motivation'].invalid) {
      this.showValidationError();
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.submitted = false; // Reset submitted pour la prochaine étape
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.submitted = false;
    }
  }

  private showValidationError(): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Validation requise',
      detail:
        'Veuillez remplir tous les champs obligatoires avant de continuer.',
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.becomeHostForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur de validation',
        detail: 'Veuillez corriger les erreurs dans le formulaire',
      });

      // Retourner à l'étape avec l'erreur
      if (this.f['phoneNumber'].invalid) {
        this.currentStep = 1;
      } else if (this.f['motivation'].invalid) {
        this.currentStep = 2;
      }
      return;
    }

    this.loading = true;

    const request = {
      phoneNumber: this.f['phoneNumber'].value.trim(),
      hostDescription: this.f['motivation'].value.trim(),
    };

    console.log(request);
    this.hostService
      .becomeHost(request)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Félicitations !',
            detail:
              'Votre demande pour devenir hôte a été soumise avec succès.',
            life: 5000,
          });

          setTimeout(() => {
            this.router.navigate(['/host/dashboard']);
          }, 2000);
        },
        error: (error) => {
          let errorMessage = 'Une erreur est survenue lors de la soumission.';

          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.status === 400) {
            if (error.error === 'User already a host') {
              errorMessage = 'Vous êtes déjà un hôte.';
            } else if (error.error?.includes('phone')) {
              errorMessage = 'Le numéro de téléphone est invalide.';
            }
          } else if (error.status === 401) {
            errorMessage = 'Votre session a expiré. Veuillez vous reconnecter.';
            this.router.navigate(['/auth/login'], {
              queryParams: { returnUrl: '/become-host' },
            });
            return;
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: errorMessage,
            life: 5000,
          });
        },
      });
  }

  getStepIcon(step: number): string {
    if (step < this.currentStep) {
      return 'pi-check-circle';
    } else if (step === this.currentStep) {
      return 'pi-circle-fill';
    } else {
      return 'pi-circle';
    }
  }

  getStepClass(step: number): string {
    if (step < this.currentStep) {
      return 'text-green-600';
    } else if (step === this.currentStep) {
      return 'text-indigo-600';
    } else {
      return 'text-gray-400';
    }
  }

  // Méthode utilitaire pour vérifier si une étape est valide
  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.f['phoneNumber'].valid;
      case 2:
        return this.f['motivation'].valid;
      case 3:
        return this.f['acceptTerms'].valid;
      default:
        return false;
    }
  }
}
