// services/discount-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpConfigService } from './http-config.service';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class DiscountApiService extends BaseApiService {
  private endpoint = 'discounts';

  constructor(http: HttpClient, config: HttpConfigService) {
    super(http, config);
  }

  findAll(): Observable<any[]> {
    return this.get<any[]>(this.endpoint);
  }

  find(id: number): Observable<any> {
    return this.get<any>(`${this.endpoint}/${id}`);
  }

  add(discount: any): Observable<any> {
    return this.http.post<any>(this.endpoint, discount);
  }

  edit(id: number, discount: any): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/${id}`, discount);
  }

  deleteDiscount(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/${id}`);
  }
}
