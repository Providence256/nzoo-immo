import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = `${environment.apiUrl}/properties`;

  constructor(private http: HttpClient) {}
}
