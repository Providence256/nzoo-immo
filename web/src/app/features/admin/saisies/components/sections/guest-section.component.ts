// guest-section.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface GuestCount {
  guests: number;
  bedrooms: number;
  beds: number;
}

@Component({
  selector: 'app-guest-section',
  template: `
    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
    >
      <div class="border-b border-gray-200 pb-6 mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Modifier quelques informations de base sur votre logement
        </h2>
        <p class="text-gray-600 mt-2">
          Indiquez le nombre de voyageurs, chambres et lits
        </p>
      </div>

      <div class="space-y-8" [formGroup]="form">
        <div
          class="flex items-center justify-between py-4 border-b border-gray-200"
        >
          <div class="flex items-center space-x-4">
            <i class="fas fa-users w-6 h-6 text-gray-600"></i>
            <span class="text-lg text-black font-medium">Voyageurs</span>
          </div>
          <div class="flex items-center space-x-4">
            <button
              type="button"
              (click)="updateCount('guests', -1)"
              [disabled]="guestCount.guests <= 1"
              class="w-8 h-8 rounded-full text-black border border-gray-300 flex items-center justify-center hover:border-gray-900 disabled:opacity-50"
            >
              -
            </button>
            <span class="w-8 text-center text-black font-medium">{{
              guestCount.guests
            }}</span>
            <button
              type="button"
              (click)="updateCount('guests', 1)"
              class="w-8 h-8 rounded-full border text-black border-gray-300 flex items-center justify-center hover:border-gray-900"
            >
              +
            </button>
          </div>
        </div>

        <div
          class="flex items-center justify-between py-4 border-b border-gray-200"
        >
          <div class="flex items-center space-x-4">
            <i class="fas fa-bed w-6 h-6 text-gray-600"></i>
            <span class="text-lg text-black font-medium">Chambres</span>
          </div>
          <div class="flex items-center space-x-4">
            <button
              type="button"
              (click)="updateCount('bedrooms', -1)"
              [disabled]="guestCount.bedrooms <= 1"
              class="w-8 h-8 rounded-full text-black border border-gray-300 flex items-center justify-center hover:border-gray-900 disabled:opacity-50"
            >
              -
            </button>
            <span class="w-8 text-center text-black font-medium">{{
              guestCount.bedrooms
            }}</span>
            <button
              type="button"
              (click)="updateCount('bedrooms', 1)"
              class="w-8 h-8 rounded-full border text-black border-gray-300 flex items-center justify-center hover:border-gray-900"
            >
              +
            </button>
          </div>
        </div>

        <div
          class="flex items-center justify-between py-4 border-b border-gray-200"
        >
          <div class="flex items-center space-x-4">
            <i class="fas fa-bath w-6 h-6 text-gray-600"></i>
            <span class="text-lg text-black font-medium">Lits</span>
          </div>
          <div class="flex items-center space-x-4">
            <button
              type="button"
              (click)="updateCount('beds', -1)"
              [disabled]="guestCount.beds <= 1"
              class="w-8 h-8 rounded-full text-black border border-gray-300 flex items-center justify-center hover:border-gray-900 disabled:opacity-50"
            >
              -
            </button>
            <span class="w-8 text-center text-black font-medium">{{
              guestCount.beds
            }}</span>
            <button
              type="button"
              (click)="updateCount('beds', 1)"
              class="w-8 h-8 rounded-full border text-black border-gray-300 flex items-center justify-center hover:border-gray-900"
            >
              +
            </button>
          </div>
        </div>

        <!-- Section pour accepter les bébés -->
        <div
          class="flex items-center justify-between py-4 border-b border-gray-200"
        >
          <div class="flex items-center space-x-4">
            <i class="fas fa-baby w-6 h-6 text-gray-600"></i>
            <span class="text-lg text-black font-medium"
              >Accepter les bébés ?</span
            >
          </div>
          <div class="flex items-center space-x-6">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="acceptBabies"
                value="true"
                formControlName="acceptBabies"
                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span class="text-black font-medium">Oui</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="acceptBabies"
                value="false"
                formControlName="acceptBabies"
                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span class="text-black font-medium">Non</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GuestSectionComponent {
  @Input() form!: FormGroup;
  @Input() guestCount: GuestCount = { guests: 1, bedrooms: 1, beds: 1 };
  @Output() countUpdated = new EventEmitter<{
    type: keyof GuestCount;
    value: number;
  }>();

  updateCount(type: keyof GuestCount, change: number) {
    const newValue = this.guestCount[type] + change;
    if (newValue >= 1) {
      this.countUpdated.emit({ type, value: newValue });
    }
  }
}
