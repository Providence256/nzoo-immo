// amenities-section.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

@Component({
  selector: 'app-amenities-section',
  template: `
    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
    >
      <div class="border-b border-gray-200 pb-6 mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Équipements
        </h2>
        <p class="text-gray-600 mt-2">
          vous avez ajouté ceci à votre liste jusqu'à présent
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          *ngFor="let amenity of amenities"
          (click)="onToggleAmenity(amenity.id)"
          class="p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-md"
          [class.border-gray-900]="amenity.selected"
          [class.bg-gray-50]="amenity.selected"
          [class.border-gray-200]="!amenity.selected"
        >
          <div class="flex items-center space-x-4">
            <div
              class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              [class.bg-gray-900]="amenity.selected"
            >
              <i
                [class]="amenity.icon"
                class="text-xl"
                [class.text-white]="amenity.selected"
                [class.text-gray-600]="!amenity.selected"
              ></i>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900">{{ amenity.name }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ amenity.name }}</p>
            </div>
            <div
              class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
              [class.border-gray-900]="amenity.selected"
              [class.bg-gray-900]="amenity.selected"
              [class.border-gray-300]="!amenity.selected"
            >
              <i
                class="pi pi-check text-white text-xs"
                *ngIf="amenity.selected"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AmenitiesSectionComponent {
  @Input() form!: FormGroup;
  @Input() amenities: any[] = [];
  @Output() amenityToggled = new EventEmitter<string>();

  onToggleAmenity(amenityId: any) {
    this.amenityToggled.emit(amenityId);
  }
}
