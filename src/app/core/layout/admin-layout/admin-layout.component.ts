import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  // Menu state
  menuMobileActive = false;
  menuClick = false;
  
  // Screen size tracking
  private screenWidth = window.innerWidth;

  constructor() {}

  ngOnInit() {
    // Close menu on mobile devices if screen was resized to desktop
    this.handleScreenResize();
  }

  @HostListener('window:resize')
  handleScreenResize() {
    const newWidth = window.innerWidth;
    
    // Close mobile menu when resizing to desktop
    if (this.screenWidth <= 991 && newWidth > 991) {
      this.menuMobileActive = false;
    }
    
    this.screenWidth = newWidth;
  }

  onLayoutClick() {
    if (!this.menuClick) {
      // Close mobile menu when clicking outside
      if (this.menuMobileActive && this.isMobile()) {
        this.menuMobileActive = false;
      }
    }
    
    this.menuClick = false;
  }

  onMenuButtonClick(event: Event) {
    this.menuClick = true;
    this.menuMobileActive = !this.menuMobileActive;
    event.preventDefault();
  }

  isMobile(): boolean {
    return window.innerWidth <= 991;
  }

  isDesktop(): boolean {
    return window.innerWidth > 991;
  }
}