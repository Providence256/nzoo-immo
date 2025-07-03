import { Injectable } from '@angular/core';
import { DiscountApiService } from '../../../../core/api/discount-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(private discountApi: DiscountApiService) {}

  getDiscounts(): Observable<any[]> {
    return this.discountApi.findAll();
  }

  getDiscount(id: number): Observable<any> {
    return this.discountApi.find(id);
  }

  createDiscount(discount: any): Observable<any> {
    return this.discountApi.add(discount);
  }

  updateDiscount(id: number, discount: any): Observable<any> {
    return this.discountApi.edit(id, discount);
  }

  deleteDiscount(id: number): Observable<any> {
    return this.discountApi.deleteDiscount(id);
  }
}
