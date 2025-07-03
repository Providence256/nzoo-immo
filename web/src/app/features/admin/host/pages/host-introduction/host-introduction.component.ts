import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-introduction',
  templateUrl: './host-introduction.component.html',
  styleUrls: ['./host-introduction.component.scss'],
})
export class HostIntroductionComponent {
  benefits = [
    {
      icon: 'pi pi-money-bill',
      title: 'Gagnez un revenu supplémentaire',
      description:
        'Générez des revenus passifs en partageant votre espace avec des voyageurs du monde entier.',
    },
    {
      icon: 'pi pi-shield',
      title: "Protection de l'hôte",
      description:
        "Couverture d'assurance complète et assistance 24h/24 et 7j/7 pour assurer votre sécurité et celle de vos biens.",
    },
    {
      icon: 'pi pi-users',
      title: 'Rencontrer de nouvelles personnes',
      description:
        'Connectez-vous avec des invités intéressants et créez des expériences mémorables pour les voyageurs.',
    },
    {
      icon: 'pi pi-calendar',
      title: 'Hébergement flexible',
      description:
        "Hébergez vos invités selon votre emploi du temps, qu'il s'agisse d'une pièce libre ou de votre logement entier.",
    },
  ];

  constructor(private router: Router) {}

  onStartHosting() {
    // Navigate to the announce/listing creation page
    this.router.navigate(['/admin/saisies/new-annonce']);
  }
}
