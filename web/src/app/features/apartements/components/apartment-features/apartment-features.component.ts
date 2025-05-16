import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apartment-features',
  templateUrl: './apartment-features.component.html',
})
export class ApartmentFeaturesComponent {
  @Input() features: { icon: string; label: string; value: string | number; }[] = [];
}