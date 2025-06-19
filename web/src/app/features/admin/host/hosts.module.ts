// src/app/features/admin/files/files.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HostCalendarComponent } from './pages/host-calendar/host-calendar.component';
import { HostIntroductionComponent } from './pages/host-introduction/host-introduction.component';

// Import files components

const routes: Routes = [
  {
    path: 'introduction',
    component: HostIntroductionComponent,
  },
  {
    path: 'calendar',
    component: HostCalendarComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class HostsModule {}
