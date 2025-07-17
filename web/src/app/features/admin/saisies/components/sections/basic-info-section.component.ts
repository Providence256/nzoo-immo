import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-info-section',
  template: `
    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
    >
      <div class="border-b border-gray-200 pb-6 mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Informations de base
        </h2>
        <p class="text-gray-600 mt-2">
          Décrivez votre logement avec des détails précis
        </p>
      </div>

      <form [formGroup]="form" class="space-y-8">
        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-3"
            >Titre de l'annonce *</label
          >
          <input
            type="text"
            formControlName="title"
            class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base placeholder-gray-500"
            placeholder="Exemple : Appartement moderne avec vue sur la mer"
          />
          <div
            *ngIf="form.get('title')?.invalid && form.get('title')?.touched"
            class="text-red-600 text-sm mt-2 flex items-center space-x-2"
          >
            <i class="pi pi-exclamation-triangle"></i>
            <span>Le titre doit contenir au moins 10 caractères</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-3"
            >Description *</label
          >
          <textarea
            formControlName="description"
            rows="6"
            class="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base resize-none placeholder-gray-500"
            placeholder="Décrivez votre logement, ses points forts, le quartier et ce qui le rend unique..."
          ></textarea>
          <div
            *ngIf="
              form.get('description')?.invalid &&
              form.get('description')?.touched
            "
            class="text-red-600 text-sm mt-2 flex items-center space-x-2"
          >
            <i class="pi pi-exclamation-triangle"></i>
            <span>La description doit contenir au moins 50 caractères</span>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class BasicInfoSectionComponent {
  @Input() form!: FormGroup;
}
