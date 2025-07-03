import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from './http-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhoIsOnSiteApiService extends BaseApiService {
  private endpoint = 'onsites';

  constructor(http: HttpClient, config: HttpConfigService) {
    super(http, config);
  }

  findAll(): Observable<any[]> {
    return this.get<any[]>(this.endpoint);
  }

  find(id: number): Observable<any> {
    return this.get<any>(`${this.endpoint}/${id}`);
  }

  add(onsite: any): Observable<any> {
    return this.postFormData<any>(this.endpoint, onsite);
  }

  edit(id: number, onsite: any): Observable<any> {
    return this.putFormData<any>(`${this.endpoint}/${id}`, onsite);
  }

  deleteOnSite(id: number): Observable<any> {
    return this.delete<any>(`${this.endpoint}/${id}`);
  }
}
