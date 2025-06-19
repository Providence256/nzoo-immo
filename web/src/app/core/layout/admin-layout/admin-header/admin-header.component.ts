// src/app/shared/components/admin-header/admin-header.component.ts
import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { AuthService, User } from '../../../authentication/auth.service';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { MenuItem, UserRole } from './menu-item.component';
import { MenuService } from '../../../services/admin-menu.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // User state
  currentUser: User | null = null;
  currentUserRole: string = '';
  roleConfig: UserRole | null = null;

  // Menu state
  menuItems: MenuItem[] = [];

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
    private authService: AuthService,
    private menuService: MenuService
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
    this.initializeSubscriptions();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeSubscriptions(): void {
    // Combiner les observables pour une gestion optimisée des états
    combineLatest([this.authService.currentUser$, this.menuService.menuItems$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([user, menuItems]) => {
        this.currentUser = user;
        this.currentUserRole = user?.role || '';
        this.roleConfig = this.menuService.getRoleConfig(this.currentUserRole);
        this.menuItems = menuItems;
      });
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

  // Role checking methods (simplifié grâce aux interfaces)
  isAdmin(): boolean {
    return this.currentUserRole === 'admin' || this.currentUserRole === 'Root';
  }

  isHost(): boolean {
    return this.currentUserRole === 'Host';
  }

  isClient(): boolean {
    return this.currentUserRole === 'client';
  }

  isRoot(): boolean {
    return this.currentUserRole === 'Root';
  }

  // Utilisation du service pour récupérer les menus
  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }

  // Méthodes pour vérifier les permissions
  hasPermission(permission: string): boolean {
    return this.menuService.hasPermission(this.currentUserRole, permission);
  }

  canAccessMenuItem(menuItem: MenuItem): boolean {
    return this.menuService.canAccessMenuItem(this.currentUserRole, menuItem);
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

  // Navigation methods (utilisant le service)
  getDashboardRoute(): string {
    return this.menuService.getDashboardRoute(this.currentUserRole);
  }

  getDisplayName(): string {
    return this.currentUser?.displayName || 'Utilisateur';
  }

  getDisplayEmail(): string {
    return this.currentUser?.email || '';
  }

  getRoleDisplayName(): string {
    return this.menuService.getRoleDisplayName(this.currentUserRole);
  }

  // Méthodes pour récupérer les classes CSS du rôle
  getRoleBadgeClasses(): string {
    if (!this.roleConfig) return 'from-gray-100 to-gray-200 text-gray-800';

    return `${this.roleConfig.color.gradient} ${this.roleConfig.color.text}`;
  }

  getRoleAvatarClasses(): string {
    if (!this.roleConfig) return 'bg-gradient-to-br from-gray-500 to-gray-600';

    return this.roleConfig.color.bg;
  }

  getRoleDropdownHeaderClasses(): string {
    if (!this.roleConfig) return 'bg-gradient-to-r from-gray-50 to-gray-100';

    const gradientClass = this.roleConfig.color.gradient.replace('to-', 'to-');
    return `bg-gradient-to-r ${gradientClass}`;
  }

  // Auth methods
  logout() {
    this.authService.logout();
    this.closeAllDropdowns();
  }

  // Role switching methods (améliorés)
  canSwitchToAdminMode(): boolean {
    return (
      this.menuService.canSwitchRole(this.currentUserRole, 'admin') &&
      (this.isAdmin() || this.isRoot())
    );
  }

  canSwitchToHostMode(): boolean {
    return (
      this.menuService.canSwitchRole(this.currentUserRole, 'Host') &&
      this.isHost()
    );
  }

  switchToAdminMode() {
    if (this.canSwitchToAdminMode()) {
      this.authService.updateUserRole('admin');
      this.closeAllDropdowns();
    }
  }

  switchToHostMode() {
    if (this.canSwitchToHostMode()) {
      this.authService.updateUserRole('Host');
      this.closeAllDropdowns();
    }
  }

  // Méthodes utilitaires pour le template
  trackByMenuItem(index: number, item: MenuItem): string {
    return item.key;
  }

  trackBySubMenuItem(index: number, item: any): string {
    return item.path;
  }

  // Méthode pour obtenir le badge d'un sous-élément
  getSubItemBadge(subItem: any): string | undefined {
    return subItem.badge;
  }

  getSubItemBadgeClass(subItem: any): string {
    return subItem.badgeClass || 'bg-gray-500';
  }

  // Méthode pour vérifier si un menu a des éléments visibles
  hasVisibleSubItems(menuItem: MenuItem): boolean {
    if (!menuItem.items) return false;

    return menuItem.items.some((subItem) =>
      this.menuService.canAccessSubMenuItem(this.currentUserRole, subItem)
    );
  }
}
