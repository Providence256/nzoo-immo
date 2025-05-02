import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Property } from '../models/property';
import { Apartment } from '../models/apartment.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = `${environment.apiUrl}/properties`;

  // Temporary mock data - replace with actual API calls later
  // private mockProperties: Property[] = [
  //   {
  //     id: '1',
  //     name: 'Luxury Beachfront Villa',
  //     description: 'Stunning beachfront villa with panoramic ocean views and private pool.',
  //     location: 'Miami Beach, FL',
  //     price: 299,
  //     images: ['/assets/images/property-1.jpg'],
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     maxGuests: 6,
  //     amenities: ['Wi-Fi', 'Pool', 'Kitchen', 'Parking'],
  //     featured: true,
  //     rating: 4.9,
  //     reviewCount: 128
  //   },
  //   {
  //     id: '2',
  //     name: 'Modern Downtown Apartment',
  //     description: 'Stylish apartment in the heart of downtown with city views.',
  //     location: 'New York, NY',
  //     price: 189,
  //     images: ['/assets/images/property-2.jpg'],
  //     bedrooms: 2,
  //     bathrooms: 1,
  //     maxGuests: 4,
  //     amenities: ['Wi-Fi', 'Gym', 'Kitchen', 'Doorman'],
  //     featured: true,
  //     rating: 4.7,
  //     reviewCount: 95
  //   },
  //   {
  //     id: '3',
  //     name: 'Cozy Mountain Cabin',
  //     description: 'Charming cabin surrounded by pine trees with mountain views.',
  //     location: 'Aspen, CO',
  //     price: 159,
  //     images: ['/assets/images/property-3.jpg'],
  //     bedrooms: 2,
  //     bathrooms: 1,
  //     maxGuests: 4,
  //     amenities: ['Wi-Fi', 'Fireplace', 'Kitchen', 'Hiking Trails'],
  //     featured: true,
  //     rating: 4.8,
  //     reviewCount: 74
  //   }
  // ];

  private  mockProperties: Apartment[] = [
    {
      id: '1',
      title: 'Appartement Moderne au Centre-Ville',
      description: 'Appartement lumineux proche de toutes commodités, idéal pour professionnels ou étudiants.',
      location: {
        address: '123 Rue Lafayette',
        city: 'Paris',
        country: 'France',
        zipCode: '75010',
        latitude: 48.874,
        longitude: 2.3508,
      },
      price: {
        amount: 1200,
        currency: 'EUR',
        period: 'month',
      },
      features: {
        bedroomCount: 2,
        bathroomCount: 1,
        maxOccupancy: 4,
        area: 65,
        amenities: ['Wi-Fi', 'Lave-linge', 'Cuisine équipée'],
      },
      media: {
        thumbnailUrl: '/assets/images/apt1-thumb.jpg',
        imageUrls: [
          '/images/house1.jpg',
          '/images/house2.jpg',
        ],
      },
      availability: {
        isAvailable: true,
        availableDates: [
          { start: new Date('2025-05-01'), end: new Date('2025-09-30') }
        ]
      },
      hostId: 'host123',
      createdAt: new Date('2025-04-01'),
      updatedAt: new Date('2025-04-20'),
    },
    {
      id: 'apt002',
      title: 'Loft industriel avec vue sur le fleuve',
      description: 'Un loft spacieux au design contemporain dans un ancien entrepôt rénové.',
      location: {
        address: '87 Quai des Chartrons',
        city: 'Bordeaux',
        country: 'France',
        zipCode: '33000',
        latitude: 44.85,
        longitude: -0.57,
      },
      price: {
        amount: 900,
        currency: 'EUR',
        period: 'week',
      },
      features: {
        bedroomCount: 1,
        bathroomCount: 1,
        maxOccupancy: 2,
        area: 80,
        amenities: ['Climatisation', 'Smart TV', 'Terrasse'],
      },
      media: {
        thumbnailUrl: '/assets/images/apt2-thumb.jpg',
        imageUrls: [
          '/assets/images/apt2-1.jpg',
          '/assets/images/apt2-2.jpg',
        ],
        videoUrl: '/assets/videos/apt2.mp4',
      },
      availability: {
        isAvailable: true,
      },
      hostId: 'host456',
      createdAt: new Date('2025-03-15'),
      updatedAt: new Date('2025-04-21'),
    },
    {
      id: 'apt003',
      title: 'Studio Cosy à Montmartre',
      description: 'Charmant studio situé dans un quartier historique de Paris, parfait pour un séjour romantique.',
      location: {
        address: '19 Rue Lepic',
        city: 'Paris',
        country: 'France',
        zipCode: '75018',
        latitude: 48.885,
        longitude: 2.338,
      },
      price: {
        amount: 80,
        currency: 'EUR',
        period: 'day',
      },
      features: {
        bedroomCount: 1,
        bathroomCount: 1,
        maxOccupancy: 2,
        area: 25,
        amenities: ['Wi-Fi', 'Machine à café', 'Balcon'],
      },
      media: {
        thumbnailUrl: '/assets/images/apt3-thumb.jpg',
        imageUrls: ['/assets/images/apt3.jpg'],
      },
      availability: {
        isAvailable: false,
      },
      hostId: 'host789',
      createdAt: new Date('2025-02-10'),
      updatedAt: new Date('2025-04-10'),
    },
    {
      id: 'apt004',
      title: 'Appartement Familial avec Jardin',
      description: 'Spacieux appartement de 3 chambres avec un grand jardin privé.',
      location: {
        address: '12 Avenue Victor Hugo',
        city: 'Lyon',
        country: 'France',
        zipCode: '69006',
        latitude: 45.769,
        longitude: 4.85,
      },
      price: {
        amount: 1600,
        currency: 'EUR',
        period: 'month',
      },
      features: {
        bedroomCount: 3,
        bathroomCount: 2,
        maxOccupancy: 6,
        area: 120,
        amenities: ['Jardin', 'Garage', 'Lave-vaisselle'],
      },
      media: {
        thumbnailUrl: '/assets/images/apt4-thumb.jpg',
        imageUrls: ['/assets/images/apt4-1.jpg'],
      },
      availability: {
        isAvailable: true,
      },
      hostId: 'host321',
      createdAt: new Date('2025-01-05'),
      updatedAt: new Date('2025-04-15'),
    },
    {
      id: 'apt005',
      title: 'Penthouse de luxe avec rooftop',
      description: 'Un penthouse spectaculaire avec une terrasse panoramique et jacuzzi.',
      location: {
        address: '5 Boulevard Haussmann',
        city: 'Paris',
        country: 'France',
        zipCode: '75009',
        latitude: 48.872,
        longitude: 2.332,
      },
      price: {
        amount: 4500,
        currency: 'EUR',
        period: 'month',
      },
      features: {
        bedroomCount: 2,
        bathroomCount: 2,
        maxOccupancy: 4,
        area: 150,
        amenities: ['Jacuzzi', 'Vue panoramique', 'Domotique'],
      },
      media: {
        thumbnailUrl: '/assets/images/apt5-thumb.jpg',
        imageUrls: ['/assets/images/apt5-1.jpg'],
        videoUrl: '/assets/videos/apt5-tour.mp4',
      },
      availability: {
        isAvailable: true,
      },
      hostId: 'host999',
      createdAt: new Date('2025-03-01'),
      updatedAt: new Date('2025-04-25'),
    }
  ];
  

  constructor(private http: HttpClient) { }

  // Get featured properties
  // getFeaturedProperties(): Observable<Property[]> {
  //   // When API is ready, use this:
  //   // return this.http.get<Property[]>(`${this.apiUrl}/featured`);
    
  //   // For now, use mock data
  //   return of(this.mockProperties.filter(p => p.featured));
  // }

  // Get all properties
  getAllProperties(): Observable<Apartment[]> {
    // When API is ready, use this:
    // return this.http.get<Property[]>(this.apiUrl);
    
    // For now, use mock data
    return of(this.mockProperties);
  }

  // Get a property by id
  getPropertyById(id: string): Observable<Apartment | undefined> {
    // When API is ready, use this:
    // return this.http.get<Property>(`${this.apiUrl}/${id}`);
    
    // For now, use mock data
    return of(this.mockProperties.find(p => p.id === id));
  }

  // Search properties
  searchProperties(criteria: any): Observable<Apartment[]> {
    // When API is ready, use this:
    // return this.http.post<Property[]>(`${this.apiUrl}/search`, criteria);
    
    // For now, use mock filtering
    let filtered = [...this.mockProperties];
    
    // if (criteria.location) {
    //   filtered = filtered.filter(p => 
    //     p.location.toLowerCase().includes(criteria.location.toLowerCase())
    //   );
    // }
    
    // Add more filtering logic as needed
    
    return of(filtered);
  }
}