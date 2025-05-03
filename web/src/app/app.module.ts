// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule,  } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// PrimeNG services
import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'
import { PrimengModule } from './shared/_primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './core/services/customer.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    PrimengModule,
    ReactiveFormsModule,
  ],
  providers: [
    providePrimeNG({
      theme:{
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'light'
        }
      }
    }),
    // PrimeNG services
    MessageService,
    ConfirmationService,
    CustomerService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }