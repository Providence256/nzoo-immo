// availability-setting.component.ts
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-availability-setting',
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

      <!-- Regular dropdown for other settings -->
      <div class="w-48" *ngIf="type === 'dropdown'">
        <p-dropdown
          [options]="options"
          [formControlName]="controlName"
          placeholder="Sélectionner"
          styleClass="w-full"
          [showClear]="false"
        >
        </p-dropdown>
      </div>

      <!-- Trip length inputs -->
      <div class="w-64" *ngIf="type === 'tripLength'">
        <div class="flex items-center space-x-3">
          <div class="flex-1">
            <label class="block text-xs text-gray-600 mb-1">Min nuits</label>
            <input
              type="number"
              [formControlName]="controlName + '_min'"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-bold"
              placeholder="1"
              min="1"
            />
          </div>
          <div class="flex-1">
            <label class="block text-xs text-gray-600 mb-1">Max nuits</label>
            <input
              type="number"
              [formControlName]="controlName + '_max'"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-bold"
              placeholder="365"
              min="1"
            />
          </div>
        </div>
      </div>

      <!-- Advance notice with conditional same-day time selector -->
      <div class="w-64" *ngIf="type === 'advanceNotice'">
        <div class="space-y-3">
          <p-dropdown
            [options]="options"
            [formControlName]="controlName"
            placeholder="Sélectionner le préavis"
            styleClass="w-full"
            [showClear]="false"
            (onChange)="onAdvanceNoticeChange($event)"
          >
          </p-dropdown>

          <!-- Same day time selector -->
          <div *ngIf="showSameDayTime" class="mt-2">
            <label class="block text-xs text-gray-600 mb-1"
              >Heure limite de réservation</label
            >
            <p-dropdown
              [options]="timeOptions"
              [formControlName]="controlName + '_time'"
              placeholder="Sélectionner l'heure"
              styleClass="w-full"
              [showClear]="false"
            >
            </p-dropdown>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AvailabilitySettingComponent {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() controlName: string = '';
  @Input() form!: FormGroup;
  @Input() options: any[] = [];
  @Input() containerClass: string = 'rounded-xl';
  @Input() type: 'dropdown' | 'tripLength' | 'advanceNotice' = 'dropdown';

  showSameDayTime: boolean = false;

  // Time options for same-day booking
  timeOptions = [
    { label: '6:00', value: '06:00' },
    { label: '7:00', value: '07:00' },
    { label: '8:00', value: '08:00' },
    { label: '9:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
    { label: '19:00', value: '19:00' },
    { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' },
    { label: '22:00', value: '22:00' },
  ];

  onAdvanceNoticeChange(event: any) {
    // Show time selector if "same day" is selected
    // You'll need to adjust this condition based on your actual option values
    this.showSameDayTime =
      event.value === 'same_day' || event.value?.value === 'same_day';
  }
}
