// src/app/core/authentication/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  displayName: string,
  roles: string[];
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  
  private apiUrl = `${environment.apiUrl}accounts`;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.handleAuthCallBack()
  }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  public isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles.includes('admin') || false;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(user => {
          // Store user details and token in local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  // Method to get user token
  getToken(): string | undefined {
    return this.currentUserSubject.value?.token;
  }

  // Method to check token expiration (implement JWT decode logic if needed)
  isTokenExpired(): boolean {
    // Implement token expiration check here if using JWT
    return false;
  }

  // Social authentication methods
  loginWithGoogle(): void {
   window.location.href = `${this.apiUrl}/google-login`
  }

  loginWithFacebook(): Observable<User> {
    // This would typically redirect to Facebook OAuth
    // For demo purposes, we'll simulate it
    return this.http.get<User>(`${this.apiUrl}/facebook-login`);
  }

  // Password recovery
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }



  private handleAuthCallBack() : void{
    if(window.location.pathname.includes('auth-calback') || 
    window.location.search.includes('token=')){

      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token');
      const email = urlParams.get('email')
      const displayName = urlParams.get('displayName');
      const role = urlParams.get('role') || 'client'

      if(token && email){

        const user : User =  {
          id: '',
          email: email,
          displayName: displayName || email,
          token: token,
          roles: [role]
        }

        localStorage.setItem('currentUser', JSON.stringify(user))
        this.currentUserSubject.next(user)

        this.router.navigate(['/'])

        window.history.replaceState({},document.title, window.location.pathname)
      }
    }
  }
}