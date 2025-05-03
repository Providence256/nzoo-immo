import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { HttpClient } from "@angular/common/http";
import { HttpConfigService } from "./http-config.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeviseApiService extends BaseApiService {
    private endpoint = 'devises';

    constructor(http: HttpClient, config: HttpConfigService) {
        super(http, config)
    }

    findAll(): Observable<any[]> {
        return this.get<any[]>(this.endpoint);
    }

    find(id: number): Observable<any> {
        return this.get<any>(`${this.endpoint}/${id}`);
    }
    
    add(devise: FormData): Observable<any> {
        return this.postFormData<any>(this.endpoint, devise);
    }
    
    edit(id: number, devise: FormData): Observable<any> {
        return this.putFormData<any>(`${this.endpoint}/${id}`, devise);
    }
    
    deleteDevise(id: number): Observable<any> {
        return this.delete<any>(`${this.endpoint}/${id}`);
    }
}