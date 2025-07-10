import { Component, OnInit } from '@angular/core';
import { is, th } from 'date-fns/locale';
import { PhotoFile } from '../../services/photo-upload.service';
import { AnnoncesService } from '../../services/annonces.service';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  ListingBathroomTypeRequest,
  ListingRequest,
} from '../../../../../core/models/listing-request.model';

interface FormData {
  propertyType: string;
  location: {
    ville: string;
    commune: string;
    quartier: string;
    avenue: string;
    numero: string;
  };
  guests: number;
  bedrooms: number;
  bathrooms: number;
  bathroomTypes: BathroomInfo[];
  amenities: string[];
  propertyFeature: string;
  whoElseOnSite: string;
  propertyDescription: string;
  title: string;
  description: string;
  photos: string[];
  price: string;
  devise: string;
  selectedDiscounts: string[];
}

interface BathroomInfo {
  id: number;
  type: string;
}

interface Discount {
  id: string;
  name: string;
  description: string;
  percentage: number;
}

@Component({
  selector: 'app-new-annonce',
  templateUrl: './new-annonce.component.html',
  styleUrls: ['./new-annonce.component.scss'],
})
export class NewAnnonceComponent implements OnInit {
  currentStep = 0;
  photosValid = false;
  uploadedPhotos: PhotoFile[] = [];
  photoFiles: File[] = [];
  isSubmitting = false;

  villes: any[] = [];
  communes: any[] = [];
  propertyTypes: any[] = [];
  devises: any[] = [];
  whoElseOptions: any[] = [];
  bathroomTypes: any[] = [];
  propertyFeatures: any[] = [];
  amenitiesList: any[] = [];

  formData: FormData = {
    propertyType: '',
    location: {
      ville: '',
      commune: '',
      quartier: '',
      avenue: '',
      numero: '',
    },
    guests: 1,
    bedrooms: 1,
    bathrooms: 0,
    bathroomTypes: [],
    amenities: [],
    propertyFeature: '',
    whoElseOnSite: '',
    propertyDescription: '',
    title: '',
    description: '',
    photos: [],
    price: '',
    devise: '',
    selectedDiscounts: [],
  };

  steps = [
    'Type de propriété',
    'sous-type',
    'Localisation',
    'Capacité',
    'Salles de bain',
    "Qui d'autre sur place",
    'Équipements',
    'Photos',
    'Titre et description',
    'Prix',
    'Reduction',
  ];

  discountsList: any[] = [];

  constructor(
    private service: AnnoncesService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.findAllTypes().subscribe({
      next: (response) => (this.propertyTypes = response),
      error: (err) => this.handleError(err),
    });

    this.service.findAllVilles().subscribe({
      next: (response) => (this.villes = response),
      error: (err) => this.handleError(err),
    });

    this.service.findAllDevises().subscribe({
      next: (response) => (this.devises = response),
      error: (err) => this.handleError(err),
    });

    this.service.findBathroomTypes().subscribe({
      next: (response) => {
        this.bathroomTypes = response;
      },
      error: (err) => this.handleError(err),
    });

    this.service.findAllOnSites().subscribe({
      next: (response) => {
        this.whoElseOptions = response;
      },
      error: (err) => this.handleError(err),
    });

    this.service.findAllEquipements().subscribe({
      next: (response) => {
        this.amenitiesList = response;
      },
      error: (err) => this.handleError(err),
    });

    this.service.findAllDiscounts().subscribe({
      next: (response) => {
        this.discountsList = response;
      },
      error: (err) => this.handleError(err),
    });
  }

  loadCommuneByVille() {
    const villeId = this.formData.location.ville;

    if (!villeId) {
      this.communes = [];
      return;
    }

    this.service.getAllCommunesByVille(parseInt(villeId)).subscribe({
      next: (response) => (this.communes = response),
      error: (err) => this.handleError(err),
    });
  }

  handleTypeSelection(typeId: string): void {
    this.updateFormData('propertyType', typeId);
    this.loadSousTypeByType(parseInt(typeId));
  }

  loadSousTypeByType(typeId: number): void {
    this.service.findSousTypeByType(typeId).subscribe({
      next: (response) => {
        this.propertyFeatures = response;
        console.log('Sous-types chargés:', this.propertyFeatures);
      },
      error: (err) => this.handleError(err),
    });
  }

  // Communes disponibles selon la ville sélectionnée
  get availableCommunes(): any[] {
    const selectedVille = this.villes.find(
      (v) => v.id === this.formData.location.ville
    );
    return selectedVille ? selectedVille.communes : [];
  }

