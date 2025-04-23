// src/app/core/authentication/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          // Store user details and jwt token in local storage
          const user = response.user;
          user.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout() {
    // Remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Social login methods
  loginWithGoogle(): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/google`)
      .pipe(
        map(response => {
          const user = response.user;
          user.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  loginWithFacebook(): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/facebook`)
      .pipe(
        map(response => {
          const user = response.user;
          user.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  // Verify token validity
  verifyToken(): Observable<boolean> {
    if (!this.currentUserValue || !this.currentUserValue.token) {
      return of(false);
    }
    
    return this.http.post<boolean>(`${this.apiUrl}/verify-token`, {})
      .pipe(
        catchError(() => of(false)),
        tap(isValid => {
          if (!isValid) {
            this.logout();
          }
        })
      );
  }
}