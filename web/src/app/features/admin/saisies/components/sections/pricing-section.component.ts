import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AnnoncesService } from '../../services/annonces.service';

@Component({
  selector: 'app-pricing-section',
  template: `
    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8"
    >
      <div class="border-b border-gray-200 pb-6 mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Tarification
        </h2>
        <p class="text-gray-600 mt-2">
          Définissez un prix juste pour maximiser vos réservations
        </p>
      </div>

      <form [formGroup]="form" class="space-y-8">
        <!-- Base Price -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-3"
            >Prix de Base *</label
          >
          <div class="relative">
            <span
              class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
              >€</span
            >
            <input
              type="number"
              formControlName="basePrice"
              class="w-full pl-8 pr-4 py-3 text-gray-900 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base"
              placeholder="0"
            />
          </div>
          <p class="text-sm text-gray-500 mt-2">Prix par nuit avant taxes</p>
        </div>

        <!-- Discounts -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Remises</h3>
          <div class="space-y-4">
            <div
              *ngFor="let discount of discounts"
              class="border-b border-gray-200 pb-4"
            >
              <div class="flex items-start space-x-3">
                <!-- Checkbox -->
                <div class="flex items-center h-5 mt-1">
                  <input
                    type="checkbox"
                    [id]="'discount-' + discount.id"
                    [formControlName]="discount.id.toString() + '_enabled'"
                    class="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                    (change)="onDiscountToggle(discount.id.toString(), $event)"
                  />
                </div>

                <!-- Discount Input -->
                <div class="flex-1">
                  <app-discount-input
                    [label]="discount.name"
                    [description]="discount.description"
                    [controlName]="discount.id"
                    [form]="form"
                    containerClass="border-0 rounded-none"
                  >
                  </app-discount-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class PricingSectionComponent implements OnInit {
  @Input() form!: FormGroup;
  discounts: any[] = [];

  constructor(private service: AnnoncesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.service.findAllDiscounts().subscribe((response) => {
      this.discounts = response;

      const controls: any = {};

      // Add base price control if not already present
      if (!this.form.get('basePrice')) {
        controls['basePrice'] = new FormControl(0, [
          Validators.required,
          Validators.min(0),
        ]);
      }

      // Add controls for each discount
      for (const discount of response) {
        const discountId = discount.id.toString();
        // Percentage control
        controls[discountId] = new FormControl(
          { value: discount.percentage ?? 0, disabled: true },
          [Validators.min(0), Validators.max(100)]
        );

        // Enabled/disabled checkbox control
        controls[discountId + '_enabled'] = new FormControl(false);
      }

      // Add controls to existing form or create new form
      Object.keys(controls).forEach((key) => {
        if (!this.form.get(key)) {
          this.form.addControl(key, controls[key]);
        }
      });
    });
  }

  onDiscountToggle(discountId: string, event: any): void {
    const isChecked = event.target.checked;
    const discountControl = this.form.get(discountId);
    console.log(discountId);
    if (discountControl) {
      if (isChecked) {
        discountControl.enable();
      } else {
        discountControl.disable();
      }
    }
  }

  isDiscountEnabled(discountId: string): boolean {
    const enabledControl = this.form.get(discountId + '_enabled');
    return enabledControl ? enabledControl.value : false;
  }

  // Helper method to get selected discounts for saving to listingdiscount table
  getSelectedDiscounts(): any[] {
    return this.discounts
      .filter((discount) => {
        const enabledControl = this.form.get(discount.id + '_enabled');
        const percentageControl = this.form.get(discount.id);

        return enabledControl?.value && percentageControl?.value > 0;
      })
      .map((discount) => ({
        discountId: discount.id,
        percentage: this.form.get(discount.id)?.value,
        // Add other properties you need for the listingdiscount table
      }));
  }
}
