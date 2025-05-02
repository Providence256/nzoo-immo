// src/app/core/http/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service
    const token = this.authService.getToken();

    // Clone the request and add the token if it exists
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pass the cloned request to the next handler
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized or 403 Forbidden responses
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
          this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: this.router.url }
          });
        }
        return throwError(() => error);
      })
    );
  }
}