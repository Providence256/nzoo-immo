import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../../../core/services/breadcrumb.service';
import { BathroomTypesService } from '../../services/bathroom-types.service';

@Component({
  selector: 'app-bathroom-types',
  templateUrl: './bathroom-types.component.html',
})
export class BathroomTypesComponent implements OnInit {
  dialog: boolean = false;
  deleteDialog: boolean = false;
  formGroup!: FormGroup;
  bathroomTypes: any[] = [];
  bathroomType: any = {};
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private bathroomTypesService: BathroomTypesService,
    private messageService: MessageService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Élément de base' },
      {
        label: 'Types de Salle de Bain',
        routerLink: ['/files/bathroom-types'],
      },
    ]);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadBathroomTypes();
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
    });
  }

  loadBathroomTypes(): void {
    this.loading = true;
    this.bathroomTypesService.getBathroomTypes().subscribe({
      next: (response) => {
        this.bathroomTypes = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bathroom types:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les types de salle de bain',
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.dialog = true;
    this.formGroup.reset();
    this.bathroomType = {};
    this.submitted = false;
  }

  addBathroomType(): void {
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

    const bathroomTypeData = {
      name: this.formGroup.get('name')!.value,
      description: this.formGroup.get('description')!.value,
    };

    this.loading = true;

    if (this.bathroomType.id) {
      // Update existing bathroom type
      this.bathroomTypesService
        .updateBathroomType(this.bathroomType.id, bathroomTypeData)
        .subscribe({
          next: () => {
            this.handleSuccess('Type de salle de bain modifié avec succès');
          },
          error: (error) => {
            this.handleError(error, 'Échec lors de la modification');
          },
        });
    } else {
      // Create new bathroom type
      this.bathroomTypesService.createBathroomType(bathroomTypeData).subscribe({
        next: () => {
          this.handleSuccess('Type de salle de bain ajouté avec succès');
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
    this.loadBathroomTypes();
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

  editBathroomType(data: any): void {
    this.bathroomType = { ...data };
    this.formGroup.patchValue({
      name: data.name,
      description: data.description,
    });
    this.dialog = true;
    this.submitted = false;
  }

  deleteBathroomType(data: any): void {
    this.bathroomType = { ...data };
    this.deleteDialog = true;
  }

  confirmDelete(id: any): void {
    if (!id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'ID de type de salle de bain invalide',
      });
      return;
    }

    this.loading = true;
    this.bathroomTypesService.deleteBathroomType(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression',
          detail: 'Type de salle de bain supprimé avec succès',
          life: 3000,
        });
        this.deleteDialog = false;
        this.bathroomType = {};
        this.loadBathroomTypes();
      },
      error: (error) => {
        console.error('Error deleting bathroom type:', error);
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
