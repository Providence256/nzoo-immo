import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { HttpClient } from "@angular/common/http";
import { HttpConfigService } from "./http-config.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegleApiService extends BaseApiService {
    private endpoint = 'rules';

    constructor(http: HttpClient, config: HttpConfigService) {
        super(http, config)
    }

    findAll(): Observable<any[]> {
        return this.get<any[]>(this.endpoint);
    }

    find(id: number): Observable<any> {
        return this.get<any>(`${this.endpoint}/${id}`);
    }
    
    add(regle: any): Observable<any> {
        return this.post<any>(this.endpoint, regle);
    }
    
    edit(id: number, regle: any): Observable<any> {
        return this.put<any>(`${this.endpoint}/${id}`, regle);
    }
    
    deleteRegle(id: number): Observable<any> {
        return this.delete<any>(`${this.endpoint}/${id}`);
    }
}