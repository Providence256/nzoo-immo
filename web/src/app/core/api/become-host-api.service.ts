import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from './http-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BecomeHostApiService extends BaseApiService {
  private endpoint = 'hosts';

  constructor(http: HttpClient, config: HttpConfigService) {
    super(http, config);
  }

  becomeHost(request: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/become-host`, request);
  }

  getHostProfile(): Observable<any> {
    return this.get<any>(`${this.endpoint}/profile`);
  }

  updateHostProfile(request: any): Observable<any> {
    return this.put<any>(`${this.endpoint}/update-profile`, request);
  }

  getAllHosts(): Observable<any> {
    return this.get<any>(`${this.endpoint}/all-hosts`);
  }

  getHostById(id: number): Observable<any> {
    return this.get<any>(`${this.endpoint}/host/${id}`);
  }

  approveHostRequest(hostId: number, request: any): Observable<any> {
    return this.post<any>(`${this.endpoint}/verify/${hostId}`, request);
  }
}
