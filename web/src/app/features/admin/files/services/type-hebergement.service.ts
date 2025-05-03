import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TypeHebergementApiService } from "../../../../core/api/type-hebergement-api.service";

@Injectable({
    providedIn: 'root'
})
export class TypeHebergementService {
    constructor(private typeApi: TypeHebergementApiService) {}

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
}