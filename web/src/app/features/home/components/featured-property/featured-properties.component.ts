import { Component, HostListener, Input } from '@angular/core';
import { Property } from '../../../../core/models/property';
import { animate, style, transition, trigger } from '@angular/animations';

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
export class FeaturedPropertiesComponent {
 // propriétés affichées avec pagination
 propertiesToShow = 8; // nombre initial de propriétés visibles

 categories = ['Toutes', 'Appartement', 'Villa', 'Maison', 'Studio', 'Penthouse'];
  selectedCategory = 'Toutes';

 
 loadMore() {
   this.propertiesToShow += 4; // nombre à ajouter à chaque clic
 }
 


 properties = [
  {
    id: 1,
    title: 'Villa de Luxe',
    image: '/images/house1.jpg',
    description: 'Une magnifique villa avec piscine et vue sur la mer.',
    price: '500 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Villa'
  },
  {
    id: 2,
    title: 'Appartement Moderne',
    image: '/images/house2.jpg',
    description: 'Appartement situé au centre-ville avec une belle vue.',
    price: '250 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Appartement'
  },
  {
    id: 3,
    title: 'Maison Familiale',
    image: '/images/house3.jpg',
    description: 'Maison spacieuse avec jardin et garage.',
    price: '350 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Maison'
  },
  {
    id: 4,
    title: 'Studio Cosy',
    image: '/images/house4.jpg',
    description: 'Petit studio parfait pour un étudiant ou un jeune couple.',
    price: '120 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Studio'
  },
  {
    id: 5,
    title: 'Penthouse de Rêve',
    image: '/images/house5.jpg',
    description: 'Un penthouse avec une vue panoramique incroyable.',
    price: '1 000 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Penthouse'
  },
  {
    id: 6,
    title: 'Villa de Luxe',
    image: '/images/house1.jpg',
    description: 'Une magnifique villa avec piscine et vue sur la mer.',
    price: '500 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Villa'
  },
  {
    id: 7,
    title: 'Appartement Moderne',
    image: '/images/house2.jpg',
    description: 'Appartement situé au centre-ville avec une belle vue.',
    price: '250 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Appartement'
  },
  {
    id: 8,
    title: 'Maison Familiale',
    image: '/images/house3.jpg',
    description: 'Maison spacieuse avec jardin et garage.',
    price: '350 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Maison'
  },
  {
    id: 9,
    title: 'Studio Cosy',
    image: '/images/house4.jpg',
    description: 'Petit studio parfait pour un étudiant ou un jeune couple.',
    price: '120 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Studio'
  },
  {
    id: 10,
    title: 'Penthouse de Rêve',
    image: '/images/house5.jpg',
    description: 'Un penthouse avec une vue panoramique incroyable.',
    price: '1 000 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Penthouse'
  },
  {
    id: 11,
    title: 'Villa de Luxe',
    image: '/images/house1.jpg',
    description: 'Une magnifique villa avec piscine et vue sur la mer.',
    price: '500 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Villa'
  },
  {
    id: 12,
    title: 'Appartement Moderne',
    image: '/images/house2.jpg',
    description: 'Appartement situé au centre-ville avec une belle vue.',
    price: '250 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Appartement'
  },
  {
    id: 13,
    title: 'Maison Familiale',
    image: '/images/house3.jpg',
    description: 'Maison spacieuse avec jardin et garage.',
    price: '350 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Maison'
  },
  {
    id: 14,
    title: 'Studio Cosy',
    image: '/images/house4.jpg',
    description: 'Petit studio parfait pour un étudiant ou un jeune couple.',
    price: '120 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Studio'
  },
  {
    id: 15,
    title: 'Penthouse de Rêve',
    image: '/images/house5.jpg',
    description: 'Un penthouse avec une vue panoramique incroyable.',
    price: '1 000 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Penthouse'
  },
  {
    id: 16,
    title: 'Villa de Luxe',
    image: '/images/house1.jpg',
    description: 'Une magnifique villa avec piscine et vue sur la mer.',
    price: '500 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Villa'
  },
  {
    id: 17,
    title: 'Appartement Moderne',
    image: '/images/house2.jpg',
    description: 'Appartement situé au centre-ville avec une belle vue.',
    price: '250 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Appartement'
  },
  {
    id: 18,
    title: 'Maison Familiale',
    image: '/images/house3.jpg',
    description: 'Maison spacieuse avec jardin et garage.',
    price: '350 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Maison'
  },
  {
    id: 19,
    title: 'Studio Cosy',
    image: '/images/house4.jpg',
    description: 'Petit studio parfait pour un étudiant ou un jeune couple.',
    price: '120 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Studio'
  },
  {
    id: 20,
    title: 'Penthouse de Rêve',
    image: '/images/house5.jpg',
    description: 'Un penthouse avec une vue panoramique incroyable.',
    price: '1 000 000$',
    visiteurs: 6,
    chambres: 3,
    lits: 4,
    category: 'Penthouse'
  },
];


  
  get visibleProperties() {
    return this.properties.slice(0, this.propertiesToShow);
  }
  
 filteredProperties = [...this.properties];


 filterProperties(category: string) {
  this.selectedCategory = category;
  if (category === 'Toutes') {
    this.filteredProperties = [...this.properties];
  } else {
    this.filteredProperties = this.properties.filter(p => p.category === category);
  }
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