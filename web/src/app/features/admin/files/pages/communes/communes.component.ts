import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";
import { CommuneService } from "../../services/commune.service";
import { VilleService } from "../../services/ville.service";

@Component({
  selector: 'app-communes',
  templateUrl: './communes.component.html',
})
export class CommunesComponent implements OnInit {
  dialog: boolean = false;
  deleteDialog: boolean = false;
  formGroup!: FormGroup;
  communes: any[] = [];
  villes: any[] = [];
  commune: any = {};
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private communeService: CommuneService,
    private villeService: VilleService,
    private messageService: MessageService,
  ) {
    this.breadcrumbService.setItems([
      { label: 'Élément de base' },
      { label: 'Communes', routerLink: ['/files/communes'] },
    ]);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadCommunes();
    this.loadVilles();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      ville: new FormControl('', [Validators.required]),
    });
  }

  loadCommunes(): void {
    this.loading = true;
    this.communeService.getCommunes().subscribe({
      next: (response) => {
        this.communes = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading communes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les communes',
          life: 3000
        });
        this.loading = false;
      },
    });
  }

  loadVilles(): void {
    this.villeService.getVilles().subscribe({
      next: (response) => {
        this.villes = response;
      },
      error: (error) => {
        console.error('Error loading villes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les villes',
          life: 3000
        });
      },
    });
  }

  openDialog(): void {
    this.dialog = true;
    this.formGroup.reset();
    this.commune = {};
    this.submitted = false;
  }

  saveCommune(): void {
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
    
    // Create FormData for submission
    const request = {
        code: this.formGroup.get('code')!.value,
        villeId: this.formGroup.get('ville')!.value.id,
        designation: this.formGroup.get('designation')!.value,
    };
   
    this.loading = true;
    
    if (this.commune.id) {
      // Update existing commune
      this.communeService.updateCommune(this.commune.id, request).subscribe({
        next: () => {
          this.handleSuccess('Commune modifiée avec succès');
        },
        error: (error) => {
          this.handleError(error, 'Échec lors de la modification');
        }
      });
    } else {
      // Create new commune
      this.communeService.createCommune(request).subscribe({
        next: () => {
          this.handleSuccess('Commune ajoutée avec succès');
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
    this.loadCommunes();
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

  editCommune(data: any): void {
    this.commune = { ...data };
    this.formGroup.patchValue({
      code: data.code,
      designation: data.designation,
      ville: data.ville
    });
    this.dialog = true;
    this.submitted = false;
  }

  deleteCommune(data: any): void {
    this.commune = { ...data };
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
        detail: 'ID de commune invalide',
      });
      return;
    }
    
    this.loading = true;
    this.communeService.deleteCommune(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression',
          detail: 'Commune supprimée avec succès',
          life: 3000
        });
        this.deleteDialog = false;
        this.commune = {};
        this.loadCommunes();
      },
      error: (error) => {
        console.error('Error deleting commune:', error);
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
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Maximum ${maxLength} caractères`;
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