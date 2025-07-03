import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../../../core/services/breadcrumb.service';
import { SousTypeHebergementService } from '../../services/sous-type-hebergement.service';

@Component({
  selector: 'app-sous-type-hebergement',
  templateUrl: './sous-type-hebergement.component.html',
  styleUrl: './sous-type-hebergement.component.scss',
})
export class SousTypeHebergementComponent implements OnInit {
  dialog: boolean = false;
  deleteDialog: boolean = false;
  formGroup!: FormGroup;

  iconList: string[] = [
    // 🏡 Types d'hébergement
    'house',
    'home',
    'apartment',
    'villa',
    'cottage',
    'cabin',
    'hotel',
    'chalet',
    'bungalow',

    // 🏢 Types commerciaux
    'business',
    'storefront',
    'warehouse',
    'factory',
    'shop',
    'restaurant',
    'hotel_class',

    // 🏖️ Hébergements de vacances
    'beach_access',
    'holiday_village',
    'umbrella',
    'sunny',
    'waves',
    'sailing',
    'surfing',
    'pool',
    'hot_tub',
    'spa',
    'golf_course',

    // 🏞️ Nature et extérieur
    'forest',
    'nature',
    'deck',
    'balcony',
    'yard',
    'support_agent',
    'meeting_room',
  ];

  filteredIcons: string[] = [...this.iconList];
  sousTypes: any[] = [];
  filteredSousTypes: any[] = [];
  sousType: any = {};
  loading: boolean = false;
  submitted: boolean = false;
  searchText: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private sousTypeService: SousTypeHebergementService,
    private messageService: MessageService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Élément de base' },
      {
        label: "Sous-Types d'Hébergement",
        routerLink: ['/files/sous-types-hebergement'],
      },
    ]);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadSousTypes();
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
      icon: new FormControl('', Validators.required),
      searchIcon: new FormControl(''),
    });
  }

  loadSousTypes(): void {
    this.loading = true;
    this.sousTypeService.getSousTypeHebergements().subscribe({
      next: (response) => {
        this.sousTypes = response;
        this.filteredSousTypes = [...this.sousTypes];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading sous-types:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de charger les sous-types d'hébergement",
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.dialog = true;
    this.formGroup.reset();
    this.sousType = {};
    this.submitted = false;
    this.filteredIcons = [...this.iconList];
  }

  saveSousType(): void {
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

    const sousTypeData: Omit<any, 'id'> = {
      name: this.formGroup.get('name')!.value,
      description: this.formGroup.get('description')!.value,
      icon: this.formGroup.get('icon')!.value,
    };

    this.loading = true;

    if (this.sousType.id) {
      // Update existing sous-type
      this.sousTypeService
        .updateSousTypeHebergement(this.sousType.id, sousTypeData)
        .subscribe({
          next: () => {
            this.handleSuccess("Sous-type d'hébergement modifié avec succès");
          },
          error: (error) => {
            this.handleError(error, 'Échec lors de la modification');
          },
        });
    } else {
      // Create new sous-type
      this.sousTypeService.createSousTypeHebergement(sousTypeData).subscribe({
        next: () => {
          this.handleSuccess("Sous-type d'hébergement ajouté avec succès");
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
    this.loadSousTypes();
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

  selectIcon(icon: string): void {
    this.sousType.icon = icon;
    this.formGroup.get('icon')?.setValue(icon);
    this.formGroup.get('icon')?.markAsTouched();
  }

  filterIcons(): void {
    const searchValue =
      this.formGroup.get('searchIcon')?.value?.toLowerCase() || '';
    this.filteredIcons = this.iconList.filter((icon) =>
      icon.toLowerCase().includes(searchValue)
    );
  }

  filterSousTypes(): void {
    if (!this.searchText.trim()) {
      this.filteredSousTypes = [...this.sousTypes];
      return;
    }

    const search = this.searchText.toLowerCase();
    this.filteredSousTypes = this.sousTypes.filter(
      (sousType) =>
        sousType.name.toLowerCase().includes(search) ||
        sousType.description.toLowerCase().includes(search) ||
        sousType.icon.toLowerCase().includes(search)
    );
  }

  editSousType(data: any): void {
    this.sousType = { ...data };
    this.formGroup.patchValue({
      name: data.name,
      description: data.description,
      icon: data.icon,
      searchIcon: data.icon,
    });
    this.dialog = true;
    this.submitted = false;
    this.filterIcons();
  }

  deleteSousType(data: any): void {
    this.sousType = { ...data };
    this.deleteDialog = true;
  }

  annuler(): void {
    this.dialog = false;
    this.submitted = false;
  }

  cancelDelete(): void {
    this.deleteDialog = false;
  }

  confirmDelete(id: number): void {
    if (!id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'ID de sous-type invalide',
      });
      return;
    }

    this.loading = true;
    this.sousTypeService.deleteSousTypeHebergement(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression',
          detail: "Sous-type d'hébergement supprimé avec succès",
          life: 3000,
        });
        this.deleteDialog = false;
        this.sousType = {};
        this.loadSousTypes();
      },
      error: (error) => {
        console.error('Error deleting sous-type:', error);
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
