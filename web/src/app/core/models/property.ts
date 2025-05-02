export interface Property {
    id: string;
    name: string;
    description: string;
    location: string;
    price: number;
    images: string[];
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    amenities: string[];
    featured: boolean;
    rating?: number;
    reviewCount?: number;
  }