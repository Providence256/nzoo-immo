import { Component, HostListener } from '@angular/core';
import { AdminLayoutComponent } from '../admin-layout.component';
import { AdminSidebarService } from '../../../services/admin-sidebar.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {
  dropdownOpen = false;
  isMobileView = window.innerWidth <= 991;
  activeItem! : number



  constructor( private sidebarService: AdminSidebarService, public appMain: AdminLayoutComponent) {}


    @HostListener('window:resize', ['$event'])
    onResize() {
      this.updateView();
    }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  private updateView() {
    this.isMobileView = window.innerWidth <= 991;
    if (!this.isMobileView) {
      
    }
  }

  mobileMegaMenuItemClick(index:any){
    this.appMain.megaMenuMobileClick = true;
    this.activeItem = this.activeItem === index ? null : index;
    
  }

}
