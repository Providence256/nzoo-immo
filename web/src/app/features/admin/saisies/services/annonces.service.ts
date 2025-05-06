import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnnoncesApiService } from "../../../../core/api/annonces-api.service";
import { TypeHebergementApiService } from "../../../../core/api/type-hebergement-api.service";
import { EquipementApiService } from "../../../../core/api/equipement-api.service";
import { DeviseApiService } from "../../../../core/api/devise-api.service";
import { RegleApiService } from "../../../../core/api/regle-api.service";
import { VilleApiService } from "../../../../core/api/ville-api.service";
import { CommuneApiService } from "../../../../core/api/commune-api.service";

@Injectable({
    providedIn: 'root'
})
export class AnnoncesService {
    constructor(
        private annonceApi: AnnoncesApiService,
        private typeHebergementApi: TypeHebergementApiService,
        private equipementApi : EquipementApiService,
        private deviseApi: DeviseApiService,
        private ruleApi: RegleApiService,
        private villeApi : VilleApiService,
        private communeApi: CommuneApiService
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

    // Devises
    findAllDevises(): Observable<any[]> {
        return this.deviseApi.findAll();
    }

    // Rules
    findAllRules(): Observable<any[]> {
        return this.ruleApi.findAll();
    }

    // Ville
    findAllVilles() : Observable<any[]>{
        return this.villeApi.findAll()
    }

    //Commune
    findAllCommunes() :Observable<any[]>{
        return this.communeApi.findAll()
    }

   
}