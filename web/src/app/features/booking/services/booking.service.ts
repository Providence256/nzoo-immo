import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

// This would typically be in a models folder
export interface Booking {
  id: string;
  property: {
    id: string;
    name: string;
    type: string;
    location: string;
    imageUrl: string;
    host: {
      name: string;
      photoUrl: string;
    }
  };
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    babies: number;
    pets: number;
  };
  totalNights: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  totalPrice: number;
  paymentMethod: string;
  confirmationCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  // In a real app, this would make an API call
  getBooking(id: string): Observable<Booking> {
    // Replace this with your actual API endpoint
    // return this.http.get<Booking>(`/api/bookings/${id}`);
    
    // For demo purposes, we'll return mock data
    return of(this.getMockBooking(id)).pipe(
      delay(800), // Simulate network delay
      catchError(error => {
        console.error('Error fetching booking:', error);
        return throwError(() => new Error('Failed to load booking details. Please try again.'));
      })
    );
  }

  // For demonstration purposes only
  private getMockBooking(id: string): Booking {
    return {
      id: id,
      property: {
        id: 'prop123',
        name: 'Oceanfront Villa with Infinity Pool',
        type: 'Entire villa',
        location: 'Malibu, California',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        host: {
          name: 'Sarah',
          photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg'
        }
      },
      checkIn: '2025-05-15',
      checkOut: '2025-05-20',
      guests: {
        adults: 2,
        children: 1,
        babies: 0,
        pets: 0
      },
      totalNights: 5,
      pricePerNight: 299,
      cleaningFee: 150,
      serviceFee: 221,
      taxes: 180,
      totalPrice: 2046,
      paymentMethod: 'Visa ending in 4242',
      confirmationCode: 'HMRXP7'
    };
  }

  // Calculate the number of nights between two dates
  calculateNights(checkIn: string, checkOut: string): number {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Calculate taxes based on location and subtotal (simplified example)
  calculateTaxes(subtotal: number, location: string): number {
    // Different tax rates based on location (example)
    const taxRates: {[key: string]: number} = {
      'California': 0.0725,
      'New York': 0.08875,
      'Florida': 0.06,
      // Add more states/locations as needed
      'default': 0.06 // Default tax rate
    };
    
    // Get the state from the location string (this would be more sophisticated in a real app)
    const state = location.split(', ')[1] || 'default';
    
    // Get the tax rate for this state, or use default
    const rate = taxRates[state] || taxRates['default'];
    
    return Math.round(subtotal * rate);
  }
}