// discount-input.component.ts
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-discount-input',
  template: `
    <div
      class="flex items-center justify-between p-4 border border-gray-200"
      [class]="containerClass"
      [formGroup]="form"
    >
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-900">{{
          label
        }}</label>
        <p class="text-sm text-gray-500">{{ description }}</p>
      </div>
      <div class="flex items-center space-x-3">
        <div class="relative">
          <input
            type="number"
            [formControlName]="controlName"
            class="w-20 px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-center"
            placeholder="0"
            min="0"
            max="100"
          />
          <span
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >%</span
          >
        </div>
      </div>
    </div>
  `,
})
export class DiscountInputComponent {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() controlName: string = '';
  @Input() form!: FormGroup;
  @Input() containerClass: string = 'rounded-xl';
}
