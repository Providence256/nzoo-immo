import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";
import { EquipementService } from "../../services/equipement.service";

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html'
})
export class EquipementsComponent implements OnInit {
  dialog: boolean = false;
  deleteDialog: boolean = false;
  formGroup!: FormGroup;
  
  iconList: string[] = [
    // 🏡 Property & Listings
    'house', 'apartment', 'villa', 'home_work', 'holiday_village', 
    'location_city', 'maps_home_work', 'domain', 'storefront', 'business',
  
    // 🛏️ Amenities & Features
    'king_bed', 'single_bed', 'bed', 'bathtub', 'shower', 'hot_tub',
    'pool', 'ac_unit', 'wifi', 'tv', 'fireplace', 'smoke_free', 'pets',
    'local_laundry_service', 'local_parking', 'security', 'kitchen','flatware',
  
    // 📍 Location & Travel
    'location_on', 'place', 'map', 'public', 'near_me', 'explore',
    'flight', 'train', 'directions_bus', 'directions_car', 'directions_boat',
    'hiking', 'beach_access', 'local_airport',
  
    // 📅 Booking & Scheduling
    'event', 'calendar_today', 'date_range', 'schedule', 'alarm', 
    'access_time', 'pending', 'watch_later',
  
    // 💰 Pricing & Payments
    'attach_money', 'credit_card', 'payment', 'account_balance_wallet',
    'monetization_on', 'receipt', 'redeem', 'price_check', 'request_quote',
  
    // 👤 Users & Profiles
    'person', 'person_outline', 'people', 'group', 'account_circle', 
    'face', 'admin_panel_settings', 'supervisor_account', 'support_agent',
  
    // 💬 Messaging & Reviews
    'chat', 'comment', 'rate_review', 'star', 'stars', 'feedback', 
    'question_answer', 'help',
  
    // ⚙️ Settings & Navigation
    'settings', 'tune', 'dashboard', 'menu', 'apps', 'widgets', 
    'more_horiz', 'more_vert',
  
    // 🔒 Security & Authentication
    'lock', 'lock_open', 'verified_user', 'fingerprint', 'shield', 
    'vpn_key', 'password'
  ];
  
  filteredIcons: string[] = [...this.iconList];
  equipements: any[] = [];
  filteredEquipements: any[] = [];
  equipement: any = {};
  loading: boolean = false;
  submitted: boolean = false;
  searchText: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private equipementService: EquipementService,
    private messageService: MessageService,
  ){
    this.breadcrumbService.setItems([
      {label: 'Élément de base'},
      { label: 'Equipements', routerLink: ['/files/equipements'] },
    ]);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadEquipements();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      icon: new FormControl('', Validators.required),
      searchIcon: new FormControl(''),
    });
  }

  loadEquipements(): void {
    this.loading = true;
    this.equipementService.getEquipements().subscribe({
      next: (response) => {
        this.equipements = response;
        this.filteredEquipements = [...this.equipements];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading equipements:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les équipements',
          life: 3000
        });
        this.loading = false;
      },
    });
  }

  openDialog(): void {
    this.dialog = true;
    this.formGroup.reset();
    this.equipement = {};
    this.submitted = false;
    this.filteredIcons = [...this.iconList];
  }

  saveEquipement(): void {
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
    
    const equipementData = {
      code: this.formGroup.get('code')!.value,
      designation: this.formGroup.get('designation')!.value,
      icon: this.formGroup.get('icon')!.value
    };

    this.loading = true;
    
    if (this.equipement.id) {
      // Update existing equipement
      this.equipementService.updateEquipement(this.equipement.id, equipementData).subscribe({
        next: () => {
          this.handleSuccess('Équipement modifié avec succès');
        },
        error: (error) => {
          this.handleError(error, 'Échec lors de la modification');
        }
      });
    } else {
      // Create new equipement
      this.equipementService.createEquipement(equipementData).subscribe({
        next: () => {
          this.handleSuccess('Équipement ajouté avec succès');
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
    this.loadEquipements();
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
    this.equipement.icon = icon;
    this.formGroup.get('icon')?.setValue(icon);
    this.formGroup.get('icon')?.markAsTouched();
  }

  filterIcons(): void {
    const searchValue = this.formGroup.get('searchIcon')?.value.toLowerCase();
    this.filteredIcons = this.iconList.filter(icon => 
      icon.toLowerCase().includes(searchValue)
    );
  }

  filterEquipements(): void {
    if (!this.searchText.trim()) {
      this.filteredEquipements = [...this.equipements];
      return;
    }
    
    const search = this.searchText.toLowerCase();
    this.filteredEquipements = this.equipements.filter(equipement => 
      equipement.code.toLowerCase().includes(search) ||
      equipement.designation.toLowerCase().includes(search) ||
      equipement.icon.toLowerCase().includes(search)
    );
  }

  editEquipement(data: any): void {
    this.equipement = { ...data };
    this.formGroup.patchValue({
      code: data.code,
      designation: data.designation,
      icon: data.icon,
      searchIcon: data.icon
    });
    this.dialog = true;
    this.submitted = false;
    this.filterIcons();
  }

  deleteEquipement(data: any): void {
    this.equipement = { ...data };
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
        detail: 'ID d\'équipement invalide',
      });
      return;
    }
    
    this.loading = true;
    this.equipementService.deleteEquipement(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression',
          detail: 'Équipement supprimé avec succès',
          life: 3000
        });
        this.deleteDialog = false;
        this.equipement = {};
        this.loadEquipements();
      },
      error: (error) => {
        console.error('Error deleting equipement:', error);
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