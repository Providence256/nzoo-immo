import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BathroomTypeApiService } from '../../../../core/api/bathtoom-type-api.service';

@Injectable({
  providedIn: 'root',
})
export class BathroomTypesService {
  constructor(private bathroomTypeApi: BathroomTypeApiService) {}

  getBathroomTypes(): Observable<any[]> {
    return this.bathroomTypeApi.findAll();
  }

  getBathroomType(id: number): Observable<any> {
    return this.bathroomTypeApi.find(id);
  }

  createBathroomType(bathroomType: any): Observable<any> {
    return this.bathroomTypeApi.add(bathroomType);
  }

  updateBathroomType(id: number, bathroomType: any): Observable<any> {
    return this.bathroomTypeApi.edit(id, bathroomType);
  }

  deleteBathroomType(id: number): Observable<any> {
    return this.bathroomTypeApi.deleteBathroomType(id);
  }
}
