import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnoncesApiService } from '../../../../core/api/annonces-api.service';
import { TypeHebergementApiService } from '../../../../core/api/type-hebergement-api.service';
import { EquipementApiService } from '../../../../core/api/equipement-api.service';
import { DeviseApiService } from '../../../../core/api/devise-api.service';
import { RegleApiService } from '../../../../core/api/regle-api.service';
import { VilleApiService } from '../../../../core/api/ville-api.service';
import { CommuneApiService } from '../../../../core/api/commune-api.service';
import { SousTypeHebergementApiService } from '../../../../core/api/sous-type-hebergement-api.service';
import { BathroomTypeApiService } from '../../../../core/api/bathtoom-type-api.service';
import { WhoIsOnSiteApiService } from '../../../../core/api/whoisonsite-api.service';
import { DiscountApiService } from '../../../../core/api/discount-api.service';

@Injectable({
  providedIn: 'root',
})
export class AnnoncesService {
  constructor(
    private annonceApi: AnnoncesApiService,
    private typeHebergementApi: TypeHebergementApiService,
    private equipementApi: EquipementApiService,
    private deviseApi: DeviseApiService,
    private ruleApi: RegleApiService,
    private villeApi: VilleApiService,
    private communeApi: CommuneApiService,
    private sousType: SousTypeHebergementApiService,
    private bathroomTypeApi: BathroomTypeApiService,
    private onSiteApi: WhoIsOnSiteApiService,
    private reductionApi: DiscountApiService
  ) {}

  // Annonces
  findAll(): Observable<any[]> {
    return this.annonceApi.findAll();
  }

  find(id: number): Observable<any> {
    return this.annonceApi.find(id);
  }

  add(annonce: FormData): Observable<any> {
    return this.annonceApi.add(annonce);
  }

  update(id: number, annonce: FormData): Observable<any> {
    return this.annonceApi.edit(id, annonce);
  }

  delete(id: number): Observable<any> {
    return this.annonceApi.deleteAnnonce(id);
  }

  // Types d'hébergement
  findAllTypes(): Observable<any[]> {
    return this.typeHebergementApi.findAll();
  }

  // Equipements
  findAllEquipements(): Observable<any[]> {
    return this.equipementApi.findAll();
  }
  findEquipementById(id: number): Observable<any> {
    return this.equipementApi.find(id);
  }

  // Devises
  findAllDevises(): Observable<any[]> {
    return this.deviseApi.findAll();
  }

  // Rules
  findAllRules(): Observable<any[]> {
    return this.ruleApi.findAll();
  }

  // Ville
  findAllVilles(): Observable<any[]> {
    return this.villeApi.findAll();
  }

  //Commune
  findAllCommunes(): Observable<any[]> {
    return this.communeApi.findAll();
  }

  //Commune by ville
  getAllCommunesByVille(villedId: number): Observable<any[]> {
    return this.communeApi.findAllCommunesByVille(villedId);
  }

  // Sous Type Hebergement
  findSousTypeByType(typeId: number): Observable<any[]> {
    return this.sousType.getSousByType(typeId);
  }

  // Bathroom Types
  findBathroomTypes(): Observable<any[]> {
    return this.bathroomTypeApi.findAll();
  }

  findBathroomTypeById(id: number): Observable<any> {
    return this.bathroomTypeApi.find(id);
  }

  // Who is on site
  findAllOnSites(): Observable<any[]> {
    return this.onSiteApi.findAll();
  }

  // Discounts
  findAllDiscounts(): Observable<any[]> {
    return this.reductionApi.findAll();
  }
}
