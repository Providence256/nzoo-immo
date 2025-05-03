import { Injectable } from "@angular/core";
import { DeviseApiService } from "../../../../core/api/devise-api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeviseService {
    constructor(private deviseApi: DeviseApiService) {}

    getDevises(): Observable<any[]> {
        return this.deviseApi.findAll();
    }

    getDevise(id: number): Observable<any> {
        return this.deviseApi.find(id);
    }
    
    createDevise(devise: any): Observable<any> {
        return this.deviseApi.add(devise);
    }
    
    updateDevise(id: number, devise: any): Observable<any> {
        return this.deviseApi.edit(id, devise);
    }
    
    deleteDevise(id: number): Observable<any> {
        return this.deviseApi.deleteDevise(id);
    }
}