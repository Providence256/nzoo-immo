import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { AuthService } from '../../../authentication/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  // Dropdown states
  activeDropdown: string | null = null;
  userDropdownOpen = false;

  // Mobile states
  isMobileView = false;
  mobileMenuOpen = false;
  activeMobileSection: string | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService
  ) {
    // Close dropdowns when clicking outside
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.el.nativeElement.contains(e.target)) {
        this.closeAllDropdowns();
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

  private updateView() {
    this.isMobileView = window.innerWidth < 1024; // lg breakpoint

    // Close mobile menu when viewport becomes desktop
    if (!this.isMobileView && this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
      this.activeMobileSection = null;
    }
  }

  // Desktop dropdown methods
  toggleDropdown(dropdownName: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (this.activeDropdown === dropdownName) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = dropdownName;
    }

    // Close user dropdown if open
    this.userDropdownOpen = false;
  }

  toggleUserDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    this.userDropdownOpen = !this.userDropdownOpen;

    // Close navigation dropdowns
    this.activeDropdown = null;
  }

  closeAllDropdowns() {
    this.activeDropdown = null;
    this.userDropdownOpen = false;
  }

  // Mobile menu methods
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (!this.mobileMenuOpen) {
      this.activeMobileSection = null;
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.activeMobileSection = null;
  }

  toggleMobileSection(sectionName: string) {
    if (this.activeMobileSection === sectionName) {
      this.activeMobileSection = null;
    } else {
      this.activeMobileSection = sectionName;
    }
  }

  // Auth method
  logout() {
    this.authService.logout();
    this.closeAllDropdowns();
  }
}
