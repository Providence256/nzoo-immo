import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { HttpClient } from "@angular/common/http";
import { HttpConfigService } from "./http-config.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookingSessionApiService extends BaseApiService {
    private endpoint = 'bookingsession';

    constructor(http: HttpClient, config: HttpConfigService) {
        super(http, config)
    }

    
    getSession(id: string): Observable<any> {
        return this.get<any>(`${this.endpoint}/${id}`);
    }
    
    setSession(bookingsession: any): Observable<any> {
        return this.post<any>(this.endpoint, bookingsession);
    }
    
    editSession(id: string, bookingsession: any): Observable<any> {
        return this.put<any>(`${this.endpoint}/${id}`, bookingsession);
    }
    
    deleteSession(id: string): Observable<any> {
        return this.delete<any>(`${this.endpoint}/${id}`);
    }
}