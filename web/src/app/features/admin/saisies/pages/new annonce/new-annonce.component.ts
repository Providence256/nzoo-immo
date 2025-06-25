import { Component } from '@angular/core';
import { PhotoItem } from '../../components/photo-upload/photo-upload.component';

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

interface PropertyFeature {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface BathroomInfo {
  id: number;
  type: 'private-attached' | 'private' | 'shared';
}

interface BathroomType {
  id: 'private-attached' | 'private' | 'shared';
  name: string;
  description: string;
  icon: string;
}

interface WhoElseOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Ville {
  id: string;
  name: string;
  communes: Commune[];
}

interface Commune {
  id: string;
  name: string;
}

@Component({
  selector: 'app-new-annonce',
  templateUrl: './new-annonce.component.html',
})
export class NewAnnonceComponent {
  currentStep = 0;

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
    bathrooms: 1,
    bathroomTypes: [],
    amenities: [],
    propertyFeature: '',
    whoElseOnSite: '',
    propertyDescription: '',
    title: '',
    description: '',
    photos: [],
    price: '',
  };

  steps = [
    'Type de propriété',
    'Localisation',
    'Capacité',
    'Salles de bain',
    'Caractéristiques',
    "Qui d'autre sur place",
    'Description détaillée',
    'Équipements',
    'Photos',
    'Titre et description',
    'Prix',
  ];

  // Données des villes et communes (exemple)
  villes: Ville[] = [
    {
      id: 'kinshasa',
      name: 'Kinshasa',
      communes: [
        { id: 'gombe', name: 'Gombe' },
        { id: 'lingwala', name: 'Lingwala' },
        { id: 'kintambo', name: 'Kintambo' },
        { id: 'kalamu', name: 'Kalamu' },
        { id: 'lemba', name: 'Lemba' },
        { id: 'limete', name: 'Limété' },
        { id: 'matete', name: 'Matete' },
        { id: 'ngiri-ngiri', name: 'Ngiri-Ngiri' },
        { id: 'kasa-vubu', name: 'Kasa-Vubu' },
        { id: 'bandalungwa', name: 'Bandalungwa' },
      ],
    },
    {
      id: 'lubumbashi',
      name: 'Lubumbashi',
      communes: [
        { id: 'lubumbashi-centre', name: 'Lubumbashi Centre' },
        { id: 'kampemba', name: 'Kampemba' },
        { id: 'katuba', name: 'Katuba' },
        { id: 'kamalondo', name: 'Kamalondo' },
        { id: 'kenya', name: 'Kenya' },
      ],
    },
    {
      id: 'mbuji-mayi',
      name: 'Mbuji-Mayi',
      communes: [
        { id: 'kananga', name: 'Kananga' },
        { id: 'bipemba', name: 'Bipemba' },
        { id: 'muya', name: 'Muya' },
      ],
    },
  ];

  // Communes disponibles selon la ville sélectionnée
  get availableCommunes(): Commune[] {
    const selectedVille = this.villes.find(
      (v) => v.id === this.formData.location.ville
    );
    return selectedVille ? selectedVille.communes : [];
  }

  propertyTypes: PropertyType[] = [
    {
      id: 'house',
      name: 'Maison',
      icon: 'home',
      desc: 'Une propriété résidentielle complète',
    },
    {
      id: 'apartment',
      name: 'Appartement',
      icon: 'apartment',
      desc: 'Un espace dans un immeuble résidentiel',
    },
    {
      id: 'villa',
      name: 'Villa',
      icon: 'holiday_village',
      desc: 'Une grande maison de luxe avec jardin',
    },
    {
      id: 'cabin',
      name: 'Cabane',
      icon: 'cabin',
      desc: 'Un refuge rustique en pleine nature',
    },
    {
      id: 'studio',
      name: 'Studio',
      icon: 'meeting_room',
      desc: 'Un espace compact et fonctionnel',
    },
    {
      id: 'loft',
      name: 'Loft',
      icon: 'warehouse',
      desc: 'Un espace ouvert de style industriel',
    },
  ];

  bathroomTypes: BathroomType[] = [
    {
      id: 'private-attached',
      name: 'Privée attenante',
      description: 'Salle de bain privée dans la chambre',
      icon: 'fas fa-door-closed',
    },
    {
      id: 'private',
      name: 'Privée',
      description: 'Salle de bain privée séparée',
      icon: 'fas fa-lock',
    },
    {
      id: 'shared',
      name: 'Partagée',
      description: "Salle de bain partagée avec d'autres",
      icon: 'fas fa-share-alt',
    },
  ];

