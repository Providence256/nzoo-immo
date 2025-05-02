
// src/app/core/models/apartment.model.ts
export interface Apartment {
    id?: string;
    title: string;
    description: string;
    location: {
      address: string;
      city: string;
      country: string;
      zipCode: string;
      latitude?: number;
      longitude?: number;
    };
    price: {
      amount: number;
      currency: string;
      period: 'day' | 'week' | 'month';
    };
    features: {
      bedroomCount: number;
      bathroomCount: number;
      maxOccupancy: number;
      area: number; // in square meters
      amenities: string[];
    };
    media: {
      thumbnailUrl: string;
      imageUrls: string[];
      videoUrl?: string;
    };
    availability: {
      isAvailable: boolean;
      availableDates?: {
        start: Date;
        end: Date;
      }[];
    };
    hostId: string;
    createdAt: Date;
    updatedAt: Date;
  }