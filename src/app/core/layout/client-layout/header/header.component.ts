import { Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('dropdownAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    trigger('slideInFade', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      state('out', style({ opacity: 0, transform: 'translateX(-20px)' })),
      transition('out => in', [
        animate('{{delay}}ms 200ms ease-out')
      ])
    ])
  ]
})
export class HeaderComponent {
  isMenuOpen = false;
  isMobileView = false;
  isDropdownOpen = false;
  isAtTop = true;

  navLinks = [
    { title: 'Accueil', url: '#accueil' },
    { title: 'Nos Villes', url: '#villes' },
    { title: 'Nos Services', url: '#services' },
    { title: 'Contact', url: '#contact' }
  ];

  userMenuItems = [
    { title: 'Se connecter', url: '/login', icon: 'login' },
    { title: 'S\'inscrire', url: '/register', icon: 'person_add' },
    { title: 'Mes Favoris', url: '/favorites', icon: 'favorite' },
    { title: 'Mes Recherches', url: '/searches', icon: 'saved_search' },
    { title: 'Profil', url: '/profile', icon: 'person' },
    { title: 'Paramètres', url: '/settings', icon: 'settings' },
    { title: 'Déconnexion', url: '/logout', icon: 'logout' }
  ];

  constructor() {
    this.checkScreenSize();
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


  

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownButton && !dropdownButton.contains(event.target as Node) &&
        dropdownMenu && !dropdownMenu.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isAtTop = window.scrollY < 20;
  }
}