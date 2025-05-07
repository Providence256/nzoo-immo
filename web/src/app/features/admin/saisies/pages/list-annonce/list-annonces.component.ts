// list-annonces.component.ts
import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";
import { AnnoncesService } from "../../services/annonces.service";
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';



@Component({
    selector: 'app-list-annonces',
    templateUrl: './list-annonces.component.html',
    styleUrl: './list-annonces.component.scss',
    providers: [MessageService]
})

export class ListAnnoncesComponent implements OnInit {
    annonces: any[] = [];
    loading: boolean = true;
    searchValue: string = '';
    selectedAnnonces: any[] = [];
    displayAnnonceDetails: boolean = false;
    selectedAnnonceDetails: any | null = null;
    carouselIndex: number = 0;
    equipements: any[] = []

    constructor(
        private breadcrumbService: BreadcrumbService,
        private annoncesService: AnnoncesService,
        private messageService: MessageService
    ) {
        this.breadcrumbService.setItems([
            { label: 'Saisies' },
            { label: 'annonces', routerLink: '/admin/saisies/list-annonces/' }
        ]);
    }

    ngOnInit(): void {
        this.loadAnnonces();
        this.loadEquipements();
    }

    loadAnnonces(): void {
        this.loading = true;
        this.annoncesService.findAll().subscribe({
            next: (data) => {
                this.annonces = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading annonces', err);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les annonces' });
                this.loading = false;
            }
        });
    }

    loadEquipements(): void {
        this.annoncesService.findAllEquipements().subscribe({
            next:(data) => {
                this.equipements = data
            },
            error:(err) => {
                console.error('Erreur chargement équipements')
            }
        })
    }

    onSearch(table: Table): void {
        table.filterGlobal(this.searchValue, 'contains');
    }

    viewDetails(id: number): void {
        const annonce = this.annonces.find(a => a.id === id);
        if (annonce) {
          this.selectedAnnonceDetails = annonce;
          this.carouselIndex = 0; // Reset to first image
          this.displayAnnonceDetails = true;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Annonce non trouvée' });
        }
      }

    deleteAnnonce(id: number): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce?')) {
            this.annoncesService.delete(id).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Annonce supprimée avec succès' });
                    this.loadAnnonces();
                },
                error: (err) => {
                    console.error('Error deleting annonce', err);
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer l\'annonce' });
                }
            });
        }
    }

    deleteSelectedAnnonces(): void {
        if (this.selectedAnnonces.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Aucune annonce sélectionnée' });
            return;
        }

        if (confirm(`Êtes-vous sûr de vouloir supprimer ${this.selectedAnnonces.length} annonce(s)?`)) {
            let successCount = 0;
            let errorCount = 0;
            
            this.selectedAnnonces.forEach((annonce, index) => {
                this.annoncesService.delete(annonce.id).subscribe({
                    next: () => {
                        successCount++;
                        if (index === this.selectedAnnonces.length - 1) {
                            this.messageService.add({ 
                                severity: 'success', 
                                summary: 'Succès', 
                                detail: `${successCount} annonce(s) supprimée(s) avec succès${errorCount > 0 ? `, ${errorCount} échec(s)` : ''}` 
                            });
                            this.selectedAnnonces = [];
                            this.loadAnnonces();
                        }
                    },
                    error: () => {
                        errorCount++;
                        if (index === this.selectedAnnonces.length - 1) {
                            this.messageService.add({ 
                                severity: 'error', 
                                summary: 'Erreur', 
                                detail: `${errorCount} erreur(s) lors de la suppression${successCount > 0 ? `, ${successCount} succès` : ''}` 
                            });
                            this.selectedAnnonces = [];
                            this.loadAnnonces();
                        }
                    }
                });
            });
        }
    }

    nextImage(): void {
        if (this.selectedAnnonceDetails && this.carouselIndex < this.selectedAnnonceDetails.photoUrls.length - 1) {
          this.carouselIndex++;
        }
      }

      prevImage(): void {
        if (this.carouselIndex > 0) {
          this.carouselIndex--;
        }
      }

      getEquipementIconById(id: number) {
     
       const equipement = this.equipements.find(e => e.id === id);

       return equipement.icon;
        
      }
      
}