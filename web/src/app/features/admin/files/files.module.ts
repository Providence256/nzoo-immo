// src/app/features/admin/files/files.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VillesComponent } from './pages/villes/villes.component';
import { CommunesComponent } from './pages/communes/communes.component';
import { TypeHebergementComponent } from './pages/type-hergement/type-hebergement.component';
import { EquipementsComponent } from './pages/equipements/equipements.component';
import { DevisesComponent } from './pages/devises/devises.component';
import { ReglesComponent } from './pages/regles/regles.component';

// Import files components

const routes: Routes = [
    {
        path: 'villes',
        component: VillesComponent,
        
    },
    {
      path: 'communes',
      component: CommunesComponent,
    },
    {
      path: 'type-hebergement',
      component: TypeHebergementComponent,
    },
    {
      path: 'equipements',
      component: EquipementsComponent
    },
    {
      path: 'devises',
      component: DevisesComponent,
    },
    {
      path: 'regles',
      component: ReglesComponent,
    }
  
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class FilesModule { }