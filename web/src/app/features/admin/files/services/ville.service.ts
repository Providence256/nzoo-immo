import { Injectable } from '@angular/core';
import { VilleApiService } from '../../../../core/api/ville-api.service';
import { Observable } from 'rxjs';
import { CommuneApiService } from '../../../../core/api/commune-api.service';
import { AnnoncesApiService } from '../../../../core/api/annonces-api.service';

@Injectable({
  providedIn: 'root',
})
export class VilleService {
  constructor(
    private villeApi: VilleApiService,
    private communeApiService: CommuneApiService,
    private annonceApiService: AnnoncesApiService
  ) {}

  getVilles(): Observable<any[]> {
    return this.villeApi.findAll();
  }

  getVille(id: number): Observable<any> {
    return this.villeApi.find(id);
  }

  createVille(ville: FormData): Observable<any> {
    return this.villeApi.add(ville);
  }

  updateVille(id: number, ville: FormData): Observable<any> {
    return this.villeApi.edit(id, ville);
  }

  deleteVille(id: number): Observable<any> {
    return this.villeApi.deleteVille(id);
  }

  // Get all Communes by ville

  getAllCommunesByVille(villeId: number): Observable<any> {
    return this.communeApiService.findAllCommunesByVille(villeId);
  }

  //get All listing by ville
  getAllListingsByVille(villeId: number): Observable<any> {
    return this.annonceApiService.getAllListingsByville(villeId);
  }

  getAveragePriceByVille(villeId: number): Observable<any> {
    return this.annonceApiService.getAveragePriceByVille(villeId);
  }
}
