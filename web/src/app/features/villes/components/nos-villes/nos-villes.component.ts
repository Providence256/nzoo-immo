// src/app/features/villes/components/nos-villes/nos-villes.component.ts
import { Component, OnInit } from '@angular/core';
import { VilleService } from '../../../admin/files/services/ville.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nos-villes',
  templateUrl: './nos-villes.component.html',
  styleUrls: ['./nos-villes.component.scss'],
})
export class NosVillesComponent implements OnInit {
  villes: any[] = [];
  communes: any[] = [];
  annonces: any[] = [];
  nombreAppartements!: number;

  villeSelectionnee: any | null = null;
  isModalVisible = false;

  constructor(
    private villeService: VilleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadVilles();
    // Animation d'entrée pour les cartes
    this.animateCards();
  }

  loadVilles(): void {
    this.villeService.getVilles().subscribe({
      next: (response) => {
        this.villes = response;
        this.loadAnnonceForAllVilles();
        this.loadAveragePriceForVille();
      },
      error: (error) => {
        console.error('Error loading villes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les villes',
          life: 3000,
        });
      },
    });
  }

  loadAnnonceForAllVilles(): void {
    this.villes.forEach((ville) => {
      this.villeService.getAllListingsByVille(ville.id).subscribe({
        next: (response) => {
          ville.announcesCount = response.length;
        },
        error: (error) => {
          console.error(`Error loading listings for ville ${ville.id}:`, error);
          ville.announcesCount = 0;
        },
      });
    });
  }

  loadAveragePriceForVille() {
    this.villes.forEach((ville) => {
      this.villeService.getAveragePriceByVille(ville.id).subscribe({
        next: (response) => {
          ville.average = response;
        },
        error: (error) => {
          console.error(
            `Error loading average price for ville ${ville.id}:`,
            error
          );
          ville.average = 0;
        },
      });
    });
  }

  loadCommuneByVille(ville: any) {
    this.villeService.getAllCommunesByVille(ville.id).subscribe({
      next: (response) => {
        this.communes = response;
      },
      error: (error) => {
        console.error('Error loading Communes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les communes',
          life: 3000,
        });
      },
    });
  }

  loadAllListingByVille(ville: any) {
    this.villeService.getAllListingsByVille(ville.id).subscribe({
      next: (response) => {
        this.annonces = response;
      },
      error: (error) => {
        console.error('Error loading listings:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les listings',
          life: 3000,
        });
      },
    });
  }

  ouvrirModal(ville: any): void {
    this.villeSelectionnee = ville;
    this.loadCommuneByVille(ville);
    this.loadAllListingByVille(ville);
    this.isModalVisible = true;
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
  }

  fermerModal(): void {
    this.isModalVisible = false;
    this.villeSelectionnee = null;
    document.body.style.overflow = 'auto'; // Rétablir le scroll
  }

  private animateCards(): void {
    // Animation d'apparition progressive des cartes
    setTimeout(() => {
      const cards = document.querySelectorAll('.ville-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-in');
        }, index * 100);
      });
    }, 100);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  getModalAppartementsText(nombre: number): string {
    if (nombre === 0) {
      return 'Aucun appartement disponible pour le moment';
    } else if (nombre === 1) {
      return '1 appartement disponible';
    } else {
      return `${nombre} appartements disponibles`;
    }
  }

  getCTAText(nombre: number, nomVille: string): string {
    if (nombre === 0) {
      return 'Aucun appartement disponible pour le moment dans cette ville. Revenez bientôt !';
    } else if (nombre === 1) {
      return `Découvrez notre appartement disponible à ${nomVille}`;
    } else {
      return `Decouvrez nos ${nombre} appartements disponibles a ${nomVille}`;
    }
  }

  getCTAButtonText(nombre: number): string {
    if (nombre === 0) {
      return 'Être notifié';
    } else if (nombre === 1) {
      return "Voir l'appartement";
    } else {
      return 'Voir les appartements';
    }
  }
}
