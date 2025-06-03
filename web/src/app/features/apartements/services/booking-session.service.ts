import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BookingSessionApiService } from '../../../core/api/booking-session-api.service';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { BookingData } from '../../../core/models/booking-data.model';
import { ConfirmationData } from '../../../core/models/confirmation-data.model';

@Injectable({
  providedIn: 'root',
})
export class BookingSessionService {
  private bookingSessionSubject = new BehaviorSubject<any | null>(null);
  private confirmationDataSubject = new BehaviorSubject<any | null>(null);

  public bookingData$ = this.bookingSessionSubject.asObservable();
  public confirmationData$ = this.confirmationDataSubject.asObservable();

  constructor(private router: Router) {}

  parseBookingDataFromUrl(queryParams: any): BookingData | null {
    if (!queryParams || !queryParams.listingId) {
      return null;
    }

    try {
      return {
        listingId: queryParams.listingId,
        checkIn: queryParams.checkIn
          ? new Date(queryParams.checkIn)
          : new Date(),
        checkOut: queryParams.checkOut
          ? new Date(queryParams.checkOut)
          : new Date(),
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

  updateBookingData(bookingData: BookingData): void {
    this.bookingSessionSubject.next(bookingData);
  }

  getCurrentBookingData(): BookingData | null {
    return this.bookingSessionSubject.getValue();
  }

  navigateWithBookingData(bookingData: BookingData, route: string): void {
    this.updateBookingData(bookingData);

    const queryParams: any = {
      listingId: bookingData.listingId,
      checkIn: this.formateDateForUrl(bookingData.checkIn),
      checkOut: this.formateDateForUrl(bookingData.checkOut),
      guests: bookingData.guests.adults,
    };

    if (bookingData.guests.children > 0) {
      queryParams.children = bookingData.guests.children;
    }

    if (bookingData.guests.babies > 0) {
      queryParams.babies = bookingData.guests.babies;
    }

    this.router.navigate([route], {
      queryParams: queryParams,
      queryParamsHandling: 'replace',
    });
  }

  setConfirmationData(data: ConfirmationData) {
    this.confirmationDataSubject.next(data);
  }

  getConfirmationData(): ConfirmationData | null {
    return this.confirmationDataSubject.getValue();
  }

  clearConfirmationData() {
    this.confirmationDataSubject.next(null);
  }

  isBookingDataValid(bookingData: BookingData | null): boolean {
    if (!bookingData) return false;

    return !!(
      bookingData.listingId &&
      bookingData.checkIn &&
      bookingData.checkOut &&
      bookingData.guests.adults > 0 &&
      bookingData.checkIn < bookingData.checkOut
    );
  }

  private formateDateForUrl(date: Date | string): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(d.getTime())) {
      return '';
    }
    return format(d, 'yyyy-MM-dd');
  }
}
