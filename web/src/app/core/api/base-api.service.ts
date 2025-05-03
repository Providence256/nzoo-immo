import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpConfigService } from "./http-config.service";
import { catchError, Observable, throwError } from "rxjs";





@Injectable({
    providedIn: 'root',
})

export class BaseApiService {

    constructor(protected http: HttpClient,
        private config: HttpConfigService) { }

    protected get<T>(endpoint: string): Observable<T>{
        return this.http.get<T>(`${this.config.apiUrl}${endpoint}`,{
            headers: this.config.headers
        })
        .pipe(catchError(this.handleError))
    }

    protected post<T>(endpoint: string, data: any): Observable<T> {
        return this.http
          .post<T>(`${this.config.apiUrl}${endpoint}`, data, {
            headers: this.config.headers,
          })
          .pipe(catchError(this.handleError));
      }
    
      protected put<T>(endpoint: string, data: any): Observable<T> {
        return this.http
          .put<T>(`${this.config.apiUrl}${endpoint}`, data, {
            headers: this.config.headers,
          })
          .pipe(catchError(this.handleError));
      }

      protected postFormData<T>(endpoint: string, data: FormData):Observable<T>{
        return this.http
          .post<T>(`${this.config.apiUrl}${endpoint}`, data, {    
          })
          .pipe(catchError(this.handleError));
      }

      protected putFormData<T>(endpoint: string, data: FormData): Observable<T> {
        return this.http
          .put<T>(`${this.config.apiUrl}${endpoint}`, data, {
          })
          .pipe(catchError(this.handleError));
      }
    
      protected delete<T>(endpoint: string): Observable<T> {
        return this.http
          .delete<T>(`${this.config.apiUrl}${endpoint}`, {
            headers: this.config.headers,
          })
          .pipe(catchError(this.handleError));
      }


    protected handleError(error: any){
        return throwError(() => new Error(error.message || 'Server error'))
    }
}