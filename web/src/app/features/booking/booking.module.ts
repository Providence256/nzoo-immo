import { RouterModule, Routes } from '@angular/router';
import { BookingConfirmationComponent } from './pages/confirm-booking/booking-confirmation.component';
import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BookingComponent } from './pages/booking-detail/booking.component';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';
import { ModifyDateComponent } from './components/modify-date/modify-date.component';
import { ModifyGuestComponent } from './components/modify-guest/modify-guest.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthGuard } from '../../core/authentication/auth.guard';

const routes: Routes = [
  {
    path: 'payment',
    canActivate: [AuthGuard],
    component: BookingComponent,
  },
  {
    path: 'confirm',
    component: BookingConfirmationComponent,
  },
];

@NgModule({
  declarations: [
    BookingConfirmationComponent,
    BookingComponent,
    BookingSummaryComponent,
    ModifyDateComponent,
    ModifyGuestComponent,
  ],
  providers: [DialogService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    JsonPipe,
  ],
  exports: [BookingSummaryComponent, ModifyDateComponent],
})
export class BookingModule {}
