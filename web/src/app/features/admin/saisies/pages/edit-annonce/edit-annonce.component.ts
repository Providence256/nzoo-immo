import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { id } from 'date-fns/locale';
import { MessageService } from 'primeng/api';

interface Rule {
  id: number;
  name: string;
  description: string;
  icon: string;
  active: boolean;
}

interface CancellationPolicy {
  id: string;
  name: string;
  description: string;
  refundPercentage: number;
  timeLimit: string;
  recommended?: boolean;
}

interface ReservationSetting {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'toggle' | 'select' | 'number';
  value: any;
  options?: any[];
}

@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
})
export class EditAnnonceComponent implements OnInit {
  activeSection = 'photos';
  listingForm: FormGroup;
  isLoading = false;
  showMobileMenu = false;
  photos: any[] = [];
  isSavingDraft = false;
  villes: any[] = [];
  communes: any[] = [];

  types: any[] = [
    { id: 1, designation: 'Appartement' },
    { id: 2, designation: 'Maison' },
    { id: 3, designation: 'Chalet' },
    { id: 4, designation: 'Villa' },
    { id: 5, designation: 'Studio' },
  ];

  // Menu sections
  sections = [
    { id: 'photos', label: 'Photos', icon: 'pi pi-images' },
    { id: 'type', label: 'Type de logement', icon: 'pi pi-home' },
    { id: 'pricing', label: 'Tarification', icon: 'pi pi-dollar' },
    { id: 'availability', label: 'Disponibilité', icon: 'pi pi-calendar' },
    { id: 'guest', label: 'Nombre des Visiteurs', icon: 'pi pi-users' },
    { id: 'basic', label: 'Informations de base', icon: 'pi pi-info-circle' },
    { id: 'amenities', label: 'Équipements', icon: 'pi pi-star' },
    { id: 'location', label: 'Locations', icon: 'pi pi-globe' },
    { id: 'reservation', label: 'Réservation', icon: 'pi pi-cog' },
    { id: 'rules', label: 'Règles de la maison', icon: 'pi pi-shield' },
    { id: 'cancellation', label: 'Annulation', icon: 'pi pi-calendar-times' },
  ];

  // House rules
  houseRules: Rule[] = [
    {
      id: 1,
      name: 'Animaux autorisés',
      description: 'Les voyageurs peuvent amener leurs animaux',
      icon: 'pi pi-heart',
      active: false,
    },
    {
      id: 2,
      name: 'Pas de tabac',
      description: 'Interdiction de fumer dans le logement',
      icon: 'pi pi-ban',
      active: true,
    },
    {
      id: 3,
      name: 'Pas de fêtes',
      description: 'Événements et fêtes non autorisés',
      icon: 'pi pi-volume-off',
      active: true,
    },
    {
      id: 4,
      name: 'Enfants bienvenus',
      description: 'Logement adapté aux enfants',
      icon: 'pi pi-users',
      active: true,
    },
    {
      id: 5,
      name: 'Heures calmes',
      description: 'Respecter le calme après 22h',
      icon: 'pi pi-clock',
      active: true,
    },
  ];

  // Cancellation policies
  cancellationPolicies: CancellationPolicy[] = [
    {
      id: 'flexible',
      name: 'Flexible',
      description: "Remboursement intégral jusqu'à 24h avant l'arrivée",
      refundPercentage: 100,
      timeLimit: '24 heures',
      recommended: true,
    },
    {
      id: 'moderate',
      name: 'Modérée',
      description: "Remboursement intégral jusqu'à 5 jours avant l'arrivée",
      refundPercentage: 50,
      timeLimit: '5 jours',
    },
    {
      id: 'strict',
      name: 'Stricte',
      description: "Remboursement de 50% jusqu'à 7 jours avant l'arrivée",
      refundPercentage: 50,
      timeLimit: '7 jours',
    },
  ];

