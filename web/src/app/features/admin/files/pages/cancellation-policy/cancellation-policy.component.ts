import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../../../core/services/breadcrumb.service';
import { CancellationPolicyService } from '../../services/cancellation-policy.service';

@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.component.html',
})
export class CancellationPoliciesComponent implements OnInit {
  dialog: boolean = false;
  deleteDialog: boolean = false;
  formGroup!: FormGroup;
  cancellationPolicies: any[] = [];
  cancellationPolicy: any = {};
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private cancellationPolicyService: CancellationPolicyService,
    private messageService: MessageService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Élément de base' },
      {
        label: "Politiques d'annulation",
        routerLink: ['/files/cancellation-policies'],
      },
    ]);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadCancellationPolicies();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      designation: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
  }

  loadCancellationPolicies(): void {
    this.loading = true;
    this.cancellationPolicyService.getCancellationPolicies().subscribe({
      next: (response) => {
        this.cancellationPolicies = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cancellation policies:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de charger les politiques d'annulation",
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.dialog = true;
    this.formGroup.reset();
    this.cancellationPolicy = {};
    this.submitted = false;
  }

  saveCancellationPolicy(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      this.validateAllFields(this.formGroup);
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs obligatoires',
      });
      return;
    }

    // Create request for submission
    const request = {
      designation: this.formGroup.get('designation')!.value,
      description: this.formGroup.get('description')!.value,
    };

    this.loading = true;

    if (this.cancellationPolicy.id) {
      // Update existing policy
      this.cancellationPolicyService
        .updateCancellationPolicy(this.cancellationPolicy.id, request)
        .subscribe({
          next: () => {
            this.handleSuccess("Politique d'annulation modifiée avec succès");
          },
          error: (error) => {
            this.handleError(error, 'Échec lors de la modification');
          },
        });
    } else {
      // Create new policy
      this.cancellationPolicyService
        .createCancellationPolicy(request)
        .subscribe({
          next: () => {
            this.handleSuccess("Politique d'annulation ajoutée avec succès");
          },
          error: (error) => {
            this.handleError(error, "Échec lors de l'ajout");
          },
        });
    }
  }

  handleSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: message,
      life: 3000,
    });
    this.dialog = false;
    this.loading = false;
    this.submitted = false;
    this.loadCancellationPolicies();
  }

  handleError(error: any, message: string): void {
    console.error('API error details:', error);
    let errorDetail = message;

    // Try to extract more specific error information if available
    if (error.error && typeof error.error === 'object') {
      if (error.error.message) {
        errorDetail = `${message}: ${error.error.message}`;
      } else if (error.error.title) {
        errorDetail = `${message}: ${error.error.title}`;
      }
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: errorDetail,
    });
    this.loading = false;
  }

  editCancellationPolicy(data: any): void {
    this.cancellationPolicy = { ...data };
    this.formGroup.patchValue({
      designation: data.designation,
      description: data.description,
    });
    this.dialog = true;
    this.submitted = false;
  }

  deleteCancellationPolicy(data: any): void {
    this.cancellationPolicy = { ...data };
    this.deleteDialog = true;
  }

  annuler(): void {
    this.dialog = false;
    this.submitted = false;
  }

  cancelDelete(): void {
    this.deleteDialog = false;
  }

  confirmDelete(id: any): void {
    if (!id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: "ID de politique d'annulation invalide",
      });
      return;
    }

    this.loading = true;
    this.cancellationPolicyService.deleteCancellationPolicy(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression',
          detail: "Politique d'annulation supprimée avec succès",
          life: 3000,
        });
        this.deleteDialog = false;
        this.cancellationPolicy = {};
        this.loadCancellationPolicies();
      },
      error: (error) => {
        console.error('Error deleting cancellation policy:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec lors de la suppression',
        });
        this.loading = false;
      },
    });
  }

  // Form validation helpers
  isInvalid(field: string): boolean {
    const control = this.formGroup.get(field);
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || this.submitted)
    );
  }

  getErrorMessage(field: string): string {
    const control = this.formGroup.get(field);
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Maximum ${maxLength} caractères`;
    }
    return '';
  }

  private validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
}
