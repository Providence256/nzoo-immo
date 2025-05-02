// src/app/core/layouts/client-layout/client-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit {
  menuItems: MenuItem[] = [];
  mobileMenuVisible: boolean = false;

  constructor() {}

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: ['/']
      },
      {
        label: 'Appartements',
        icon: 'pi pi-building',
        routerLink: ['/apartments']
      },
      {
        label: 'Réservations',
        icon: 'pi pi-calendar',
        routerLink: ['/booking']
      },
      {
        label: 'Comparaison',
        icon: 'pi pi-chart-bar',
        routerLink: ['/price-comparison']
      },
      {
        label: 'Mon Profil',
        icon: 'pi pi-user',
        routerLink: ['/user-profile']
      }
    ];
  }

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}