  // Reservation settings
  reservationSettings: ReservationSetting[] = [
    {
      id: 'instantBook',
      name: 'Réservation instantanée',
      description: 'Les voyageurs peuvent réserver sans votre approbation',
      icon: 'pi pi-bolt',
      type: 'toggle',
      value: false,
    },
    {
      id: 'minStay',
      name: 'Séjour minimum',
      description: 'Nombre minimum de nuits',
      icon: 'pi pi-calendar',
      type: 'number',
      value: 1,
    },
    {
      id: 'maxStay',
      name: 'Séjour maximum',
      description: 'Nombre maximum de nuits',
      icon: 'pi pi-calendar-plus',
      type: 'number',
      value: 30,
    },
    {
      id: 'advanceNotice',
      name: 'Préavis de réservation',
      description: "Délai minimum avant l'arrivée",
      icon: 'pi pi-clock',
      type: 'select',
      value: 'same_day',
      options: [
        { label: 'Le jour même', value: 'same_day' },
        { label: '1 jour', value: '1_day' },
        { label: '2 jours', value: '2_days' },
        { label: '3 jours', value: '3_days' },
        { label: '7 jours', value: '7_days' },
      ],
    },
    {
      id: 'preparationTime',
      name: 'Temps de préparation',
      description: 'Délai entre les réservations',
      icon: 'pi pi-refresh',
      type: 'select',
      value: 'none',
      options: [
        { label: 'Aucun', value: 'none' },
        { label: '1 jour', value: '1_day' },
        { label: '2 jours', value: '2_days' },
        { label: '3 jours', value: '3_days' },
      ],
    },
  ];

  amenities = [
    { id: 1, name: 'WiFi', icon: 'pi pi-wifi', selected: true },
    { id: 2, name: 'Cuisine', icon: 'pi pi-home', selected: true },
    { id: 3, name: 'Climatisation', icon: 'pi pi-sun', selected: false },
    { id: 4, name: 'Chauffage', icon: 'pi pi-fire', selected: true },
    { id: 5, name: 'Télévision', icon: 'pi pi-desktop', selected: true },
    { id: 6, name: 'Parking', icon: 'pi pi-car', selected: false },
    { id: 7, name: 'Piscine', icon: 'pi pi-circle', selected: false },
    { id: 8, name: 'Jacuzzi', icon: 'pi pi-circle-fill', selected: false },
  ];

  advanceNoticeOptions = [
    { label: 'Même jour', value: 'same_day' },
    { label: '1 jour', value: '1_day' },
    { label: '2 jours', value: '2_days' },
    { label: '3 jours', value: '3_days' },
    { label: '7 jours', value: '7_days' },
  ];

  preparationTimeOptions = [
    { label: 'Aucun', value: 'none' },
    { label: '1 jour', value: '1_day' },
    { label: '2 jours', value: '2_days' },
    { label: '3 jours', value: '3_days' },
  ];

  maxStayOptions = [
    { label: '1 nuit', value: 1 },
    { label: '3 nuits', value: 3 },
    { label: '7 nuits', value: 7 },
    { label: '14 nuits', value: 14 },
    { label: '28 nuits', value: 28 },
    { label: 'Pas de limite', value: 0 },
  ];

  minStayOptions = [
    { label: '1 nuit', value: 1 },
    { label: '2 nuits', value: 2 },
    { label: '3 nuits', value: 3 },
    { label: '7 nuits', value: 7 },
    { label: '14 nuits', value: 14 },
    { label: '28 nuits', value: 28 },
  ];

  bookingWindowOptions = [
    { label: '3 mois', value: '3_months' },
    { label: '6 mois', value: '6_months' },
    { label: '9 mois', value: '9_months' },
    { label: '12 mois', value: '12_months' },
    { label: 'Toujours disponible', value: 'always' },
  ];

