import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthService, User } from '../../../authentication/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('dropdownAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
    trigger('slideInFade', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      state('out', style({ opacity: 0, transform: 'translateX(-20px)' })),
      transition('out => in', [animate('{{delay}}ms 200ms ease-out')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isMobileView = false;
  isDropdownOpen = false;
  isAtTop = true;
  user: User | null = null;
  currentRoute = '';

  private userSub!: Subscription;
  private routerSub!: Subscription;

  navLinks = [
    { title: 'Accueil', url: '/', routes: ['/', '/home'] },
    { title: 'Nos Villes', url: '/nos-villes', routes: ['/nos-villes'] },
    { title: 'Nos Services', url: '/', routes: ['/'] },
    { title: 'Contact', url: '/contact', routes: ['/contact'] },
  ];

  userMenuItems: any = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private eRef: ElementRef
  ) {
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.trackRouteChanges();
  }

  private clientMenuItems = [
    { title: 'Mes Favoris', url: '/favorites', icon: 'favorite' },
    { title: 'Profil', url: '/profile', icon: 'person' },
  ];

  private adminMenuItems = [
    {
      title: 'Admin Tableau de bord',
      url: '/admin/dashboard',
      icon: 'admin_panel_settings',
    },
  ];

  private getCurrentUser() {
    this.userSub = this.authService.currentUser$.subscribe((user) => {
      this.user = user;

      this.userMenuItems = [...this.clientMenuItems];

      const role = this.authService.isAdmin();

      if (role) {
        this.userMenuItems = [...this.adminMenuItems];
      }
    });
  }

  private trackRouteChanges() {
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });

    // Set initial route
    this.currentRoute = this.router.url;
  }

  // Méthode pour vérifier si un lien est actif
  isLinkActive(link: any): boolean {
    if (!this.currentRoute) return false;

    // Vérifier si la route courante correspond à l'une des routes du lien
    return link.routes.some((route: string) => {
      if (route === '/' && this.currentRoute === '/') {
        return true;
      }
      if (route !== '/' && this.currentRoute.startsWith(route)) {
        return true;
      }
      return false;
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobileView = window.innerWidth < 768;
    if (!this.isMobileView) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isAtTop = window.scrollY < 20;
  }
}
