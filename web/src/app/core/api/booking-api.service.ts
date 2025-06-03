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

  editSession(id: string, bookingsession: any): Observable<any> {
    return this.put<any>(`${this.endpoint}/${id}`, bookingsession);
  }

  checkAvalaibility(data: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/${'check-availability'}`, data);
  }
}
