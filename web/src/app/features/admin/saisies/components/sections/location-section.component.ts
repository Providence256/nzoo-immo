// location-section.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface Ville {
  id: string;
  designation: string;
}

export interface Commune {
  id: string;
  designation: string;
}

@Component({
  selector: 'app-location-section',
  template: `
    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
    >
      <div class="border-b border-gray-200 pb-6 mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Où se trouve votre logement ?
        </h2>
        <p class="text-gray-600 mt-2">
          Votre adresse ne sera partagée qu'après réservation
        </p>
      </div>

      <form [formGroup]="form" class="space-y-8">
        <!-- Location Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Ville -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-3"
              >Ville *</label
            >
            <div class="relative">
              <i
                class="pi pi-building absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              ></i>
              <select
                formControlName="ville"
                (change)="
                  onLocationFieldUpdate('ville', $any($event.target).value)
                "
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base appearance-none bg-white"
              >
                <option value="">Sélectionner une ville</option>
                <option *ngFor="let ville of villes" [value]="ville.id">
                  {{ ville.designation }}
                </option>
              </select>
              <i
                class="pi pi-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              ></i>
            </div>
            <div
              *ngIf="form.get('ville')?.invalid && form.get('ville')?.touched"
              class="text-red-600 text-sm mt-2 flex items-center space-x-2"
            >
              <i class="pi pi-exclamation-triangle"></i>
              <span>Veuillez sélectionner une ville</span>
            </div>
          </div>

          <!-- Commune -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-3"
              >Commune *</label
            >
            <div class="relative">
              <i
                class="pi pi-map-marker absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              ></i>
              <select
                formControlName="commune"
                (change)="
                  onLocationFieldUpdate('commune', $any($event.target).value)
                "
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Sélectionner une commune</option>
                <option *ngFor="let commune of communes" [value]="commune.id">
                  {{ commune.designation }}
                </option>
              </select>
              <i
                class="pi pi-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              ></i>
            </div>
            <div
              *ngIf="
                form.get('commune')?.invalid && form.get('commune')?.touched
              "
              class="text-red-600 text-sm mt-2 flex items-center space-x-2"
            >
              <i class="pi pi-exclamation-triangle"></i>
              <span>Veuillez sélectionner une commune</span>
            </div>
          </div>
        </div>

        <!-- Address Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Quartier -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-3"
              >Quartier</label
            >
            <div class="relative">
              <i
                class="pi pi-home absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              ></i>
              <input
                type="text"
                formControlName="quartier"
                placeholder="Nom du quartier"
                (input)="
                  onLocationFieldUpdate('quartier', $any($event.target).value)
                "
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base placeholder-gray-500"
              />
            </div>
          </div>

          <!-- Avenue/Rue -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-3"
              >Avenue/Rue</label
            >
            <div class="relative">
              <i
                class="pi pi-directions absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              ></i>
              <input
                type="text"
                formControlName="avenue"
                placeholder="Nom de l'avenue ou rue"
                (input)="
                  onLocationFieldUpdate('avenue', $any($event.target).value)
                "
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        <!-- Numéro -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-3"
              >Numéro</label
            >
            <div class="relative">
              <i
                class="pi pi-hashtag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              ></i>
              <input
                type="text"
                formControlName="numero"
                placeholder="Numéro de la propriété"
                (input)="
                  onLocationFieldUpdate('numero', $any($event.target).value)
                "
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base placeholder-gray-500"
              />
            </div>
          </div>
          <div></div>
          <!-- Empty div for grid alignment -->
        </div>
      </form>
    </div>
  `,
})
export class LocationSectionComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() villes: Ville[] = [];
  @Input() communes: Commune[] = [];
  @Output() locationFieldUpdated = new EventEmitter<{
    field: string;
    value: string;
  }>();

  ngOnInit(): void {
    this.form.get('ville')?.valueChanges.subscribe((value) => {
      const communeCtrl = this.form.get('commune');

      if (value) {
        communeCtrl?.enable();
      } else {
        communeCtrl?.disable();
        communeCtrl?.reset();
      }
    });
  }

  onLocationFieldUpdate(field: string, value: string) {
    this.locationFieldUpdated.emit({ field, value });
  }
}
