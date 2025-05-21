// src/app/features/apartments/apartments.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { AuthGuard } from '../../core/authentication/auth.guard';
import { ApartmentListComponent } from './pages/apartment-list/apartment-list.component';
import { ApartmentCardComponent } from './components/apartment-card/apartment-card.component';
import { ApartmentDetailComponent } from './pages/apartment-detail/apartment-detail.component';
import { ApartmentGalleryComponent } from './components/apartment-gallery/apartment-gallery.component';
import { ApartmentCreateComponent } from './pages/apartment-create/apartment-create.component';
import { ApartmentEditComponent } from './pages/apartment-edit/apartment-edit.component';
import { DateRangePickerComponent } from '../../shared/components/date-range-picker/date-range-picker.component';
import { GuestSelectorComponent } from '../../shared/components/guest-selector/guest-selector.component';

const routes: Routes = [
  {
    path: '',
    component: ApartmentListComponent,
  },
  {
    path: 'create',
    component: ApartmentCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: ApartmentDetailComponent,
  },
  {
    path: ':id/edit',
    component: ApartmentEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    ApartmentListComponent,
    ApartmentDetailComponent,
    ApartmentCreateComponent,
    ApartmentEditComponent,
    ApartmentCardComponent,
    ApartmentGalleryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class ApartmentsModule {}
