// src/app/core/layouts/admin-layout/admin-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  menuItems: MenuItem[] = [];
  sidebarVisible: boolean = true;
  isMobile: boolean = false;

  constructor() {
    this.checkScreenSize();
  }

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });

    this.menuItems = [
      {
        label: 'Tableau de bord',
        icon: 'pi pi-home',
        routerLink: ['/admin/dashboard']
      },
      {
        label: 'Appartements',
        icon: 'pi pi-building',
        routerLink: ['/admin/manage-apartments']
      },
      {
        label: 'Réservations',
        icon: 'pi pi-calendar',
        routerLink: ['/admin/manage-bookings']
      },
      {
        label: 'Utilisateurs',
        icon: 'pi pi-users',
        routerLink: ['/admin/manage-users']
      },
      {
        label: 'Paiements',
        icon: 'pi pi-credit-card',
        routerLink: ['/admin/payments']
      },
      {
        label: 'Statistiques',
        icon: 'pi pi-chart-line',
        routerLink: ['/admin/analytics']
      },
      {
        label: 'Paramètres',
        icon: 'pi pi-cog',
        routerLink: ['/admin/settings']
      }
    ];
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.sidebarVisible = false;
    } else {
      this.sidebarVisible = true;
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}