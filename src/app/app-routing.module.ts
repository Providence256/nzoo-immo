// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/apartements/apartements.module').then(m => m.ApartmentsModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./features/booking/booking.module').then(m => m.BookingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payments',
    loadChildren: () => import('./features/payments/payments.module').then(m => m.PaymentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'compare',
    loadChildren: () => import('./features/price-comparison/price-comparison.module').then(m => m.PriceComparisonModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }