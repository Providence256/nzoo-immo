import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { HttpClient } from "@angular/common/http";
import { HttpConfigService } from "./http-config.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TauxChangeApiService extends BaseApiService {
  private endpoint = 'taux-changes';
  private deviseEndpoint = 'devises';

  constructor(http: HttpClient, config: HttpConfigService) {
    super(http, config);
  }

  findAll(): Observable<any[]> {
    return this.get<any[]>(this.endpoint);
  }

  find(id: number): Observable<any> {
    return this.get<any>(`${this.endpoint}/${id}`);
  }

  add(tauxChange: any): Observable<any> {
    return this.post<any>(this.endpoint, tauxChange);
  }

  edit(id: number, tauxChange: any): Observable<any> {
    return this.put<any>(`${this.endpoint}/${id}`, tauxChange);
  }

  deleteTaux(id: number): Observable<any> {
    return this.delete<any>(`${this.endpoint}/${id}`);
  }

  findAllDevises(): Observable<any[]> {
    return this.get<any[]>(this.deviseEndpoint);
  }

  findDeviseReference(): Observable<any> {
    return this.get<any>(`${this.deviseEndpoint}/reference`);
  }
}