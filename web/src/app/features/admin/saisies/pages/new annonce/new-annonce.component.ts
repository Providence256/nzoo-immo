import { Component } from '@angular/core';

interface FormData {
  propertyType: string;
  location: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  title: string;
  description: string;
  photos: string[];
  price: string;
}

interface PropertyType {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

interface Amenity {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-airbnb-listing',
  templateUrl: './new-annonce.component.html',
})
export class NewAnnonceComponent {
  currentStep = 0;

  formData: FormData = {
    propertyType: '',
    location: '',
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    title: '',
    description: '',
    photos: [],
    price: '',
  };

  steps = [
    'Type de propriété',
    'Localisation',
    'Capacité',
    'Équipements',
    'Photos',
    'Titre et description',
    'Prix',
  ];

  propertyTypes: PropertyType[] = [
    {
      id: 'house',
      name: 'Maison',
      icon: 'fas fa-home',
      desc: 'Une propriété résidentielle',
    },
    {
      id: 'apartment',
      name: 'Appartement',
      icon: 'fas fa-building',
      desc: 'Un espace dans un immeuble',
    },
    {
      id: 'villa',
      name: 'Villa',
      icon: 'fas fa-mountain',
      desc: 'Une grande maison de luxe',
    },
    {
      id: 'cabin',
      name: 'Cabane',
      icon: 'fas fa-tree',
      desc: 'Un refuge rustique',
    },
  ];

  amenitiesList: Amenity[] = [
    { id: 'wifi', name: 'Wi-Fi', icon: 'fas fa-wifi' },
    { id: 'parking', name: 'Parking gratuit', icon: 'fas fa-car' },
    { id: 'kitchen', name: 'Cuisine', icon: 'fas fa-utensils' },
    { id: 'tv', name: 'Télévision', icon: 'fas fa-tv' },
    { id: 'coffee', name: 'Machine à café', icon: 'fas fa-coffee' },
    { id: 'pool', name: 'Piscine', icon: 'fas fa-water' },
  ];

  handleNext(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
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

  incrementField(field: 'guests' | 'bedrooms' | 'bathrooms'): void {
    this.formData[field]++;
  }

  decrementField(field: 'guests' | 'bedrooms' | 'bathrooms'): void {
    if (this.formData[field] > 1) {
      this.formData[field]--;
    }
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

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.formData.propertyType !== '';
      case 1:
        return this.formData.location.trim() !== '';
      case 2:
        return (
          this.formData.guests >= 1 &&
          this.formData.bedrooms >= 1 &&
          this.formData.bathrooms >= 1
        );
      case 3:
        return true; // Amenities are optional
      case 4:
        return true; // Photos will be optional for demo
      case 5:
        return (
          this.formData.title.trim() !== '' &&
          this.formData.description.trim() !== ''
        );
      case 6:
        return (
          this.formData.price !== '' && parseFloat(this.formData.price) > 0
        );
      default:
        return false;
    }
  }
}
