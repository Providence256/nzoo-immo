// src/app/core/http/http-error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          
          // Handle specific error cases
          switch (error.status) {
            case 401: // Unauthorized
              this.authService.logout();
              this.router.navigate(['/login']);
              break;
              
            case 403: // Forbidden
              this.router.navigate(['/unauthorized']);
              break;
          }
        }
        
        // You could add a notification service here to display errors
        console.error(errorMessage);
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}