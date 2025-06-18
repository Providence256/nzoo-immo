import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { BecomeHostApiService } from '../api/become-host-api.service';

@Injectable({
  providedIn: 'root',
})
export class BecomeHostService {
  constructor(private becomeHostApiService: BecomeHostApiService) {}

  becomeHost(request: any): Observable<any> {
    return this.becomeHostApiService.becomeHost(request);
  }

  updateHostProfile(request: any) {
    return this.becomeHostApiService.updateHostProfile(request);
  }

  getHostProfile(): Observable<any> {
    return this.becomeHostApiService.getHostProfile();
  }

  getAllHosts(): Observable<any> {
    return this.becomeHostApiService.getAllHosts();
  }

  getHostById(id: number): Observable<any> {
    return this.becomeHostApiService.getHostById(id);
  }

  approveHostRequest(hostId: number, request: any): Observable<any> {
    return this.becomeHostApiService.approveHostRequest(hostId, request);
  }
}
