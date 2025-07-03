import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

interface LocationSuggestion {
  name: string;
  region: string;
  coordinates?: { lat: number; lng: number };
}

interface SearchForm {
  location: string;
  propertyType: string;
  minPrice: number | null;
  maxPrice: number | null;
}

interface QuickFilter {
  label: string;
  type: string;
  value: any;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '800ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)', maxHeight: '0px' }),
        animate(
          '300ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'translateY(0)', maxHeight: '1000px' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({
            opacity: 0,
            transform: 'translateY(-10px)',
            maxHeight: '0px',
          })
        ),
      ]),
    ]),
  ],
})
export class BannerComponent {
  @ViewChild('videoContainer') videoContainer!: ElementRef;
  @ViewChild('locationInput') locationInput!: ElementRef;
  @ViewChild('mobileLocationInput') mobileLocationInput!: ElementRef;

  parallaxScale = 0;
  activeField = '';
  showMobileSearch = false;
  showAllPropertyTypes = false;

  activeSelector: 'check-in' | 'check-out' | null = null;
  selectedStartDate!: Date | null;
  selectedEndDate!: Date | null;

  searchForm: SearchForm = {
    location: '',
    propertyType: '',
    minPrice: null,
    maxPrice: null,
  };

  locationSuggestions: LocationSuggestion[] = [
    { name: 'Paris 16ème', region: 'Île-de-France, France' },
    { name: 'Neuilly-sur-Seine', region: 'Hauts-de-Seine, France' },
    { name: 'Boulogne-Billancourt', region: 'Hauts-de-Seine, France' },
    { name: 'Versailles', region: 'Yvelines, France' },
    { name: 'Saint-Germain-en-Laye', region: 'Yvelines, France' },
    { name: 'Levallois-Perret', region: 'Hauts-de-Seine, France' },
    { name: 'Courbevoie', region: 'Hauts-de-Seine, France' },
    { name: 'Issy-les-Moulineaux', region: 'Hauts-de-Seine, France' },
    { name: 'Suresnes', region: 'Hauts-de-Seine, France' },
    { name: 'Rueil-Malmaison', region: 'Hauts-de-Seine, France' },
    { name: 'Vincennes', region: 'Val-de-Marne, France' },
    { name: 'Saint-Mandé', region: 'Val-de-Marne, France' },
    { name: 'Maisons-Laffitte', region: 'Yvelines, France' },
    { name: 'Le Vésinet', region: 'Yvelines, France' },
    { name: 'Chatou', region: 'Yvelines, France' },
  ];

  filteredLocationSuggestions: LocationSuggestion[] = [];

  propertyTypes: string[] = [
    'Tous les types',
    'Appartement',
    'Maison',
    'Villa',
    'Loft',
    'Duplex',
    'Penthouse',
    'Studio',
    'Château',
    'Hôtel particulier',
    'Terrain',
    'Commercial',
    'Bureau',
    'Local commercial',
  ];

  quickFilters: QuickFilter[] = [
    { label: 'Propriétés de luxe', type: 'category', value: 'luxury' },
    { label: 'Vue sur mer', type: 'feature', value: 'sea-view' },
    { label: 'Piscine', type: 'feature', value: 'pool' },
    { label: 'Jardin', type: 'feature', value: 'garden' },
    { label: 'Neuf', type: 'age', value: 'new' },
    { label: 'Investissement', type: 'category', value: 'investment' },
  ];

  constructor(private cdr: ChangeDetectorRef, private router: Router) {
    this.filteredLocationSuggestions = this.locationSuggestions;
  }

