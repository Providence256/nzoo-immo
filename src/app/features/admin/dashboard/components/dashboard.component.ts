import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../../../../core/services/breadcrumb.service";
import { CustomerService } from "../../../../core/services/customer.service";



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
  })
  
  export class DashboardComponent implements OnInit {
    statuses = [
        { label: 'All', count: 6, value: 'all' },
        { label: 'Pending', count: 2, value: 'pending' },
        { label: 'Active', count: 2, value: 'active' },
        { label: 'Completed', count: 2, value: 'completed' }
      ];

      customers!: []
    
      selectedStatus = 'all';
    constructor(private customerService: CustomerService, 
      private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
          { label: 'Dashboard', routerLink: ['/admin/dashboard'] }
        ]);
       }
    ngOnInit() {
       this.customerService.getCustomersSmall().then((customers)=> (this.customers = customers));
    }


    selectStatus(status: string) {
        this.selectedStatus = status;
      }
  }