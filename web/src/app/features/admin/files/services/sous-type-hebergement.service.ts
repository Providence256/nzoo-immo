import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeHebergementApiService } from '../../../../core/api/type-hebergement-api.service';
import { SousTypeHebergementApiService } from '../../../../core/api/sous-type-hebergement-api.service';

@Injectable({
  providedIn: 'root',
})
export class SousTypeHebergementService {
  constructor(private typeApi: SousTypeHebergementApiService) {}

  getSousTypeHebergements(): Observable<any[]> {
    return this.typeApi.findAll();
  }

  getSousType(id: number): Observable<any> {
    return this.typeApi.find(id);
  }

  createSousTypeHebergement(type: any): Observable<any> {
    return this.typeApi.add(type);
  }

  updateSousTypeHebergement(id: number, type: any): Observable<any> {
    return this.typeApi.edit(id, type);
  }

  deleteSousTypeHebergement(id: number): Observable<any> {
    return this.typeApi.deleteSousType(id);
  }
}
