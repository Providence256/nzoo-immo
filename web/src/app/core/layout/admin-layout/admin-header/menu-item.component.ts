// src/app/shared/interfaces/menu.interfaces.ts
export interface MenuItem {
  key: string;
  label: string;
  icon: string;
  path?: string;
  items?: SubMenuItem[];
  roles?: string[]; // Rôles autorisés pour ce menu
  badge?: string; // Badge optionnel
  badgeClass?: string; // Classes CSS pour le badge
}

export interface SubMenuItem {
  path: string;
  label: string;
  icon: string;
  roles?: string[]; // Rôles autorisés pour ce sous-menu
  badge?: string; // Badge optionnel
  badgeClass?: string; // Classes CSS pour le badge
}

export interface UserRole {
  key: string;
  label: string;
  displayName: string;
  permissions: string[];
  color: {
    bg: string;
    text: string;
    gradient: string;
  };
}

// Configuration des rôles utilisateurs
export const USER_ROLES: { [key: string]: UserRole } = {
  Root: {
    key: 'Root',
    label: 'Root',
    displayName: 'Super Admin',
    permissions: ['*'], // Toutes les permissions
    color: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      text: 'text-purple-800',
      gradient: 'from-purple-100 to-purple-200',
    },
  },
  admin: {
    key: 'admin',
    label: 'admin',
    displayName: 'Administrateur',
    permissions: [
      'manage_users',
      'manage_settings',
      'view_analytics',
      'manage_content',
      'manage_system',
      'manage_files',
      'manage_data_entry',
      'manage_parameters',
    ],
    color: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      text: 'text-blue-800',
      gradient: 'from-blue-100 to-blue-200',
    },
  },
  Host: {
    key: 'Host',
    label: 'Host',
    displayName: 'Hôte',
    permissions: [
      'manage_properties',
      'manage_bookings',
      'view_calendar',
      'manage_messages',
      'view_finances',
      'manage_announcements',
    ],
    color: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      text: 'text-green-800',
      gradient: 'from-green-100 to-green-200',
    },
  },
  client: {
    key: 'client',
    label: 'client',
    displayName: 'Client',
    permissions: [
      'view_properties',
      'make_bookings',
      'view_profile',
      'send_messages',
    ],
    color: {
      bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
      text: 'text-gray-800',
      gradient: 'from-gray-100 to-gray-200',
    },
  },
};

