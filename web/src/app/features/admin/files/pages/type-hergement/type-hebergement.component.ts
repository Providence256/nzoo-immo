import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from '../../../../../core/services/breadcrumb.service';
import { TypeHebergementService } from '../../services/type-hebergement.service';

@Component({
  selector: 'app-type-hebergement',
  templateUrl: './type-hebergement.component.html',
})
export class TypeHebergementComponent implements OnInit {
  dialog: boolean = false;
  deleteDialog: boolean = false;

  formGroup!: FormGroup;

  typeHebergements: any[] = [];
  typeHebergement: any = {};
  selectedTypeHebergement: any = null;

  sousTypeHebergements: any[] = [];
  sousTypeHebergement: any = {};

  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private typeHebergementService: TypeHebergementService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Élément de base' },
      { label: 'Type hebergement', routerLink: ['/files/type-hebergements'] },
    ]);
  }

  iconList: string[] = [
    // 🏡 Property & Listings
    'house',
    'apartment',
    'villa',
    'home_work',
    'holiday_village',
    'location_city',
    'maps_home_work',
    'domain',
    'storefront',
    'business',

    // 🛏️ Amenities & Features
    'king_bed',
    'single_bed',
    'bed',
    'bathtub',
    'shower',
    'hot_tub',
    'pool',
    'ac_unit',
    'wifi',
    'tv',
    'fireplace',
    'smoke_free',
    'pets',
    'local_laundry_service',
    'local_parking',
    'security',
    'kitchen',
    'flatware',

    // 📍 Location & Travel
    'location_on',
    'place',
    'map',
    'public',
    'near_me',
    'explore',
    'flight',
    'train',
    'directions_bus',
    'directions_car',
    'directions_boat',
    'hiking',
    'beach_access',
    'local_airport',

    // 📅 Booking & Scheduling
    'event',
    'calendar_today',
    'date_range',
    'schedule',
    'alarm',
    'access_time',
    'pending',
    'watch_later',

    // 💰 Pricing & Payments
    'attach_money',
    'credit_card',
    'payment',
    'account_balance_wallet',
    'monetization_on',
    'receipt',
    'redeem',
    'price_check',
    'request_quote',

    // 👤 Users & Profiles
    'person',
    'person_outline',
    'people',
    'group',
    'account_circle',
    'face',
    'admin_panel_settings',
    'supervisor_account',
    'support_agent',

    // 💬 Messaging & Reviews
    'chat',
    'comment',
    'rate_review',
    'star',
    'stars',
    'feedback',
    'question_answer',
    'help',

    // ⚙️ Settings & Navigation
    'settings',
    'tune',
    'dashboard',
    'menu',
    'apps',
    'widgets',
    'more_horiz',
    'more_vert',

    // 🔒 Security & Authentication
    'lock',
    'lock_open',
    'verified_user',
    'fingerprint',
    'shield',
    'vpn_key',
    'password',
  ];

  filteredIcons: string[] = [...this.iconList];

  ngOnInit(): void {
    this.initForm();
    this.loadSousTypeHebergements();
    this.loadTypeHebergements();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      icon: ['', Validators.required],
      sousTypes: [[], []],
      searchIcon: new FormControl(''),
    });
  }

  loadSousTypeHebergements(): void {
    this.loading = true;
    this.typeHebergementService.getAllSousTypes().subscribe({
      next: (response) => {
        this.sousTypeHebergements = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading sous type hebergements:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de charger les sous types d'hébergement",
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  getSousTypeById(id: number) {
    this.loading = true;
    this.typeHebergementService.getSousType(id).subscribe({
      next: (response) => {
        // this.sousTypeHebergement = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading sous type hebergements:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de charger les sous types d'hébergement",
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  loadTypeHebergements(): void {
    this.loading = true;
    this.typeHebergementService.getTypeHebergements().subscribe({
      next: (response) => {
        this.typeHebergements = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading type hebergements:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de charger les types d'hébergement",
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.dialog = true;
    this.formGroup.reset();
    this.typeHebergement = {};
    this.submitted = false;
  }

  addTypeHebergement(): void {
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

    const formValue = this.formGroup.value;

    const typeHebergementData = {
      id: this.typeHebergement.id || null,
      code: formValue.code,
      designation: formValue.designation,
      icon: formValue.icon,
      sousTypeIds: formValue.sousTypes || [],
    };

    this.loading = true;

    console.log('Submitting type hebergement data:', typeHebergementData);

    if (this.typeHebergement.id) {
      // Update existing type hebergement
      this.typeHebergementService
        .updateTypeHebergement(this.typeHebergement.id, typeHebergementData)
        .subscribe({
          next: () => {
            this.handleSuccess("Type d'hébergement modifié avec succès");
          },
          error: (error) => {
            this.handleError(error, 'Échec lors de la modification');
          },
        });
    } else {
      // Create new type hebergement
      this.typeHebergementService
        .createTypeHebergement(typeHebergementData)
        .subscribe({
          next: () => {
            this.handleSuccess("Type d'hébergement ajouté avec succès");
          },
          error: (error) => {
            this.handleError(error, "Échec lors de l'ajout");
          },
        });
    }
  }

  selectIcon(icon: string): void {
    this.typeHebergement.icon = icon;
    this.formGroup.get('icon')?.setValue(icon);
    this.formGroup.get('icon')?.markAsTouched();
  }

  filterIcons(): void {
    const searchValue = this.formGroup.get('searchIcon')?.value.toLowerCase();
    this.filteredIcons = this.iconList.filter((icon) =>
      icon.toLowerCase().includes(searchValue)
    );
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
    this.loadTypeHebergements();
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

  editType(data: any): void {
    this.typeHebergement = { ...data };
    this.formGroup.patchValue({
      code: data.code,
      designation: data.designation,
    });
    this.dialog = true;
    this.submitted = false;
  }

  deleteType(data: any): void {
    this.typeHebergement = { ...data };
    this.deleteDialog = true;
  }

  confirmDelete(id: any): void {
    if (!id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: "ID du type d'hébergement invalide",
      });
      return;
    }

    this.loading = true;
    this.typeHebergementService.deleteTypeHebergement(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression',
          detail: "Type d'hébergement supprimé avec succès",
          life: 3000,
        });
        this.deleteDialog = false;
        this.typeHebergement = {};
        this.loadTypeHebergements();
      },
      error: (error) => {
        console.error('Error deleting type hebergement:', error);
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
