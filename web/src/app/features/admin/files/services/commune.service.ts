import { Injectable } from "@angular/core";
import { CommuneApiService } from "../../../../core/api/commune-api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommuneService {
    constructor(private communeApi: CommuneApiService) {}

    getCommunes(): Observable<any[]> {
        return this.communeApi.findAll();
    }

    getCommune(id: number): Observable<any> {
        return this.communeApi.find(id);
    }
    
    createCommune(commune: any): Observable<any> {
        return this.communeApi.add(commune);
    }
    
    updateCommune(id: number, commune: any): Observable<any> {
        return this.communeApi.edit(id, commune);
    }
    
    deleteCommune(id: number): Observable<any> {
        return this.communeApi.deleteCommune(id);
    }
}