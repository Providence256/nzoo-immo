// src/app/core/layouts/admin-layout/admin-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent  {
  
  sidebarActive!: boolean
  menuClick!: boolean
  menuMobileActive: boolean = false
  menuHoverActive!: boolean
  megaMenuMobileActive!: boolean
  megaMenuMobileClick!: boolean
  megaMenuClick!: boolean
  megaMenuActive!: boolean

  onLayoutClick(){
      if(!this.megaMenuClick){
          this.megaMenuActive = false;
      }

      if(!this.menuClick){
          if(this.menuMobileActive && this.isMobile()){
              this.menuMobileActive = false;
          }

          this.menuHoverActive = false;
      }

      this.menuClick = false;
      this.megaMenuMobileClick = false;
      this.megaMenuClick = false;
  }

  onMenuButtonClick(event: any){
      this.menuClick = true;
     if(this.isMobile()){
      this.menuMobileActive = !this.menuMobileActive;
     }

     event.preventDefault();
  }

  isMobile(){
      return window.innerWidth <= 991;
  }

  isDesktop(){
      return window.innerWidth > 991;
  }
}