  ngAfterViewInit() {
    this.onWindowScroll();
    this.cdr.detectChanges();

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        this.activeField = '';
        this.cdr.detectChanges();
      }
    });
  }

  toggleDropdown(selector: 'check-in' | 'check-out') {}

  formatDisplayDate(date: Date | null) {}

  clearSelection() {}

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.videoContainer) {
      const rect = this.videoContainer.nativeElement.getBoundingClientRect();
      this.parallaxScale = Math.max(0, 1 - rect.top / window.innerHeight);
    }
  }

  setActiveField(field: string) {
    this.activeField = field;

    if (field === 'location' || field === 'mobileLocation') {
      this.filterLocationSuggestions();
      setTimeout(() => {
        if (field === 'location' && this.locationInput) {
          this.locationInput.nativeElement.focus();
        } else if (field === 'mobileLocation' && this.mobileLocationInput) {
          this.mobileLocationInput.nativeElement.focus();
        }
      }, 0);
    }

    this.cdr.detectChanges();
  }

  focusInput(field: string) {
    this.setActiveField(field);
  }

  filterLocationSuggestions() {
    const query = this.searchForm.location.toLowerCase();
    if (query.length === 0) {
      this.filteredLocationSuggestions = this.locationSuggestions;
    } else {
      this.filteredLocationSuggestions = this.locationSuggestions.filter(
        (suggestion) =>
          suggestion.name.toLowerCase().includes(query) ||
          suggestion.region.toLowerCase().includes(query)
      );
    }
  }

  selectLocation(suggestion: LocationSuggestion) {
    this.searchForm.location = suggestion.name;
    this.activeField = '';
    this.cdr.detectChanges();
  }

  selectLocationMobile(suggestion: LocationSuggestion) {
    this.searchForm.location = suggestion.name;
    this.activeField = '';
    this.cdr.detectChanges();
  }

  selectPropertyType(type: string) {
    this.searchForm.propertyType = type === 'Tous les types' ? '' : type;
    this.activeField = '';
    this.cdr.detectChanges();
  }

  selectPropertyTypeMobile(type: string) {
    this.searchForm.propertyType = type === 'Tous les types' ? '' : type;
    this.cdr.detectChanges();
  }

  getPriceRangeLabel(): string {
    if (!this.searchForm.minPrice && !this.searchForm.maxPrice) {
      return 'Budget';
    }

    const formatPrice = (price: number) => {
      if (price >= 1000000) {
        return (price / 1000000).toFixed(1) + 'M €';
      } else if (price >= 1000) {
        return (price / 1000).toFixed(0) + 'K €';
      }
      return price.toLocaleString() + ' €';
    };

    if (this.searchForm.minPrice && this.searchForm.maxPrice) {
      return `${formatPrice(this.searchForm.minPrice)} - ${formatPrice(
        this.searchForm.maxPrice
      )}`;
    } else if (this.searchForm.minPrice) {
      return `À partir de ${formatPrice(this.searchForm.minPrice)}`;
    } else if (this.searchForm.maxPrice) {
      return `Jusqu'à ${formatPrice(this.searchForm.maxPrice)}`;
    }

    return 'Budget';
  }

  clearPriceRange() {
    this.searchForm.minPrice = null;
    this.searchForm.maxPrice = null;
  }

  // Mobile specific methods
  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
    if (!this.showMobileSearch) {
      this.activeField = '';
    }
    this.cdr.detectChanges();
  }

  closeMobileSearch() {
    this.showMobileSearch = false;
    this.activeField = '';
    this.cdr.detectChanges();
  }

  getMobileSearchSummary(): string {
    const parts: string[] = [];

    if (this.searchForm.location) {
      parts.push(this.searchForm.location);
    }

    if (this.searchForm.propertyType) {
      parts.push(this.searchForm.propertyType);
    }

    if (this.searchForm.minPrice || this.searchForm.maxPrice) {
      parts.push(this.getPriceRangeLabel());
    }

    if (parts.length === 0) {
      return 'Où, type, budget...';
    }

    return parts.join(' • ');
  }

  performSearch() {
    console.log('Performing search with:', this.searchForm);

    // Construire les paramètres de recherche
    const searchParams: any = {};

    if (this.searchForm.location) {
      searchParams.location = this.searchForm.location;
    }

    if (this.searchForm.propertyType) {
      searchParams.type = this.searchForm.propertyType;
    }

    if (this.searchForm.minPrice) {
      searchParams.minPrice = this.searchForm.minPrice;
    }

    if (this.searchForm.maxPrice) {
      searchParams.maxPrice = this.searchForm.maxPrice;
    }

    // Naviguer vers la page de résultats avec les paramètres
    this.router.navigate(['/search'], { queryParams: searchParams });

    // Fermer tous les dropdowns et le mobile search
    this.activeField = '';
    this.showMobileSearch = false;
    this.cdr.detectChanges();
  }

  applyQuickFilter(filter: QuickFilter) {
    console.log('Applying quick filter:', filter);

    // Appliquer le filtre en fonction de son type
    switch (filter.type) {
      case 'category':
        // Rediriger vers une catégorie spécifique
        this.router.navigate(['/properties'], {
          queryParams: { category: filter.value },
        });
        break;

      case 'feature':
        // Appliquer un filtre de caractéristique
        this.router.navigate(['/search'], {
          queryParams: { features: filter.value },
        });
        break;

      case 'age':
        // Filtre par âge du bien
        this.router.navigate(['/search'], {
          queryParams: { age: filter.value },
        });
        break;
    }
  }

  scrollToContent() {
    const element = document.getElementById('next-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  }

  devenirProprietaire(): void {
    // Navigation vers la page devenir propriétaire
    this.router.navigate(['/become-host']);

    // Ou ouvrir un formulaire de contact
    // this.dialog.open(ContactProprietaireComponent);

    // Ou scroll vers une section
    // this.scrollToSection('proprietaire-section');
  }

  estimerRevenus() {}

  // Méthode pour gérer la saisie dans le champ location
  onLocationInput() {
    this.filterLocationSuggestions();
  }

  ngOnDestroy() {
    // Cleanup event listeners
    document.removeEventListener('click', this.onDocumentClick);
  }

  private onDocumentClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.activeField = '';
      this.cdr.detectChanges();
    }
  };
}
