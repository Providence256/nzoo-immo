import { RouterModule, Routes } from "@angular/router";
import { BookingConfirmationComponent } from "./pages/confirm-booking/booking-confirmation.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { BookingComponent } from "./pages/booking-detail/booking.component";


const routes : Routes = [
    {
        path: '',
        component: BookingComponent,
    },
    {
        path: ':id',
        component: BookingConfirmationComponent,
    }
]

@NgModule({
    declarations: [
        BookingConfirmationComponent,
        BookingComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule,
    ]
})

export class BookingModule {}