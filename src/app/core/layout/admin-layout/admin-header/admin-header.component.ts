import { Component, HostListener, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AdminLayoutComponent } from '../admin-layout.component';
import { AdminSidebarService } from '../../../services/admin-sidebar.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  dropdownOpen = false;
  isMobileView = false;

  constructor(
    private sidebarService: AdminSidebarService,
    public appMain: AdminLayoutComponent,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Add event listener to close dropdown when clicking outside
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.el.nativeElement.contains(e.target)) {
        this.dropdownOpen = false;
      }
    });
  }

  ngOnInit() {
    this.updateView();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateView();
  }

  toggleDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.dropdownOpen = !this.dropdownOpen;
  }

  private updateView() {
    this.isMobileView = window.innerWidth <= 991;
    
    // Close mobile menu when viewport becomes desktop
    if (!this.isMobileView && this.appMain.menuMobileActive) {
      this.appMain.menuMobileActive = false;
    }
  }
}