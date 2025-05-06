import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { HttpClient } from "@angular/common/http";
import { HttpConfigService } from "./http-config.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AnnoncesApiService extends BaseApiService {
    private endpoint = 'annonces';
    private typeEndpoint = 'typehebergements';
    private equipementEndpoint = 'equipements';
    private deviseEndpoint = 'devises';
    private ruleEndpoint = 'rules';

    constructor(http: HttpClient, config: HttpConfigService) {
        super(http, config);
    }

    // Annonces
    findAll(): Observable<any[]> {
        return this.get<any[]>(this.endpoint);
    }

    find(id: number): Observable<any> {
        return this.get<any>(`${this.endpoint}/${id}`);
    }
    
    add(annonce: FormData): Observable<any> {
        return this.postFormData<any>(this.endpoint, annonce);
    }
    
    edit(id: number, annonce: FormData): Observable<any> {
        return this.putFormData<any>(`${this.endpoint}/${id}`, annonce);
    }
    
    deleteAnnonce(id: number): Observable<any> {
        return this.delete<any>(`${this.endpoint}/${id}`);
    }

    // Types d'hébergement
    getAllTypes(): Observable<any[]> {
        return this.get<any[]>(this.typeEndpoint);
    }

    // Equipements
    getAllEquipements(): Observable<any[]> {
        return this.get<any[]>(this.equipementEndpoint);
    }

    // Devises
    getAllDevises(): Observable<any[]> {
        return this.get<any[]>(this.deviseEndpoint);
    }

    // Rules
    getAllRules(): Observable<any[]> {
        return this.get<any[]>(this.ruleEndpoint);
    }
}