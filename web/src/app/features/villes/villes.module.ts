// src/app/features/villes/villes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NosVillesComponent } from './components/nos-villes/nos-villes.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NosVillesComponent,
  },
];

@NgModule({
  declarations: [NosVillesComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class VillesModule {}
