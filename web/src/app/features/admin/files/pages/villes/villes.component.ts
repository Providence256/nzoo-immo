import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";
import { VilleService } from "../../services/ville.service";

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
})
export class VillesComponent implements OnInit {
  dialog: boolean = false;
  deleteDialog: boolean = false;
  formGroup!: FormGroup;
  villeImage: string | ArrayBuffer | null = null;
  villes: any[] = [];
  ville: any = {};
  imageFile: File | null = null;
  loading: boolean = false;
  submitted: boolean = false;
  imageChanged: boolean = false; // Track if image was changed during edit

  constructor(
    private breadcrumbService: BreadcrumbService,
    private villeService: VilleService,
    private messageService: MessageService,
  ) {
    this.breadcrumbService.setItems([
      { label: 'Élément de base' },
      { label: 'Villes', routerLink: ['/files/villes'] },
    ]);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadVilles();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    });
  }

  loadVilles(): void {
    this.loading = true;
    this.villeService.getVilles().subscribe({
      next: (response) => {
        this.villes = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading villes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les villes',
          life: 3000
        });
        this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.dialog = true;
    this.formGroup.reset();
    this.villeImage = null;
    this.imageFile = null;
    this.ville = {};
    this.submitted = false;
    this.imageChanged = false;
  }

  addVille(): void {
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
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('code', this.formGroup.get('code')!.value);
    formData.append('designation', this.formGroup.get('designation')!.value);
    formData.append('description', this.formGroup.get('description')!.value);
    
    // If updating and image not changed, add a flag to backend
    if (this.ville.id && !this.imageChanged) {
      formData.append('keepExistingImage', 'true');
    } else if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.loading = true;
    
    if (this.ville.id) {
      // Update existing ville
      this.villeService.updateVille(this.ville.id, formData).subscribe({
        next: () => {
          this.handleSuccess('Ville modifiée avec succès');
        },
        error: (error) => {
          this.handleError(error, 'Échec lors de la modification');
        }
      });
    } else {
      // Create new ville
      this.villeService.createVille(formData).subscribe({
        next: () => {
          this.handleSuccess('Ville ajoutée avec succès');
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
    this.loadVilles();
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

  editVille(data: any): void {
    this.ville = { ...data };
    this.formGroup.patchValue({
      code: data.code,
      designation: data.designation,
      description: data.description,
    });
    this.villeImage = data.imageUrl;
    this.dialog = true;
    this.submitted = false;
    this.imageChanged = false; // Reset image changed flag
  }

  deleteVille(data: any): void {
    this.ville = { ...data };
    this.deleteDialog = true;
  }

  annuler(): void {
    this.dialog = false;
    this.submitted = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Format d\'image non supporté. Veuillez utiliser JPG, PNG, GIF ou WEBP.',
        });
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'L\'image est trop volumineuse. Taille maximale: 5MB.',
        });
        return;
      }
      
      this.imageFile = file;
      this.imageChanged = true; // Mark that image was changed
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.villeImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.villeImage = null;
    this.imageFile = null;
    this.imageChanged = true; // Mark that image was changed
  }

  cancelDelete(): void {
    this.deleteDialog = false;
  }

  confirmDelete(id: any): void {
    if (!id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'ID de ville invalide',
      });
      return;
    }
    
    this.loading = true;
    this.villeService.deleteVille(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression',
          detail: 'Ville supprimée avec succès',
          life: 3000
        });
        this.deleteDialog = false;
        this.ville = {};
        this.loadVilles();
      },
      error: (error) => {
        console.error('Error deleting ville:', error);
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