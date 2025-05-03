
import { Injectable } from "@angular/core";
import { CommuneApiService } from "../../../../core/api/commune-api.service";
import { Observable } from "rxjs";
import { RegleApiService } from "../../../../core/api/regle-api.service";

@Injectable({
    providedIn: 'root'
})
export class ReglesService {
    constructor(private regleApi: RegleApiService) {}

    getRules(): Observable<any[]> {
        return this.regleApi.findAll();
    }

    getRegle(id: number): Observable<any> {
        return this.regleApi.find(id);
    }
    
    createRule(regle: any): Observable<any> {
        return this.regleApi.add(regle);
    }
    
    updateRule(id: number, regle: any): Observable<any> {
        return this.regleApi.edit(id, regle);
    }
    
    deleteRule(id: number): Observable<any> {
        return this.regleApi.deleteRegle(id);
    }
}