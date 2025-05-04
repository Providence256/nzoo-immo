import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";
import { TauxChangeService } from "../../services/taux-change.service";

@Component({
  selector: 'app-taux-change',
  templateUrl: './taux-change.component.html',
})
export class TauxChangeComponent implements OnInit {
  dialog: boolean = false;
  deleteDialog: boolean = false;
  formGroup!: FormGroup;
  tauxChanges: any[] = [];
  tauxChange: any = {};
  devises: any[] = [];
  deviseReference: any = {};
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private tauxChangeService: TauxChangeService,
    private messageService: MessageService,
  ) {
    this.breadcrumbService.setItems([
      { label: 'Saisies' },
      { label: 'Taux de change', routerLink: ['/saisies/taux-change'] },
    ]);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadTauxChanges();
    this.loadDevises();
    this.loadDeviseReference();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      deviseReference: new FormControl('', [Validators.required]),
      deviseConversion: new FormControl('', [Validators.required]),
      uniteReference: new FormControl('', [Validators.required, Validators.min(0)]),
      tauxChange: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  loadDevises(): void {
    this.tauxChangeService.getDevises().subscribe({
      next: (response) => {
        this.devises = response;
      },
      error: (error) => {
        console.error('Error loading devises:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les devises',
          life: 3000
        });
      },
    });
  }

  loadDeviseReference(): void {
    this.tauxChangeService.getDeviseReference().subscribe({
      next: (response) => {
        this.deviseReference = response;
        this.formGroup.get('deviseReference')?.setValue(this.deviseReference.code);
      },
      error: (error) => {
        console.error('Error loading devise reference:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger la devise de référence',
          life: 3000
        });
      },
    });
  }

  loadTauxChanges(): void {
    this.loading = true;
    this.tauxChangeService.getTauxChanges().subscribe({
      next: (response) => {
        this.tauxChanges = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading taux de change:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les taux de change',
          life: 3000
        });
        this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.dialog = true;
    this.formGroup.reset();
    // Set the devise reference code (don't reset it)
    this.formGroup.get('deviseReference')?.setValue(this.deviseReference.code);
    this.tauxChange = {};
    this.submitted = false;
  }

  addtauxChange(): void {
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
    
    // Create request object
    const request = {
      deviseReferenceId: this.deviseReference.id,
      deviseId: this.formGroup.get('deviseConversion')?.value.id,
      uniteReference: this.formGroup.get('uniteReference')?.value,
      taux: this.formGroup.get('tauxChange')?.value
    };

    this.loading = true;
    
    if (this.tauxChange.id) {
      // Update existing taux de change
      this.tauxChangeService.updateTauxChange(this.tauxChange.id, request).subscribe({
        next: () => {
          this.handleSuccess('Taux de change modifié avec succès');
        },
        error: (error) => {
          this.handleError(error, 'Échec lors de la modification');
        }
      });
    } else {
      // Create new taux de change
      this.tauxChangeService.createTauxChange(request).subscribe({
        next: () => {
          this.handleSuccess('Taux de change ajouté avec succès');
        },
        error: (error) => {
          this.handleError(error, 'Échec lors de l\'ajout');
        }
      });
    }
  }

  handleSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: message,
      life: 3000
    });
    this.dialog = false;
    this.loading = false;
    this.submitted = false;
    this.loadTauxChanges();
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

  editTauxChange(data: any): void {
    this.tauxChange = { ...data };
    
    // Find the matching devise object from the devises array
    const selectedDevise = this.devises.find(d => d.id === data.deviseId);
    
    this.formGroup.patchValue({
      deviseReference: this.deviseReference.code,
      deviseConversion: selectedDevise,
      uniteReference: data.uniteReference,
      tauxChange: data.taux,
    });
    
    this.dialog = true;
    this.submitted = false;
  }

  deleteTauxChange(data: any): void {
    this.tauxChange = { ...data };
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
        detail: 'ID du taux de change invalide',
      });
      return;
    }
    
    this.loading = true;
    this.tauxChangeService.deleteTauxChange(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression',
          detail: 'Taux de change supprimé avec succès',
          life: 3000
        });
        this.deleteDialog = false;
        this.tauxChange = {};
        this.loadTauxChanges();
      },
      error: (error) => {
        console.error('Error deleting taux de change:', error);
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
    return !!(control && control.invalid && (control.dirty || control.touched || this.submitted));
  }

  getErrorMessage(field: string): string {
    const control = this.formGroup.get(field);
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (control?.hasError('min')) {
      return 'La valeur doit être positive';
    }
    return '';
  }

  private validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
}