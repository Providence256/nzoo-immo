


// src/app/features/apartments/components/apartment-card/apartment-card.component.ts
import { Component, Input } from '@angular/core';
import { Apartment } from '../../../../core/models/apartment.model';

@Component({
  selector: 'app-apartment-card',
  templateUrl: './apartment-card.component.html',
})
export class ApartmentCardComponent {
  @Input() apartment!: Apartment;
  
  constructor() {}
  
  get formattedPrice(): string {
    const { amount, currency, period } = this.apartment.price;
    return `${currency} ${amount} / ${period}`;
  }
}