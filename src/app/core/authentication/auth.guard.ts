// src/app/core/authentication/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser.pipe(
      take(1),
      map(user => {
        const isLoggedIn = !!user;
        
        if (isLoggedIn) {
          // Check if route requires admin role
          if (route.data['roles'] && route.data['roles'].indexOf(user.role) === -1) {
            // Role not authorized, redirect to home page
            this.router.navigate(['/']);
            return false;
          }
          
          // Authorized
          return true;
        }
        
        // Not logged in, redirect to login page with return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      })
    );
  }
}