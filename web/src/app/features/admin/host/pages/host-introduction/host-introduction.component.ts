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
      title: 'Earn Extra Income',
      description:
        'Generate passive income by sharing your space with travelers from around the world.',
    },
    {
      icon: 'pi pi-shield',
      title: 'Host Protection',
      description:
        'Comprehensive insurance coverage and 24/7 support to keep you and your property safe.',
    },
    {
      icon: 'pi pi-users',
      title: 'Meet New People',
      description:
        'Connect with interesting guests and create memorable experiences for travelers.',
    },
    {
      icon: 'pi pi-calendar',
      title: 'Flexible Hosting',
      description:
        "Host on your schedule - whether it's a spare room or your entire place.",
    },
  ];

  constructor(private router: Router) {}

  onStartHosting() {
    // Navigate to the announce/listing creation page
    this.router.navigate(['/host/create-listing']);
  }
}
