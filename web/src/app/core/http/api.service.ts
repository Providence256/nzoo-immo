// src/app/core/http/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Generic GET request
  get<T>(path: string, params: any = {}): Observable<T> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });

    return this.http.get<T>(`${this.apiUrl}/${path}`, { params: httpParams });
  }

  // Generic POST request
  post<T>(path: string, body: any = {}): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${path}`, body);
  }

  // Generic PUT request
  put<T>(path: string, body: any = {}): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${path}`, body);
  }

  // Generic DELETE request
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${path}`);
  }

  // Specialized methods for apartments
  getApartments(filters?: any): Observable<any> {
    return this.get('apartments', filters);
  }

  getApartmentById(id: string): Observable<any> {
    return this.get(`apartments/${id}`);
  }

  createApartment(apartment: any): Observable<any> {
    return this.post('apartments', apartment);
  }

  updateApartment(id: string, apartment: any): Observable<any> {
    return this.put(`apartments/${id}`, apartment);
  }

  deleteApartment(id: string): Observable<any> {
    return this.delete(`apartments/${id}`);
  }

  // Specialized methods for bookings
  createBooking(booking: any): Observable<any> {
    return this.post('bookings', booking);
  }
  
  getUserBookings(): Observable<any> {
    return this.get('bookings/user');
  }

  // Methods for payment processing
  processPayment(paymentData: any): Observable<any> {
    return this.post('payments/process', paymentData);
  }

  // Methods for price comparison
  getComparablePrices(apartmentId: string): Observable<any> {
    return this.get(`price-comparison/${apartmentId}`);
  }
}