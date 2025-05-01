// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './core/layout/client-layout/client-layout.component';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';

// Import your auth guard for admin routes
// import { AdminGuard } from './core/authentication/guards/admin.guard';

const routes: Routes = [
  // Client routes
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren :() => import('./features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'apartements',
        loadChildren: () => import('./features/apartements/apartements.module').then(m => m.ApartmentsModule)
      }
      
    ]
  },
  
  // Admin routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    // Uncomment when you have the guard implemented
    // canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
     
    ]
  },
  
  // Wildcard route for 404
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }