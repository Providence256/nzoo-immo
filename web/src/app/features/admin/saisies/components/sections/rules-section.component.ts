// rules-section.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rules-section',
  template: `
    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
    >
      <div class="border-b border-gray-200 pb-6 mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Règles de la maison
        </h2>
        <p class="text-gray-600 mt-2">
          Définissez les règles importantes que vos invités doivent respecter
        </p>
      </div>

      <form [formGroup]="form" class="space-y-6">
        <!-- House Rules -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Règles principales
          </h3>

          <div class="space-y-4">
            <!-- Smoking -->
            <div
              class="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-ban text-gray-600"></i>
                </div>
                <span class="font-medium text-gray-900"
                  >Interdiction de fumer</span
                >
              </div>
              <div class="flex space-x-2">
                <button
                  type="button"
                  [class]="
                    form.get('noSmoking')?.value === false
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  "
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  (click)="onRuleUpdate('noSmoking', false)"
                >
                  <i class="pi pi-times"></i>
                </button>
                <button
                  type="button"
                  [class]="
                    form.get('noSmoking')?.value === true
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  "
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  (click)="onRuleUpdate('noSmoking', true)"
                >
                  <i class="pi pi-check"></i>
                </button>
              </div>
            </div>

            <!-- Pets -->
            <div class="space-y-4">
              <div
                class="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
              >
                <div class="flex items-center space-x-4">
                  <div
                    class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    <i class="pi pi-heart text-gray-600"></i>
                  </div>
                  <span class="font-medium text-gray-900"
                    >Animaux domestiques autorisés</span
                  >
                </div>
                <div class="flex space-x-2">
                  <button
                    type="button"
                    [class]="
                      form.get('petsAllowed')?.value === false
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    "
                    class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    (click)="onRuleUpdate('petsAllowed', false)"
                  >
                    <i class="pi pi-times"></i>
                  </button>
                  <button
                    type="button"
                    [class]="
                      form.get('petsAllowed')?.value === true
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    "
                    class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    (click)="onRuleUpdate('petsAllowed', true)"
                  >
                    <i class="pi pi-check"></i>
                  </button>
                </div>
              </div>

              <!-- Pet Number Input - Shows when pets are allowed -->
              <div
                *ngIf="form.get('petsAllowed')?.value === true"
                class="ml-14 p-4 bg-gray-50 rounded-xl"
              >
                <label class="block text-sm font-medium text-gray-900 mb-2"
                  >Nombre d'animaux autorisés</label
                >
                <input
                  type="number"
                  formControlName="maxPets"
                  min="1"
                  placeholder="Ex: 2"
                  class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            <!-- Parties -->
            <div
              class="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-users text-gray-600"></i>
                </div>
                <span class="font-medium text-gray-900"
                  >Fêtes et événements autorisés</span
                >
              </div>
              <div class="flex space-x-2">
                <button
                  type="button"
                  [class]="
                    form.get('partiesAllowed')?.value === false
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  "
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  (click)="onRuleUpdate('partiesAllowed', false)"
                >
                  <i class="pi pi-times"></i>
                </button>
                <button
                  type="button"
                  [class]="
                    form.get('partiesAllowed')?.value === true
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  "
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  (click)="onRuleUpdate('partiesAllowed', true)"
                >
                  <i class="pi pi-check"></i>
                </button>
              </div>
            </div>

            <!-- Photography -->
            <div
              class="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-camera text-gray-600"></i>
                </div>
                <span class="font-medium text-gray-900"
                  >Séances photo/vidéo autorisées</span
                >
              </div>
              <div class="flex space-x-2">
                <button
                  type="button"
                  [class]="
                    form.get('photographyAllowed')?.value === false
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  "
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  (click)="onRuleUpdate('photographyAllowed', false)"
                >
                  <i class="pi pi-times"></i>
                </button>
                <button
                  type="button"
                  [class]="
                    form.get('photographyAllowed')?.value === true
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  "
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  (click)="onRuleUpdate('photographyAllowed', true)"
                >
                  <i class="pi pi-check"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class RulesSectionComponent {
  @Input() form!: FormGroup;
  @Output() ruleUpdated = new EventEmitter<{ field: string; value: boolean }>();

  onRuleUpdate(field: string, value: boolean) {
    this.ruleUpdated.emit({ field, value });
  }
}
