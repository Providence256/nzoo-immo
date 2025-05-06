// src/app/features/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

// Admin Components
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { PrimengModule } from '../../shared/_primeng/primeng.module';
import { VillesComponent } from './files/pages/villes/villes.component';
import { CommunesComponent } from './files/pages/communes/communes.component';
import { TypeHebergementComponent } from './files/pages/type-hergement/type-hebergement.component';
import { EquipementsComponent } from './files/pages/equipements/equipements.component';
import { DevisesComponent } from './files/pages/devises/devises.component';
import { ReglesComponent } from './files/pages/regles/regles.component';
import { TauxChangeComponent } from './saisies/pages/taux-changes/taux-change.component';
import { AddAnnonceComponent } from './saisies/pages/add-annonce/add-annonce.component';
import { ListAnnoncesComponent } from './saisies/pages/list-annonce/list-annonces.component';

// Admin Guard
// import { AdminGuard } from '../../core/authentication/guards/admin.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent 
  },
  {
    path: 'files',
    loadChildren: ()=> import('../admin/files/files.module').then((m)=> m.FilesModule)
  },
  {
    path: 'saisies',
    loadChildren: () => import('../admin/saisies/saisies.module').then((m) => m.SaisiesModule)
  }
  
  // Add other admin routes here
];

@NgModule({
  declarations: [
    DashboardComponent,
    VillesComponent,
    CommunesComponent,
    TypeHebergementComponent,
    EquipementsComponent,
    DevisesComponent,
    ReglesComponent,
    TauxChangeComponent,
    AddAnnonceComponent,
    ListAnnoncesComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    PrimengModule,
    
  ]
})
export class AdminModule { }