// Configuration des menus par rôle
export const MENU_CONFIG: { [key: string]: MenuItem[] } = {
  admin: [
    {
      key: 'elements',
      label: 'Éléments',
      icon: 'pi-box',
      roles: ['admin', 'Root'],
      items: [
        {
          path: '/admin/files/villes',
          label: 'Villes',
          icon: 'pi-map-marker',
          roles: ['admin', 'Root'],
        },
        {
          path: '/admin/files/communes',
          label: 'Communes',
          icon: 'pi-address-book',
          roles: ['admin', 'Root'],
        },
        {
          path: '/admin/files/sous-type-hebergement',
          label: 'Sous Type hébergement',
          icon: 'pi-building',
          roles: ['admin', 'Root'],
        },
        {
          path: '/admin/files/type-hebergement',
          label: 'Type hébergement',
          icon: 'pi-building-columns',
          roles: ['admin', 'Root'],
        },
        {
          path: '/admin/files/equipements',
          label: 'Équipements',
          icon: 'pi-folder',
          roles: ['admin', 'Root'],
        },
        {
          path: '/admin/files/devises',
          label: 'Devises',
          icon: 'pi-wallet',
          roles: ['admin', 'Root'],
        },
        {
          path: '/admin/files/regles',
          label: 'Règles',
          icon: 'pi-key',
          roles: ['admin', 'Root'],
        },
      ],
    },
    {
      key: 'saisie',
      label: 'Saisie',
      icon: 'pi-print',
      roles: ['admin', 'Root'],
      items: [
        {
          path: '/admin/saisies/taux-change',
          label: 'Cours de change',
          icon: 'pi-dollar',
          roles: ['admin', 'Root'],
        },
        {
          path: '/admin/saisies/list-annonce',
          label: 'Annonces',
          icon: 'pi-building',
          roles: ['admin', 'Root'],
        },
      ],
    },
    {
      key: 'parametres',
      label: 'Paramètres',
      icon: 'pi-cog',
      roles: ['admin', 'Root'],
      items: [
        {
          path: '/admin/parametres/societe',
          label: 'Paramètre société',
          icon: 'pi-wrench',
          roles: ['admin', 'Root'],
        },
        {
          path: '/admin/parametres/host',
          label: 'Hôtes',
          icon: 'pi-users',
          roles: ['admin', 'Root'],
        },
        {
          path: '/admin/parametres/utilisateurs',
          label: 'Utilisateurs',
          icon: 'pi-user',
          roles: ['Root'], // Seul le Root peut gérer les utilisateurs
        },
      ],
    },
  ],

  Host: [
    {
      key: 'calendar',
      label: 'Calendrier',
      icon: 'pi-calendar',
      path: '/admin/host/calendar',
      roles: ['Host'],
    },
    {
      key: 'annonces',
      label: 'Annonces',
      icon: 'pi-home',
      path: '/admin/host/annonces',
      roles: ['Host'],
    },
    {
      key: 'reservations',
      label: 'Réservations',
      icon: 'pi-bookmark',
      path: '/host/reservations',
      roles: ['Host'],
      // items: [
      //   {
      //     path: '/host/reservations/en-attente',
      //     label: 'En attente',
      //     icon: 'pi-clock',
      //     roles: ['Host'],
      //     badge: '3',
      //     badgeClass: 'bg-yellow-500',
      //   },
      //   {
      //     path: '/host/reservations/confirmees',
      //     label: 'Confirmées',
      //     icon: 'pi-check-circle',
      //     roles: ['Host'],
      //   },
      //   {
      //     path: '/host/reservations/en-cours',
      //     label: 'En cours',
      //     icon: 'pi-play-circle',
      //     roles: ['Host'],
      //   },
      //   {
      //     path: '/host/reservations/terminees',
      //     label: 'Terminées',
      //     icon: 'pi-check',
      //     roles: ['Host'],
      //   },
      //   {
      //     path: '/host/reservations/annulees',
      //     label: 'Annulées',
      //     icon: 'pi-times-circle',
      //     roles: ['Host'],
      //   },
      // ],
    },
    // {
    //   key: 'finances',
    //   label: 'Finances',
    //   icon: 'pi-chart-line',
    //   roles: ['Host'],
    //   items: [
    //     {
    //       path: '/host/finances/revenus',
    //       label: 'Revenus',
    //       icon: 'pi-dollar',
    //       roles: ['Host'],
    //     },
    //     {
    //       path: '/host/finances/paiements',
    //       label: 'Paiements',
    //       icon: 'pi-credit-card',
    //       roles: ['Host'],
    //     },
    //     {
    //       path: '/host/finances/rapports',
    //       label: 'Rapports',
    //       icon: 'pi-file-pdf',
    //       roles: ['Host'],
    //     },
    //   ],
    // },
    // {
    //   key: 'messages',
    //   label: 'Messages',
    //   icon: 'pi-comments',
    //   path: '/host/messages',
    //   roles: ['Host'],
    //   badge: '5',
    //   badgeClass: 'bg-red-500',
    // },
  ],

  client: [
    {
      key: 'search',
      label: 'Rechercher',
      icon: 'pi-search',
      path: '/client/search',
      roles: ['client'],
    },
    {
      key: 'bookings',
      label: 'Mes Réservations',
      icon: 'pi-calendar',
      path: '/client/bookings',
      roles: ['client'],
    },
    {
      key: 'favorites',
      label: 'Favoris',
      icon: 'pi-heart',
      path: '/client/favorites',
      roles: ['client'],
    },
    {
      key: 'messages',
      label: 'Messages',
      icon: 'pi-comments',
      path: '/client/messages',
      roles: ['client'],
    },
  ],
};

// Utilitaires pour la gestion des permissions
export class PermissionUtils {
  static hasPermission(userRole: string, permission: string): boolean {
    const role = USER_ROLES[userRole];
    if (!role) return false;

    // Root a toutes les permissions
    if (role.permissions.includes('*')) return true;

    return role.permissions.includes(permission);
  }

  static canAccessMenuItem(userRole: string, menuItem: MenuItem): boolean {
    if (!menuItem.roles || menuItem.roles.length === 0) return true;
    return menuItem.roles.includes(userRole);
  }

  static canAccessSubMenuItem(
    userRole: string,
    subMenuItem: SubMenuItem
  ): boolean {
    if (!subMenuItem.roles || subMenuItem.roles.length === 0) return true;
    return subMenuItem.roles.includes(userRole);
  }

  static filterMenuItems(userRole: string, menuItems: MenuItem[]): MenuItem[] {
    return menuItems
      .filter((item) => this.canAccessMenuItem(userRole, item))
      .map((item) => ({
        ...item,
        items: item.items
          ? item.items.filter((subItem) =>
              this.canAccessSubMenuItem(userRole, subItem)
            )
          : undefined,
      }))
      .filter((item) => !item.items || item.items.length > 0); // Retirer les menus sans sous-éléments accessibles
  }

  static getRoleConfig(userRole: string): UserRole | null {
    return USER_ROLES[userRole] || null;
  }

  static getAllowedRoles(userRole: string): string[] {
    // Un utilisateur peut avoir plusieurs rôles selon la logique métier
    const roles = [userRole];

    // Root peut avoir accès aux fonctionnalités admin
    if (userRole === 'Root') {
      roles.push('admin');
    }

    return roles;
  }
}
