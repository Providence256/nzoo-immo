import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from './http-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingApiService extends BaseApiService {
  private endpoint = 'bookings';

  constructor(http: HttpClient, config: HttpConfigService) {
    super(http, config);
  }

  createBooking(bookingData: any): Observable<any> {
    return this.post<any>(this.endpoint, bookingData);
  }

  editSession(id: string, bookingsession: any): Observable<any> {
    return this.put<any>(`${this.endpoint}/${id}`, bookingsession);
  }

  checkAvalaibility(data: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/${'check-availability'}`, data);
  }

  getBookingById(id: any): Observable<any> {
    return this.get<any>(`${this.endpoint}/${id}`);
  }

  getBookingDates(listingId: number): Observable<any> {
    return this.get<any>(
      `${this.endpoint}/${'unavailable-dates'}/${listingId}`
    );
  }

  getUserBookings(): Observable<any> {
    return this.get<any>(`${this.endpoint}/user/bookings`);
  }
}