  propertyFeatures: PropertyFeature[] = [
    {
      id: 'peaceful',
      name: 'Logement entier',
      icon: 'home',
      description: "Les voyageurs auront l'space entier pour eux",
    },
    {
      id: 'unique',
      name: 'Une Chambre',
      icon: 'holiday_village',
      description:
        'les voyageurs ont leur propre chambre dans un logement et on acces a des espaces partagés',
    },
    {
      id: 'family-friendly',
      name: 'Une Chambre Partagée dans une auberge de Jeunesse',
      icon: 'meeting_room',
      description:
        'les voyageurs dorment dans une chambre partagée dans une auberge de jeunesse gérée par un professionnel, avec du personnel sur place 24h/24, 7j/7',
    },
  ];

  whoElseOptions: WhoElseOption[] = [
    {
      id: 'no-one',
      name: 'Personne',
      description: "Vous aurez l'espace entièrement pour vous",
      icon: 'person_off', // anciennement: fa-user-check
    },
    {
      id: 'host',
      name: "L'hôte",
      description: "L'hôte vit sur place ou à proximité",
      icon: 'person', // anciennement: fa-user-tie
    },
    {
      id: 'family',
      name: "La famille de l'hôte",
      description: "La famille de l'hôte pourrait être présente",
      icon: 'diversity_3', // ou 'group' si tu préfères
    },
    {
      id: 'other-guests',
      name: "D'autres voyageurs",
      description: "D'autres invités pourraient partager l'espace",
      icon: 'groups', // anciennement: fa-users
    },
    {
      id: 'staff',
      name: 'Personnel de service',
      description: 'Personnel de ménage ou de maintenance',
      icon: 'support_agent', // ou 'engineering'
    },
  ];

  amenitiesList: Amenity[] = [
    { id: 'wifi', name: 'Wi-Fi', icon: 'wifi' },
    { id: 'parking', name: 'Parking gratuit', icon: 'local_parking' },
    { id: 'kitchen', name: 'Cuisine équipée', icon: 'kitchen' },
    { id: 'tv', name: 'Télévision', icon: 'tv' },
    { id: 'coffee', name: 'Machine à café', icon: 'coffee_maker' },
    { id: 'pool', name: 'Piscine', icon: 'pool' },
    { id: 'gym', name: 'Salle de sport', icon: 'fitness_center' },
    { id: 'washer', name: 'Lave-linge', icon: 'local_laundry_service' },
    { id: 'air-conditioning', name: 'Climatisation', icon: 'ac_unit' },
    { id: 'heating', name: 'Chauffage', icon: 'whatshot' },
    { id: 'balcony', name: 'Balcon/Terrasse', icon: 'balcony' }, // si non dispo, 'deck'
    { id: 'garden', name: 'Jardin', icon: 'yard' },
  ];

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
      this.formData.location.commune = '';
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

  getBathroomTypeCount(
    type: 'private-attached' | 'private' | 'shared'
  ): number {
    return this.formData.bathroomTypes.filter((bt) => bt.type === type).length;
  }

  incrementBathroomType(type: 'private-attached' | 'private' | 'shared'): void {
    const totalBathrooms = this.formData.bathroomTypes.length;

    const newId =
      Math.max(...this.formData.bathroomTypes.map((bt) => bt.id), 0) + 1;
    this.formData.bathroomTypes.push({
      id: newId,
      type: type,
    });
  }

  decrementBathroomType(type: 'private-attached' | 'private' | 'shared'): void {
    const index = this.formData.bathroomTypes.findIndex(
      (bt) => bt.type === type
    );
    if (index > -1) {
      this.formData.bathroomTypes.splice(index, 1);
      // Optionnel : réorganiser les IDs pour qu'ils soient consécutifs
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

  getBathroomTypeName(type: 'private-attached' | 'private' | 'shared'): string {
    const bathroomType = this.bathroomTypes.find((bt) => bt.id === type);
    return bathroomType ? bathroomType.name : '';
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
        return this.formData.bathroomTypes.length === this.formData.bathrooms;
      case 5:
        return this.formData.whoElseOnSite !== '';
      case 6:
        return this.formData.propertyDescription.trim() !== '';
      case 7:
        return true;
      case 8:
        return true;
      case 9:
        return (
          this.formData.title.trim() !== '' &&
          this.formData.description.trim() !== ''
        );
      case 10:
        return (
          this.formData.price !== '' && parseFloat(this.formData.price) > 0
        );
      default:
        return false;
    }
  }

  handlePhotosChange(photos: PhotoItem[]): void {
    console.log('Nouvelles photos:', photos);
    // Votre logique ici
  }

  submitForm(): void {
    console.log('Données du formulaire:', this.formData);
    alert('Annonce créée avec succès !');
  }
}
