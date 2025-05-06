import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TauxChangeComponent } from "./pages/taux-changes/taux-change.component";
import { AddAnnonceComponent } from "./pages/add-annonce/add-annonce.component";
import { ListAnnoncesComponent } from "./pages/list-annonce/list-annonces.component";





const routes : Routes = [
    {
        path: 'taux-change',
        component: TauxChangeComponent
    },
    {
        path: 'add-annonce',
        component: AddAnnonceComponent
    },
    {
        path: 'list-annonce',
        component: ListAnnoncesComponent
    }
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        ReactiveFormsModule,
    ],
})

export class SaisiesModule {}