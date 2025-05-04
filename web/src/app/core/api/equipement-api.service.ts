import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { HttpClient } from "@angular/common/http";
import { HttpConfigService } from "./http-config.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EquipementApiService extends BaseApiService {
    private endpoint = 'equipements';

    constructor(http: HttpClient, config: HttpConfigService) {
        super(http, config);
    }

    findAll(): Observable<any[]> {
        return this.get<any[]>(this.endpoint);
    }

    find(id: number): Observable<any> {
        return this.get<any>(`${this.endpoint}/${id}`);
    }
    
    add(equipement: any): Observable<any> {
        return this.post<any>(this.endpoint, equipement);
    }
    
    edit(id: number, equipement: any): Observable<any> {
        return this.put<any>(`${this.endpoint}/${id}`, equipement);
    }
    
    deleteEquipement(id: number): Observable<any> {
        return this.delete<any>(`${this.endpoint}/${id}`);
    }
}