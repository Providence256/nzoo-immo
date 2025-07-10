import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TauxChangeComponent } from './pages/taux-changes/taux-change.component';
import { AddAnnonceComponent } from './pages/add-annonce/add-annonce.component';
import { ListAnnoncesComponent } from './pages/list-annonce/list-annonces.component';
import { NewAnnonceComponent } from './pages/new annonce/new-annonce.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditAnnonceComponent } from './pages/edit-annonce/edit-annonce.component';

const routes: Routes = [
  {
    path: 'taux-change',
    component: TauxChangeComponent,
  },
  {
    path: 'add-annonce',
    component: AddAnnonceComponent,
  },
  {
    path: 'new-annonce',
    component: NewAnnonceComponent,
  },
  {
    path: 'list-annonce',
    component: ListAnnoncesComponent,
  },
  {
    path: 'edit-annonce',
    component: EditAnnonceComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
})
export class SaisiesModule {}
