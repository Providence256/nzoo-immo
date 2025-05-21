import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BookingSessionApiService } from '../../../core/api/booking-session-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookingSessionService {
  private bookingSessionSubject = new BehaviorSubject<any | null>(null);

  public bookingData$ = this.bookingSessionSubject.asObservable();

  constructor(private router: Router) {}

  parseBookingDataFromUrl(queryParams: any): any | null {
    if (!queryParams || !queryParams.listingId) {
      return null;
    }

    try {
      return {
        listingId: queryParams.listingId,
        checkIn: queryParams.checkIn ? new Date(queryParams.checkIn) : null,
        checkOut: queryParams.checkOut ? new Date(queryParams.checkOut) : null,
        guests: {
          adults: queryParams.guests ? parseInt(queryParams.guests) : 1,
          children: queryParams.children ? parseInt(queryParams.children) : 0,
          babies: queryParams.babies ? parseInt(queryParams.babies) : 0,
        },
      };
    } catch (e) {
      console.error('Error parsing booking data from URL:', e);
      return null;
    }
  }

  navigateWithBookingData(bookingData: any, route: string): void {
    this.bookingSessionSubject.next(bookingData);

    const queryParams: any = {
      listingId: bookingData.listingId,
      checkIn: this.formateDateForUrl(bookingData.checkIn),
      checkOut: this.formateDateForUrl(bookingData.checkOut),
      guests: bookingData.guests.adults,
    };

    if (bookingData.guests.children && bookingData.guests.children > 0) {
      queryParams.children = bookingData.guests.children;
    }

    if (bookingData.guests.babies && bookingData.guests.babies > 0) {
      queryParams.babies = bookingData.guests.babies;
    }
    this.router.navigate([route], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  getCurrentBookingData(): any | null {
    return this.bookingSessionSubject.getValue();
  }

  updateBookingData(bookingData: any): void {
    this.bookingSessionSubject.next(bookingData);
  }

  private formateDateForUrl(date: Date | string): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(d.getTime())) {
      return '';
    }
    return d.toISOString().split('T')[0];
  }
}
