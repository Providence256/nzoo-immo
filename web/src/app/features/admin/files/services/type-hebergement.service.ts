import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeHebergementApiService } from '../../../../core/api/type-hebergement-api.service';
import { SousTypeHebergementApiService } from '../../../../core/api/sous-type-hebergement-api.service';

@Injectable({
  providedIn: 'root',
})
export class TypeHebergementService {
  constructor(
    private typeApi: TypeHebergementApiService,
    private sousTypeApi: SousTypeHebergementApiService
  ) {}

  getTypeHebergements(): Observable<any[]> {
    return this.typeApi.findAll();
  }

  getType(id: number): Observable<any> {
    return this.typeApi.find(id);
  }

  createTypeHebergement(type: any): Observable<any> {
    return this.typeApi.add(type);
  }

  updateTypeHebergement(id: number, type: any): Observable<any> {
    return this.typeApi.edit(id, type);
  }

  deleteTypeHebergement(id: number): Observable<any> {
    return this.typeApi.deleteType(id);
  }

  getSousTypes(typeHebergementId: number): Observable<any[]> {
    return this.sousTypeApi.findAll();
  }

  getSousType(id: number): Observable<any> {
    return this.sousTypeApi.find(id);
  }

  createSousType(sousType: any): Observable<any> {
    return this.sousTypeApi.add(sousType);
  }

  updateSousType(id: number, sousType: any): Observable<any> {
    return this.sousTypeApi.edit(id, sousType);
  }

  deleteSousType(id: number): Observable<any> {
    return this.sousTypeApi.deleteSousType(id);
  }

  // Méthode pour obtenir tous les sous-types (optionnel)
  getAllSousTypes(): Observable<any[]> {
    return this.sousTypeApi.findAll();
  }
}
