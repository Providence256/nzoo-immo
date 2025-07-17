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
import { NewAnnonceComponent } from './saisies/pages/new annonce/new-annonce.component';
import { SousTypeHebergementComponent } from './files/pages/sous-type-hebergement/sous-type-hebergement.component';
import { AdminHostRequestComponent } from './parametres/pages/host/admin-host-request.component';
import { HostCalendarComponent } from './host/pages/host-calendar/host-calendar.component';
import { HostIntroductionComponent } from './host/pages/host-introduction/host-introduction.component';
import { PhotoUploadComponent } from './saisies/components/photo-upload/photo-upload.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BathroomTypesComponent } from './files/pages/bathroom-types/bathroom-types.component';
import { DiscountComponent } from './files/pages/discount/discount.component';
import { EditAnnonceComponent } from './saisies/pages/edit-annonce/edit-annonce.component';
import { BasicInfoSectionComponent } from './saisies/components/sections/basic-info-section.component';
import { DiscountInputComponent } from './saisies/components/sections/discount-input.component';
import { PricingSectionComponent } from './saisies/components/sections/pricing-section.component';
import { SidebarNavigationComponent } from './saisies/components/shared/sidebar-navigation.component';
import { PhotosSectionComponent } from './saisies/components/sections/photos-section.component';
import { AvailabilitySettingComponent } from './saisies/components/sections/availability-settings.component';
import { AmenitiesSectionComponent } from './saisies/components/sections/amenities-section.component';
import { GuestSectionComponent } from './saisies/components/sections/guest-section.component';
import { LocationSectionComponent } from './saisies/components/sections/location-section.component';
import { RulesSectionComponent } from './saisies/components/sections/rules-section.component';

// Admin Guard
// import { AdminGuard } from '../../core/authentication/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'files',
    loadChildren: () =>
      import('../admin/files/files.module').then((m) => m.FilesModule),
  },
  {
    path: 'saisies',
    loadChildren: () =>
      import('../admin/saisies/saisies.module').then((m) => m.SaisiesModule),
  },
  {
    path: 'host',
    loadChildren: () =>
      import('../admin/host/hosts.module').then((m) => m.HostsModule),
  },
  {
    path: 'parametres',
    loadChildren: () =>
      import('../admin/parametres/parametres.module').then(
        (m) => m.ParametresModule
      ),
  },

  // Add other admin routes here
];

@NgModule({
  declarations: [
    DashboardComponent,
    VillesComponent,
    CommunesComponent,
    SousTypeHebergementComponent,
    TypeHebergementComponent,
    BathroomTypesComponent,
    EquipementsComponent,
    DiscountComponent,
    DevisesComponent,
    ReglesComponent,
    TauxChangeComponent,
    AddAnnonceComponent,
    ListAnnoncesComponent,
    NewAnnonceComponent,
    EditAnnonceComponent,
    AdminHostRequestComponent,
    HostCalendarComponent,
    HostIntroductionComponent,
    PhotoUploadComponent,
    SidebarNavigationComponent,
    PhotosSectionComponent,
    BasicInfoSectionComponent,
    PricingSectionComponent,
    DiscountInputComponent,
    AvailabilitySettingComponent,
    AmenitiesSectionComponent,
    GuestSectionComponent,
    AmenitiesSectionComponent,
    LocationSectionComponent,
    RulesSectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    PrimengModule,
    DragDropModule,
  ],
})
export class AdminModule {}
