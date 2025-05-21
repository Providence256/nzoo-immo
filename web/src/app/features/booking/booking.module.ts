import { RouterModule, Routes } from '@angular/router';
import { BookingConfirmationComponent } from './pages/confirm-booking/booking-confirmation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BookingComponent } from './pages/booking-detail/booking.component';
import { DateRangePickerComponent } from '../../shared/components/date-range-picker/date-range-picker.component';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';
import { ModifyDateComponent } from './components/modify-date/modify-date.component';
import { ModifyGuestComponent } from './components/modify-guest/modify-guest.component';

const routes: Routes = [
  {
    path: 'confirm',
    component: BookingComponent,
  },
  {
    path: ':id',
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [BookingSummaryComponent],
})
export class BookingModule {}
