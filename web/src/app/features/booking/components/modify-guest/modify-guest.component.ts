import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

interface GuestCount {
  adults: number;
  children: number;
  babies: number;
}

@Component({
  selector: 'app-modify-guest',
  templateUrl: './modify-guest.component.html',
  styleUrls: ['./modify-guest.component.scss'],
})
export class ModifyGuestComponent implements OnInit {
  @Input() maxOccupancy = 16;
  @Input() initialValues: GuestCount = { adults: 1, children: 0, babies: 0 };

  guestForm!: FormGroup;

  get isInDialog(): boolean {
    return !!this.ref;
  }

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setInitialValues();
  }

  private initializeForm(): void {
    this.guestForm = this.fb.group({
      adults: [1, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.min(0)]],
      babies: [0, [Validators.min(0)]],
    });
  }

  private setInitialValues(): void {
    if (this.config.data) {
      this.guestForm.patchValue({
        adults: this.config.data.adults || 1,
        children: this.config.data.children || 0,
        babies: this.config.data.infants || 0,
      });
      console.log(this.config.data);
      if (this.config.data.maxOccupancy) {
        this.maxOccupancy = this.config.data.maxOccupancy;
      }
    }
  }

  increaseCount(type: 'adults' | 'children' | 'babies'): void {
    const currentValue = this.guestForm.get(type)?.value || 0;
    const newValue = currentValue + 1;

    if (!this.isIncrementDisabled(type)) {
      this.guestForm.get(type)?.setValue(newValue);
    }
  }

  decreaseCount(type: 'adults' | 'children' | 'babies'): void {
    const currentValue = this.guestForm.get(type)?.value || 0;
    const newValue = currentValue - 1;

    if (!this.isDecrementDisabled(type)) {
      this.guestForm.get(type)?.setValue(newValue);
    }
  }

  isIncrementDisabled(type: 'adults' | 'children' | 'babies'): boolean {
    const adults = this.guestForm.get('adults')?.value || 0;
    const children = this.guestForm.get('children')?.value || 0;
    const totalGuests = adults + children;

    switch (type) {
      case 'adults':
      case 'children':
        return totalGuests >= this.maxOccupancy;
      case 'babies':
        const babies = this.guestForm.get('babies')?.value || 0;
        return babies >= this.maxOccupancy / 2;
      default:
        return false;
    }
  }

  isDecrementDisabled(type: 'adults' | 'children' | 'babies'): boolean {
    const currentValue = this.guestForm.get(type)?.value || 0;

    switch (type) {
      case 'adults':
        return currentValue <= 1; // At least 1 adult required
      case 'children':
      case 'babies':
        return currentValue <= 0;
      default:
        return false;
    }
  }

  onSave(): void {
    if (this.guestForm.valid) {
      const formValue = this.guestForm.value;
      const result = {
        adults: formValue.adults,
        children: formValue.children,
        infants: formValue.babies,
      };

      if (this.isInDialog) {
        this.ref.close(result);
      }
    }
  }

  onCancel(): void {
    this.ref.close();
  }

  getTotalGuests(): number {
    const adults = this.guestForm.get('adults')?.value || 0;
    const children = this.guestForm.get('children')?.value || 0;
    return adults + children;
  }
}
