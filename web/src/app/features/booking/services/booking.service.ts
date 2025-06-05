import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { BookingApiService } from '../../../core/api/booking-api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private bookingApiService: BookingApiService) {}

  createBooking(bookingData: any): Observable<any> {
    return this.bookingApiService.createBooking(bookingData);
  }

  getBooking(bookingId: any) {
    return this.bookingApiService.getBookingById(bookingId);
  }

  getBookingDates(listingId: number): Observable<any> {
    return this.bookingApiService.getBookingDates(listingId);
  }
}
