import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photos-section',
  template: `
    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
    >
      <div class="border-b border-gray-200 pb-6 mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Photos</h2>
        <p class="text-gray-600 mt-2">
          Ajoutez au moins 5 photos de qualité de votre logement
        </p>
      </div>

      <!-- Upload Area -->
      <div class="mb-8">
        <div
          class="aspect-[16/9] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-all"
        >
          <div class="text-center">
            <i class="pi pi-cloud-upload text-6xl text-gray-400 mb-4"></i>
            <p class="text-xl font-semibold text-gray-900 mb-2">
              Glissez vos photos ici
            </p>
            <p class="text-gray-600">ou cliquez pour parcourir</p>
            <p class="text-sm text-gray-500 mt-2">JPG, PNG jusqu'à 10MB</p>
          </div>
        </div>
      </div>

      <!-- Photos Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div
          *ngFor="let photo of photos; let i = index"
          class="aspect-square bg-gray-200 rounded-2xl relative group overflow-hidden"
        >
          <img
            [src]="photo.url"
            class="w-full h-full object-cover"
            [alt]="'Photo ' + (i + 1)"
          />

          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center"
          >
            <div
              class="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2"
            >
              <button
                class="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <i class="pi pi-pencil text-gray-700"></i>
              </button>
              <button
                class="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                (click)="deletePhoto.emit(i)"
              >
                <i class="pi pi-trash text-red-500"></i>
              </button>
            </div>
          </div>

          <div
            *ngIf="i === 0"
            class="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-xs font-medium"
          >
            Photo principale
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PhotosSectionComponent {
  @Input() photos: any[] = [];
  @Output() deletePhoto = new EventEmitter<number>();
}
