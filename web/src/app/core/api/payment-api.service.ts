import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from './http-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentApiService extends BaseApiService {
  private endpoint = 'payments';

  constructor(http: HttpClient, config: HttpConfigService) {
    super(http, config);
  }

  createPaymentIntent(data: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/create-paymentintent`, data);
  }

  createBookingAndPay(data: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/confirm-and-pay`, data);
  }
}
