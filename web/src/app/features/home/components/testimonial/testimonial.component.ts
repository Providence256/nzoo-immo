import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  propertyType: string;
  verified: boolean;
}

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
  animations: [
    trigger('slideInLeft', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-100px)' }),
            stagger(200, [
              animate(
                '600ms cubic-bezier(0.4, 0, 0.2, 1)',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('fadeInScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '500ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Marie Dubois',
      location: 'Paris, France',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment:
        "Une expérience exceptionnelle ! L'appartement était exactement comme sur les photos, très propre et bien situé. Le propriétaire était très accueillant et disponible. Je recommande vivement !",
      date: '2024-01-15',
      propertyType: 'Appartement',
      verified: true,
    },
    {
      id: 2,
      name: 'Jean-Pierre Martin',
      location: 'Lyon, France',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment:
        'Séjour parfait pour nos vacances en famille. La maison était spacieuse, bien équipée et dans un quartier calme. Les enfants ont adoré le jardin. Service client au top !',
      date: '2024-01-10',
      propertyType: 'Maison',
      verified: true,
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      location: 'Londres, UK',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      comment:
        'Great platform with amazing properties! The booking process was smooth and the host was very responsive. The studio was perfect for my business trip to Paris.',
      date: '2024-01-08',
      propertyType: 'Studio',
      verified: true,
    },
    {
      id: 4,
      name: 'Ahmed Benali',
      location: 'Casablanca, Maroc',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment:
        "Excellente plateforme ! J'ai trouvé exactement ce que je cherchais pour mon séjour d'affaires. L'appartement était moderne, bien situé et le prix très raisonnable.",
      date: '2024-01-05',
      propertyType: 'Appartement',
      verified: true,
    },
    {
      id: 5,
      name: 'Emma Wilson',
      location: 'New York, USA',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment:
        'Amazing experience! The villa was absolutely stunning with a beautiful view. Everything was clean and well-maintained. Will definitely book again!',
      date: '2024-01-03',
      propertyType: 'Villa',
      verified: true,
    },
    {
      id: 6,
      name: 'Pierre Leroy',
      location: 'Marseille, France',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      comment:
        "Très bon séjour ! L'emplacement était parfait, proche de tous les commerces. L'appartement était confortable et le propriétaire très sympathique. Une petite remarque sur le wifi qui pourrait être amélioré.",
      date: '2024-01-01',
      propertyType: 'Appartement',
      verified: true,
    },
  ];

  overallStats = {
    averageRating: 4.8,
    totalReviews: 2847,
    fiveStarPercentage: 89,
    recommendationRate: 96,
  };

  constructor() {}

  ngOnInit(): void {
    // Simulation d'un chargement de données depuis une API
    // this.loadTestimonials();
  }

  loadTestimonials(): void {
    // Méthode pour charger les témoignages depuis votre API
    // this.testimonialService.getTestimonials().subscribe(...)
  }

  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, index) => index < rating);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getRandomTestimonials(count: number = 3): Testimonial[] {
    const shuffled = [...this.testimonials].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
