import { Component } from "@angular/core";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";




@Component({
    selector: 'app-list-annonces',
    templateUrl : './list-annonces.component.html',
})

export class ListAnnoncesComponent {

    constructor(private breadcrumbService: BreadcrumbService){
       this.breadcrumbService.setItems([
            {label: 'Saisies'},
            {label: 'annonces', routerLink:'/saisies/admin-annonces/'}
        ])
    }
}