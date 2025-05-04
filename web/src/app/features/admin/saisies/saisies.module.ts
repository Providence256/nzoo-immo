import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TauxChangeComponent } from "./pages/taux-changes/taux-change.component";





const routes : Routes = [
    {
        path: 'taux-change',
        component: TauxChangeComponent
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