import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../../../core/services/breadcrumb.service';
import { DiscountService } from '../../services/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
})
export class DiscountComponent implements OnInit {
  dialog: boolean = false;
  deleteDialog: boolean = false;
  formGroup!: FormGroup;
  discounts: any[] = [];
  discount: any = {};
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private discountService: DiscountService,
    private messageService: MessageService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Élément de base' },
      { label: 'Remises', routerLink: ['/files/discounts'] },
    ]);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadDiscounts();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      percentage: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        Validators.pattern(/^\d+$/),
      ]),
    });
  }

  loadDiscounts(): void {
    this.loading = true;
    this.discountService.getDiscounts().subscribe({
      next: (response) => {
        this.discounts = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading discounts:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les remises',
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.dialog = true;
    this.formGroup.reset();
    this.discount = {};
    this.submitted = false;
  }

  addDiscount(): void {
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

    const discountData = {
      name: this.formGroup.get('name')!.value,
      description: this.formGroup.get('description')!.value,
      percentage: parseInt(this.formGroup.get('percentage')!.value),
    };

    this.loading = true;

    if (this.discount.id) {
      // Update existing discount
      this.discountService
        .updateDiscount(this.discount.id, discountData)
        .subscribe({
          next: () => {
            this.handleSuccess('Remise modifiée avec succès');
          },
          error: (error) => {
            this.handleError(error, 'Échec lors de la modification');
          },
        });
    } else {
      // Create new discount
      this.discountService.createDiscount(discountData).subscribe({
        next: () => {
          this.handleSuccess('Remise ajoutée avec succès');
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
    this.loadDiscounts();
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

  editDiscount(data: any): void {
    this.discount = { ...data };
    this.formGroup.patchValue({
      name: data.name,
      description: data.description,
      percentage: data.percentage,
    });
    this.dialog = true;
    this.submitted = false;
  }

  deleteDiscount(data: any): void {
    this.discount = { ...data };
    this.deleteDialog = true;
  }

  confirmDelete(id: any): void {
    if (!id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'ID de remise invalide',
      });
      return;
    }

    this.loading = true;
    this.discountService.deleteDiscount(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression',
          detail: 'Remise supprimée avec succès',
          life: 3000,
        });
        this.deleteDialog = false;
        this.discount = {};
        this.loadDiscounts();
      },
      error: (error) => {
        console.error('Error deleting discount:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec lors de la suppression',
        });
        this.loading = false;
      },
    });
  }

  annuler(): void {
    this.dialog = false;
    this.submitted = false;
  }

  cancelDelete(): void {
    this.deleteDialog = false;
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
    if (control?.hasError('min')) {
      return 'La valeur minimum est 1';
    }
    if (control?.hasError('max')) {
      return 'La valeur maximum est 100';
    }
    if (control?.hasError('pattern')) {
      return 'Veuillez saisir un nombre entier valide';
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
