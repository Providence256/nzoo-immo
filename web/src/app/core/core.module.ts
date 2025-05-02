// src/app/core/core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

// Layouts
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

// Services
import { AuthService } from './authentication/auth.service';

// Interceptors

import { AuthInterceptor } from './http/jwt.interceptor';

@NgModule({
  declarations: [
    ClientLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    ClientLayoutComponent,
    AdminLayoutComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}