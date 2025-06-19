// src/app/shared/services/menu.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import {
  MENU_CONFIG,
  MenuItem,
  PermissionUtils,
  SubMenuItem,
  USER_ROLES,
  UserRole,
} from '../layout/admin-layout/admin-header/menu-item.component';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);
  public menuItems$ = this.menuItemsSubject.asObservable();

  private currentRoleSubject = new BehaviorSubject<string>('');
  public currentRole$ = this.currentRoleSubject.asObservable();

  constructor(private authService: AuthService) {
    this.initializeMenu();
  }

  private initializeMenu(): void {
    // Écouter les changements de l'utilisateur connecté
    this.authService.currentUser$.subscribe((user) => {
      const role = user?.role || '';
      this.currentRoleSubject.next(role);
      this.updateMenuItems(role);
    });
  }

  private updateMenuItems(userRole: string): void {
    if (!userRole) {
      this.menuItemsSubject.next([]);
      return;
    }

    const roleMenuItems = this.getMenuItemsForRole(userRole);
    const filteredItems = PermissionUtils.filterMenuItems(
      userRole,
      roleMenuItems
    );
    this.menuItemsSubject.next(filteredItems);
  }

  /**
   * Récupère les éléments de menu pour un rôle spécifique
   */
  public getMenuItemsForRole(userRole: string): MenuItem[] {
    // Gestion des rôles multiples
    const allowedRoles = PermissionUtils.getAllowedRoles(userRole);
    let menuItems: MenuItem[] = [];

    for (const role of allowedRoles) {
      const roleMenuItems = MENU_CONFIG[role] || [];
      menuItems = [...menuItems, ...roleMenuItems];
    }

    // Suppression des doublons basée sur la clé
    const uniqueMenuItems = menuItems.filter(
      (item, index, self) => self.findIndex((i) => i.key === item.key) === index
    );

    return uniqueMenuItems;
  }

  /**
   * Vérifie si l'utilisateur peut accéder à un élément de menu
   */
  public canAccessMenuItem(userRole: string, menuItem: MenuItem): boolean {
    return PermissionUtils.canAccessMenuItem(userRole, menuItem);
  }

  /**
   * Vérifie si l'utilisateur peut accéder à un sous-élément de menu
   */
  public canAccessSubMenuItem(
    userRole: string,
    subMenuItem: SubMenuItem
  ): boolean {
    return PermissionUtils.canAccessSubMenuItem(userRole, subMenuItem);
  }

  /**
   * Récupère la configuration d'un rôle
   */
  public getRoleConfig(userRole: string): UserRole | null {
    return PermissionUtils.getRoleConfig(userRole);
  }

  /**
   * Vérifie si l'utilisateur a une permission spécifique
   */
  public hasPermission(userRole: string, permission: string): boolean {
    return PermissionUtils.hasPermission(userRole, permission);
  }

  /**
   * Récupère le nom d'affichage d'un rôle
   */
  public getRoleDisplayName(userRole: string): string {
    const roleConfig = this.getRoleConfig(userRole);
    return roleConfig?.displayName || 'Utilisateur';
  }

  /**
   * Récupère les classes CSS pour un rôle
   */
  public getRoleClasses(userRole: string): any {
    const roleConfig = this.getRoleConfig(userRole);
    return roleConfig?.color || USER_ROLES['client'].color;
  }

  /**
   * Récupère la route du dashboard selon le rôle
   */
  public getDashboardRoute(userRole: string): string {
    switch (userRole) {
      case 'Root':
      case 'admin':
        return '/admin/dashboard';
      case 'Host':
        return '/host/dashboard';
      case 'client':
        return '/client/dashboard';
      default:
        return '/dashboard';
    }
  }

  /**
   * Récupère tous les rôles disponibles
   */
  public getAllRoles(): UserRole[] {
    return Object.values(USER_ROLES);
  }

  /**
   * Vérifie si un utilisateur peut changer de rôle
   */
  public canSwitchRole(currentRole: string, targetRole: string): boolean {
    // Logique pour déterminer si l'utilisateur peut changer de rôle
    // Par exemple, un utilisateur avec le rôle "admin" et "Host" peut switcher
    if (currentRole === 'Root') return true;

    // Ici vous pourriez avoir une logique plus complexe
    // basée sur les permissions de l'utilisateur
    return false;
  }

  /**
   * Méthode pour obtenir les éléments de menu avec badges
   */
  public getMenuItemsWithBadges(): Observable<MenuItem[]> {
    return combineLatest([this.menuItems$, this.currentRole$]).pipe(
      map(([menuItems, role]) => {
        return menuItems.map((item) => {
          // Ici vous pourriez ajouter une logique pour calculer les badges
          // basée sur des données en temps réel (notifications, etc.)
          return {
            ...item,
            items: item.items?.map((subItem) => ({
              ...subItem,
              // Exemple: calculer le badge pour les réservations en attente
              badge: this.calculateBadge(subItem.path, role),
              badgeClass: this.getBadgeClass(subItem.path),
            })),
          };
        });
      })
    );
  }

  private calculateBadge(path: string, role: string): string | undefined {
    // Logique pour calculer les badges basée sur le chemin et le rôle
    // Ceci devrait être remplacé par de vraies données
    switch (path) {
      case '/host/reservations/en-attente':
        return '3'; // Exemple: 3 réservations en attente
      case '/host/messages':
        return '5'; // Exemple: 5 nouveaux messages
      default:
        return undefined;
    }
  }

  private getBadgeClass(path: string): string {
    // Classes CSS pour les badges selon le type
    switch (path) {
      case '/host/reservations/en-attente':
        return 'bg-yellow-500';
      case '/host/messages':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }
}