  handleNext(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.submitForm();
    }
  }

  handlePrevious(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  updateFormData(field: keyof FormData, value: any): void {
    this.formData = { ...this.formData, [field]: value };
  }

  updateLocationField(field: keyof FormData['location'], value: string): void {
    this.formData.location = { ...this.formData.location, [field]: value };
    // Reset commune when ville changes
    if (field === 'ville') {
      this.loadCommuneByVille();
    }
  }

  incrementField(field: 'guests' | 'bedrooms' | 'bathrooms'): void {
    this.formData[field]++;
  }

  decrementField(field: 'guests' | 'bedrooms' | 'bathrooms'): void {
    if (this.formData[field] > 1) {
      this.formData[field]--;
    }
  }

  getBathroomTypeCount(type: any): number {
    return this.formData.bathroomTypes.filter((bt) => bt.type === type).length;
  }

  incrementBathroomType(type: string): void {
    const newId =
      Math.max(...this.formData.bathroomTypes.map((bt) => bt.id), 0) + 1;
    this.formData.bathroomTypes.push({
      id: newId,
      type: type,
    });
  }

  decrementBathroomType(type: string): void {
    const index = this.formData.bathroomTypes.findIndex(
      (bt) => bt.type === type
    );
    if (index > -1) {
      this.formData.bathroomTypes.splice(index, 1);
      this.formData.bathroomTypes.forEach((bt, i) => {
        bt.id = i + 1;
      });
    }
  }

  canDecrementBathroomType(
    type: 'private-attached' | 'private' | 'shared'
  ): boolean {
    return this.getBathroomTypeCount(type) > 0;
  }

  canIncrementBathroomType(
    type: 'private-attached' | 'private' | 'shared'
  ): boolean {
    return this.formData.bathroomTypes.length < this.formData.bathrooms;
  }

  toggleAmenity(amenityId: string): void {
    const currentAmenities = this.formData.amenities;
    const index = currentAmenities.indexOf(amenityId);

    if (index > -1) {
      this.formData.amenities = currentAmenities.filter(
        (id) => id !== amenityId
      );
    } else {
      this.formData.amenities = [...currentAmenities, amenityId];
    }
  }

  isAmenitySelected(amenityId: string): boolean {
    return this.formData.amenities.includes(amenityId);
  }

  isPropertyFeatureSelected(featureId: string): boolean {
    return this.formData.propertyFeature.includes(featureId);
  }

  getBathroomTypeName(type: any): string {
    const bathroomType = this.bathroomTypes.find((bt) => bt.id === type);
    return bathroomType ? bathroomType.type : '';
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.formData.propertyType !== '';
      case 1:
        return this.formData.propertyFeature !== '';
      case 2:
        return (
          this.formData.location.ville !== '' &&
          this.formData.location.commune !== '' &&
          this.formData.location.quartier.trim() !== '' &&
          this.formData.location.avenue.trim() !== '' &&
          this.formData.location.numero.trim() !== ''
        );
      case 3:
        return (
          this.formData.guests >= 1 &&
          this.formData.bedrooms >= 1 &&
          this.formData.bathrooms >= 1
        );
      case 4:
        return true;
      case 5:
        return this.formData.whoElseOnSite !== '';
      case 6:
        return true;
      case 7:
        return this.photosValid && this.uploadedPhotos.length >= 5;
      case 8:
        return (
          this.formData.title.trim() !== '' &&
          this.formData.description.trim() !== ''
        );
      case 9:
        return (
          this.formData.price !== '' && parseFloat(this.formData.price) > 0
        );
      case 10:
        return true;
      default:
        return false;
    }
  }

  handlePhotosChange(photos: PhotoFile[]): void {
    this.uploadedPhotos = photos;
    this.formData.photos = photos.map((photo) => photo.id);
    this.photoFiles = photos
      .map((photo) => photo.file)
      .filter((file) => file !== undefined);
    this.photosValid = photos.length >= 5;
    this.handlePhotosValidation(this.photosValid);
  }

  handlePhotosValidation(isValid: boolean): void {
    this.photosValid = isValid;
  }

  toggleDiscount(discountId: string): void {
    const index = this.formData.selectedDiscounts.indexOf(discountId);
    if (index > -1) {
      this.formData.selectedDiscounts.splice(index, 1);
    } else {
      this.formData.selectedDiscounts.push(discountId);
    }
  }

  // Méthode pour vérifier si une réduction est sélectionnée
  isDiscountSelected(discountId: string): boolean {
    return this.formData.selectedDiscounts.includes(discountId);
  }

  // Méthode pour obtenir les réductions sélectionnées
  getSelectedDiscounts(): Discount[] {
    return this.discountsList.filter((discount) =>
      this.formData.selectedDiscounts.includes(discount.id)
    );
  }

  submitForm(): void {
    this.isSubmitting = true;

    const formData = new FormData();

    // Add basic fields
    formData.append('typeHebergementId', this.formData.propertyType);
    formData.append('sousTypeHebergementId', this.formData.propertyFeature);
    formData.append('nbreVisiteurs', this.formData.guests.toString());
    formData.append('nbreChambres', this.formData.bedrooms.toString());
    formData.append('nbreLits', this.formData.bathrooms.toString());
    formData.append('title', this.formData.title);
    formData.append('description', this.formData.description);

    // Add optional whoElseOnSite
    if (this.formData.whoElseOnSite) {
      formData.append('whoElseOnSite', this.formData.whoElseOnSite);
    }

    // Add location fields
    formData.append('villeId', this.formData.location.ville);
    formData.append('communeId', this.formData.location.commune);
    formData.append('quartier', this.formData.location.quartier);
    formData.append('avenue', this.formData.location.avenue);
    formData.append('numeroDomicile', this.formData.location.numero);

    // Add price and devise
    formData.append('deviseId', this.formData.devise);
    formData.append('prixBase', this.formData.price);

    // Add equipements
    this.formData.amenities.forEach((amenityId, index) => {
      formData.append(`equipements[${index}].equipementId`, amenityId);
    });

    // Add bathroom types
    const bathroomTypesMap: { [key: string]: number } = {};
    this.formData.bathroomTypes.forEach((bathroom) => {
      const typeId = bathroom.type;
      bathroomTypesMap[typeId] = (bathroomTypesMap[typeId] || 0) + 1;
    });

    let bathroomIndex = 0;
    Object.entries(bathroomTypesMap).forEach(([typeId, count]) => {
      formData.append(`bathroomTypes[${bathroomIndex}].bathroomTypeId`, typeId);
      formData.append(
        `bathroomTypes[${bathroomIndex}].count`,
        count.toString()
      );
      bathroomIndex++;
    });

    // Add discount IDs
    this.formData.selectedDiscounts.forEach((discountId, index) => {
      formData.append(`discountsIds[${index}]`, discountId);
    });

    // Add photos
    this.photoFiles.forEach((file) => {
      formData.append('photos', file, file.name);
    });

    this.service.add(formData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Annonce créée avec succès',
          life: 3000,
        });
        console.log('Annonce créée avec succès:', response);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Erreur complète:', error);
        this.handleError(error);
      },
    });
  }

  handleError(error: any): void {
    let errorMessage = 'Une erreur est survenue';

    if (error.error) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error.message) {
        errorMessage = error.error.message;
      } else if (error.error.errors) {
        // Handle validation errors
        const validationErrors = Object.values(error.error.errors).flat();
        errorMessage = validationErrors.join(', ');
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: errorMessage,
      life: 5000,
    });

    console.error('Erreur détaillée:', error);
  }

  // Méthode pour convertir FormData vers ListingRequest
  private mapFormDataToListingRequest(): ListingRequest {
    const bathroomTypesMap: { [key: string]: number } = {};
    this.formData.bathroomTypes.forEach((bathroom) => {
      const typeId = bathroom.type;
      bathroomTypesMap[typeId] = (bathroomTypesMap[typeId] || 0) + 1;
    });

    const bathroomTypes: ListingBathroomTypeRequest[] = Object.entries(
      bathroomTypesMap
    ).map(([typeId, count]) => ({
      bathroomTypeId: parseInt(typeId),
      count: count,
    }));

    return {
      typeHebergementId: parseInt(this.formData.propertyType),
      sousTypeHebergementId: parseInt(this.formData.propertyFeature),
      nbreVisiteurs: this.formData.guests,
      nbreChambres: this.formData.bedrooms,
      nbreLits: this.formData.bathrooms,
      title: this.formData.title,
      description: this.formData.description,
      whoElseOnSite: this.formData.whoElseOnSite || undefined,
      villeId: parseInt(this.formData.location.ville),
      communeId: parseInt(this.formData.location.commune),
      quartier: this.formData.location.quartier,
      avenue: this.formData.location.avenue,
      numeroDomicile: this.formData.location.numero,
      deviseId: parseInt(this.formData.devise),
      prixBase: parseFloat(this.formData.price),
      equipements: this.formData.amenities.map((amenityId) => ({
        equipementId: parseInt(amenityId),
      })),
      photos: this.photoFiles,
      bathroomTypes: bathroomTypes.length > 0 ? bathroomTypes : undefined,
      discountsIds:
        this.formData.selectedDiscounts.length > 0
          ? this.formData.selectedDiscounts.map((id) => parseInt(id))
          : undefined,
    };
  }
}
