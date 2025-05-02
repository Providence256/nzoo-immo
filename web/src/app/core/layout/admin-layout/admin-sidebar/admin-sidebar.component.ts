import { Component, OnInit } from '@angular/core';
import { AdminLayoutComponent } from '../admin-layout.component';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent implements OnInit {

  model: any[] = [];

  sidebarOpen = false;
  isMobileView = window.innerWidth <= 991;
  baseMenuOpen: boolean = false;

  constructor(public appMain:AdminLayoutComponent ){}
  ngOnInit() {
    this.model = [
       {label: 'Tableau de Bord', icon: 'pi pi-fw pi-home', routerLink: ['dashboard']},
       {
        label: 'Élément de base', 
        icon: 'pi pi-fw pi-box', 
        routerLink: ['/admin/files'],
        items:[
          {
            label: 'Villes',
            icon: 'pi pi-map-marker',
            routerLink: ['/admin/files/villes'],
            
          },
          {
            label: 'Communes',
            icon: 'pi pi-address-book',
            routerLink: ['/admin/files/communes'],
            
          },
          {
            label: 'Type hebergement',
            icon: 'pi pi-building-columns',
            routerLink: ['/admin/files/type-hebergement'],
          },
          {
            label: 'Equipements',
            icon: 'pi pi-fw pi-folder',
            routerLink: ['/admin/files/equipements'],
          },
          {
            label: 'Devises',
            icon: 'pi pi-wallet',
            routerLink: ['/admin/files/devises'],
          },
          {
            label: 'Regles',
            icon: 'pi pi-key',
            routerLink: ['/admin/files/regles'],
          },
         

        ]
      },

      {
        label: 'Saisie', 
        icon: 'pi pi-fw pi-print', 
        routerLink: ['/admin/saisies'],
        items:[
          {
            label: 'Cours de change',
            icon: 'pi pi-dollar',
            routerLink: ['/admin/saisies/taux-change']
          },
          {
            label: 'Annonces',
            icon: 'pi pi-building',
            routerLink: ['/admin/saisies/admin-annonces/list-annonce']
          }
        ]
      },
      {
        label: 'Parametres généraux', 
        icon: 'pi pi-fw pi-cog', 
        routerLink: ['/admin/parametres'],
        items:[
          {
            label: 'Parametre société',
            icon: 'pi pi-wrench',
            routerLink: ['/admin/parametres/societe']
          },
          {
            label: 'Utilisateurs',
            icon: 'pi pi-user',
            routerLink: ['/']
          }
        ]
      },
    ]
    
  }

 
  toggleBaseMenu() {
    this.baseMenuOpen = !this.baseMenuOpen;
  }

  onMenuClick(){
      this.appMain.menuClick = true;
  }

}