  timeOptions = [
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
    { label: '19:00', value: '19:00' },
    { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' },
    { label: '22:00', value: '22:00' },
  ];

  disabledDates: Date[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.listingForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      price: [0, [Validators.required, Validators.min(1)]],
      guests: [1, [Validators.required, Validators.min(1)]],
      bedrooms: [1, [Validators.required, Validators.min(1)]],
      bathrooms: [1, [Validators.required, Validators.min(1)]],
      cancellationPolicy: ['flexible', Validators.required],
      checkInTime: ['15:00', Validators.required],
      checkOutTime: ['11:00', Validators.required],
    });
  }

  ngOnInit() {
    this.loadListingData();
  }

  loadListingData() {
    // Simulate loading existing listing data
    this.listingForm.patchValue({
      title: 'Appartement cosy au cœur de Paris',
      description:
        'Magnifique appartement situé dans le centre historique de Paris...',
      price: 89,
      guests: 4,
      bedrooms: 2,
      bathrooms: 1,
      cancellationPolicy: 'flexible',
      checkInTime: '15:00',
      checkOutTime: '11:00',
    });
  }

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  toggleRule(ruleId: number) {
    const rule = this.houseRules.find((r) => r.id === ruleId);
    if (rule) {
      rule.active = !rule.active;
    }
  }

  toggleMobileMenu() {}

  selectCancellationPolicy(policyId: string) {
    this.listingForm.patchValue({ cancellationPolicy: policyId });
  }

  calculateDiscountedPrice(type: 'weekly' | 'monthly'): number {
    const basePrice = this.listingForm.get('basePrice')?.value || 0;
    const discount = this.listingForm.get(`${type}Discount`)?.value || 0;
    return Math.round(basePrice * (1 - discount / 100) * 100) / 100;
  }

  updateReservationSetting(settingId: string, value: any) {
    const setting = this.reservationSettings.find((s) => s.id === settingId);
    if (setting) {
      setting.value = value;
    }
  }

  getAddressPreview(): string {
    const ville = this.villes.find(
      (v) => v.id === this.listingForm.get('ville')?.value
    )?.designation;
    const commune = this.communes.find(
      (c) => c.id === this.listingForm.get('commune')?.value
    )?.designation;
    const quartier = this.listingForm.get('quartier')?.value;
    const avenue = this.listingForm.get('avenue')?.value;
    const numero = this.listingForm.get('numero')?.value;

    const addressParts = [numero, avenue, quartier, commune, ville].filter(
      Boolean
    );
    return addressParts.join(', ');
  }

  updateLocationField(field: any, value: string): void {}

  updateRule(controlName: string, value: boolean): void {
    this.listingForm.get(controlName)?.setValue(value);

    // Reset maxPets when pets are not allowed
    if (controlName === 'petsAllowed' && !value) {
      this.listingForm.get('maxPets')?.setValue(null);
    }
  }

  toggleInstantBook(value: boolean): void {
    this.listingForm.get('instantBook')?.setValue(value);
  }

  updateBookingSetting(controlName: string, value: boolean): void {
    this.listingForm.get(controlName)?.setValue(value);
  }

  getTimeLabel(timeValue: string): string {
    const timeOption = this.timeOptions.find(
      (option) => option.value === timeValue
    );
    return timeOption ? timeOption.label : timeValue || '-';
  }

  toggleAmenity(amenityId: number) {
    const amenity = this.amenities.find((a) => a.id === amenityId);
    if (amenity) {
      amenity.selected = !amenity.selected;
    }
  }

  onSave() {
    if (this.listingForm.valid) {
      this.isLoading = true;

      const formData = {
        ...this.listingForm.value,
        houseRules: this.houseRules.filter((r) => r.active),
        amenities: this.amenities.filter((a) => a.selected),
        reservationSettings: this.reservationSettings.reduce((acc, setting) => {
          acc[setting.id] = setting.value;
          return acc;
        }, {} as any),
      };

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Annonce mise à jour avec succès',
        });
      }, 1500);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez corriger les erreurs dans le formulaire',
      });
    }
  }

  getCurrentStepNumber() {
    /* ... */
  }
  getCurrentSectionLabel() {
    /* ... */
  }
  getCompletionPercentage() {
    /* ... */
  }
  isFirstSection() {}
  isLastSection(): number {
    return this.sections.length;
  }
  nextSection(): void {}
  previousSection(): void {}
  saveDraft(): void {}

  previewListing() {
    window.open('/preview-listing', '_blank');
  }
}
