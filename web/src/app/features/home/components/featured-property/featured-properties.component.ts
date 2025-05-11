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
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FeaturedPropertiesComponent implements OnInit {
  loading: boolean = false
  typeHebergements: any[] = [];
  annonces: any[] = []
  annonce: any =  {}
  
  constructor(
    private typeHebergementService: TypeHebergementService,
    private messageService: MessageService,
    private annonceService: AnnoncesService,
    private activateRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.loadTypeHebergements()
    this.loadAnnonces()
  }
 // propriétés affichées avec pagination
 propertiesToShow = 8; // nombre initial de propriétés visibles

  selectedTypeHebergement = 'Toutes';
  filteredProperties: any[] = []

  loadTypeHebergements(): void {
    this.loading = true;
    this.typeHebergementService.getTypeHebergements().subscribe({
        next: (response) => {
            this.typeHebergements = [{designation : 'Toutes'}, ...response];
    
            this.loading = false;
        },
        error: (error) => {
            console.error('Error loading type hebergements:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Impossible de charger les types d\'hébergement',
                life: 3000
            });
            this.loading = false;
        },
    });
}

loadAnnonces(): void{
  this.loading = true;
  this.annonceService.findAll().subscribe({
    next:(response) =>{
      this.annonces = response
      this.loading = false
      this.filterProperties('Toutes')
    },
    error:(error) =>{
      console.log('Error loading annonces:', error)
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les annonces'
      });
      this.loading = false;
    }
  })
}
 
 loadMore() {
   this.propertiesToShow += 4; 
 }
 


 


  
  get visibleProperties() {
    return this.annonces.slice(0, this.propertiesToShow);
  }
  


 filterProperties(type: string) {
  this.selectedTypeHebergement = type;
  this.propertiesToShow = 8

  if (type === 'Toutes') {
    this.filteredProperties = [...this.annonces];
  } else {
    this.filteredProperties = this.annonces.filter(p => p.typeHebergement === type);
    console.log(this.filteredProperties)
  }
}
 
formatPrice(property: any): string{
  if(property && property.price && property.price.prixBase){
    return `${property.price.prixBase} ${property.price.codeDevise || 'USD'}`
  }

  return 'Prix non disponible';
}

 showScrollTop = false;

@HostListener('window:scroll', [])
onWindowScroll() {
 this.showScrollTop = window.pageYOffset > 400;
}

scrollToTop() {
 window.scrollTo({
   top: 0,
   behavior: 'smooth'
 });
}
}