import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../../../../core/services/breadcrumb.service";
import { CustomerService } from "../../../../core/services/customer.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  // Reservation status filter options
  statuses = [
    { label: 'All', count: 6, value: 'all' },
    { label: 'Pending', count: 2, value: 'pending' },
    { label: 'Active', count: 2, value: 'active' },
    { label: 'Completed', count: 2, value: 'completed' }
  ];

  customers: any = [];
  selectedStatus = 'all';
  
  // For Chart
  selectedChartView = 'monthly';
  chartViewOptions = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ];
  
  bookingChartData: any;
  chartOptions: any;

  // Customer status mapping for display
  private statusMap: { [key: string]: string } = {};

  constructor(
    private customerService: CustomerService, 
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard', routerLink: ['/admin/dashboard'] }
    ]);
    
    // Initialize customer status mapping
    this.initStatusMap();
    
    // Initialize chart data
    this.initChartData();
    this.initChartOptions();
  }

  ngOnInit() {
    this.customerService.getCustomersSmall().then((customers) => {
      this.customers = customers;
    });
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    // Here you would normally filter the data based on the selected status
  }

  // Helper methods for random data generation in template
  getRandomStatus(customer: any): string {
    // Use customer ID as a seed for consistent random values per customer
    const id = parseInt(customer.id);
    const statuses = ['confirmed', 'pending', 'cancelled', 'active'];
    return statuses[id % statuses.length];
  }

  getRandomAmount(customer: any): string {
    // Use customer ID for consistent random amounts
    const id = parseInt(customer.id);
    const baseAmount = 150;
    const amount = baseAmount + (id * 37) % 300;
    return amount.toFixed(2);
  }

  private initStatusMap() {
    this.statusMap = {
      '1': 'confirmed',
      '2': 'pending',
      '3': 'cancelled',
      '4': 'active',
      '5': 'confirmed',
      '6': 'pending'
    };
  }

  private initChartData() {
    // Sample data for the booking chart
    this.bookingChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Bookings',
          data: [28, 35, 42, 56, 48, 65, 59],
          fill: false,
          borderColor: '#4361ee',
          tension: 0.4
        },
        {
          label: 'Revenue ($1000)',
          data: [12, 15, 18, 24, 27, 32, 29],
          fill: false,
          borderColor: '#2ec4b6',
          tension: 0.4
        }
      ]
    };
  }

  private initChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    };
  }
}