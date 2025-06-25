import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Property } from '../../../../core/models/property';
import { animate, style, transition, trigger } from '@angular/animations';
import { TypeHebergementService } from '../../../admin/files/services/type-hebergement.service';
import { MessageService } from 'primeng/api';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-featured-properties',
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(30px) scale(0.95)',
        }),
        animate(
          '800ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({
            opacity: 1,
            transform: 'translateY(0) scale(1)',
          })
        ),
      ]),
    ]),
  ],
})
export class FeaturedPropertiesComponent implements OnInit {
  loading: boolean = false;
  typeHebergements: any[] = [];
  annonces: any[] = [];
  annonce: any = {};

  // Propriétés affichées avec pagination
  propertiesToShow = 8;
  selectedTypeHebergement = 'Toutes';
  filteredProperties: any[] = [];
  showScrollTop = false;

  constructor(
    private typeHebergementService: TypeHebergementService,
    private messageService: MessageService,
    private annonceService: AnnoncesService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTypeHebergements();
    this.loadAnnonces();
  }

  loadTypeHebergements(): void {
    this.loading = true;
    this.typeHebergementService.getTypeHebergements().subscribe({
      next: (response) => {
        this.typeHebergements = [{ designation: 'Toutes' }, ...response];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading type hebergements:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de charger les types d'hébergement",
          life: 3000,
        });
        this.loading = false;
      },
    });
  }

  loadAnnonces(): void {
    this.loading = true;
    this.annonceService.findAll().subscribe({
      next: (response) => {
        this.annonces = response;
        this.loading = false;
        this.filterProperties('Toutes');
      },
      error: (error) => {
        console.log('Error loading annonces:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les annonces',
        });
        this.loading = false;
      },
    });
  }

  loadMore(): void {
    this.propertiesToShow += 8;
  }

  get visibleProperties() {
    return this.filteredProperties.slice(0, this.propertiesToShow);
  }

  filterProperties(type: string): void {
    this.selectedTypeHebergement = type;
    this.propertiesToShow = 8;

    if (type === 'Toutes') {
      this.filteredProperties = [...this.annonces];
    } else {
      this.filteredProperties = this.annonces.filter(
        (p) => p.typeHebergement === type
      );
    }
  }

  formatPrice(property: any): string {
    if (property && property.price && property.price.prixBase) {
      const price = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: property.price.codeDevise || 'EUR',
        minimumFractionDigits: 0,
      }).format(property.price.prixBase);

      return `${price}/nuit`;
    }

    return 'Prix sur demande';
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollTop = window.pageYOffset > 400;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Méthode pour gérer les erreurs d'images
  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder-property.jpg';
  }

  // Méthode pour le favoris (à implémenter selon vos besoins)
  toggleFavorite(property: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    // Logique pour ajouter/retirer des favoris
    console.log('Toggle favorite for:', property.id);

    this.messageService.add({
      severity: 'success',
      summary: 'Favoris',
      detail: 'Propriété ajoutée aux favoris',
      life: 2000,
    });
  }
}
