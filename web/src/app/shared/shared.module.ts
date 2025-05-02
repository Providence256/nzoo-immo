// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG Modules

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrimengModule } from './_primeng/primeng.module';
import { HeaderComponent } from '../core/layout/client-layout/header/header.component';
import { AdminHeaderComponent } from '../core/layout/admin-layout/admin-header/admin-header.component';
import { AdminSidebarComponent } from '../core/layout/admin-layout/admin-sidebar/admin-sidebar.component';
import { BreadcrumbComponent } from '../core/layout/admin-layout/breadcrumb/breadcrumb.component';
import { AdminSidebarItemComponent } from '../core/layout/admin-layout/admin-sidebar/admin-siderbaritem.component';
import { BreadcrumbService } from '../core/services/breadcrumb.service';
import { AdminMenuService } from '../core/services/admin-menu.service';

// Shared components that will be used throughout the app



@NgModule({
  declarations: [
    // Shared components
    LoadingSpinnerComponent,
    PageHeaderComponent,
    FooterComponent,
    HeaderComponent,

    //Admin Shared
    AdminHeaderComponent,
    AdminSidebarComponent,
    BreadcrumbComponent,
    AdminSidebarItemComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule,
  ],
  exports: [
    // Re-export Angular modules
    CommonModule,
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule,
    
    // Re-export PrimeNG modules
  
    
    // Export shared components
    LoadingSpinnerComponent,
    PageHeaderComponent,
    FooterComponent,
    HeaderComponent,


    AdminHeaderComponent,
    AdminSidebarComponent,
    BreadcrumbComponent,
  ],
  providers: [
    // Add any shared services here
    BreadcrumbService,
    AdminMenuService,
  ]
})
export class SharedModule { }