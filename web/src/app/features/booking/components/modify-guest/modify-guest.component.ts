// modify-guest.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface GuestCount {
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
  @Output() guestCountChange = new EventEmitter<GuestCount>();
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<GuestCount>();

  guestForm!: FormGroup;
  // Always show the panel by default
  isDropdownOpen = true;

  constructor(private fb: FormBuilder, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Initialize form with initial values
    this.guestForm = this.fb.group({
      adults: [this.initialValues.adults || 1],
      children: [this.initialValues.children || 0],
      babies: [this.initialValues.babies || 0],
    });

    this.guestForm.valueChanges.subscribe((value: GuestCount) => {
      this.guestCountChange.emit(value);
    });
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      this.isDropdownOpen
    ) {
      this.closeDropdown();
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  saveAndClose() {
    this.save.emit(this.guestForm.value);
    this.closeDropdown();
  }

  onCancel() {
    this.close.emit();
    this.closeDropdown();
  }

  increaseCount(type: keyof GuestCount) {
    const currentValue = this.guestForm.get(type)?.value;

    // Check if we're at max occupancy (adults + children)
    if (
      (type === 'adults' || type === 'children') &&
      this.getTotalOccupancy() >= this.maxOccupancy
    ) {
      return;
    }

    if (type === 'babies' && this.getTotalBabies() >= this.maxOccupancy / 2) {
      return;
    }

    this.guestForm.patchValue({ [type]: currentValue + 1 });
  }

  decreaseCount(type: keyof GuestCount) {
    const currentValue = this.guestForm.get(type)?.value;

    // Don't allow less than 1 adult
    if (type === 'adults' && currentValue <= 1) {
      return;
    }

    // Don't allow negative values
    if (currentValue > 0) {
      this.guestForm.patchValue({ [type]: currentValue - 1 });
    }
  }

  getTotalOccupancy(): number {
    const values = this.guestForm.value;
    return values.adults + values.children;
  }

  getTotalBabies(): number {
    return this.guestForm.value.babies;
  }

  getTotalGuests(): number {
    const values = this.guestForm.value;
    return values.adults + values.children;
  }

  getGuestSummary(): string {
    const values = this.guestForm.value;

    let summary = '';

    if (values.adults > 0) {
      summary = `${values.adults} adulte${values.adults !== 1 ? 's' : ''}`;
    }

    if (values.children > 0) {
      summary += `, ${values.children} enfant${
        values.children !== 1 ? 's' : ''
      }`;
    }

    if (values.babies > 0) {
      summary += `, ${values.babies} bébé${values.babies !== 1 ? 's' : ''}`;
    }

    return summary;
  }

  isDecrementDisabled(type: keyof GuestCount): boolean {
    const value = this.guestForm.get(type)?.value;
    return type === 'adults' ? value <= 1 : value <= 0;
  }

  isIncrementDisabled(type: keyof GuestCount): boolean {
    if (type === 'babies') {
      return this.getTotalBabies() >= this.maxOccupancy / 2;
    } else {
      return this.getTotalOccupancy() >= this.maxOccupancy;
    }
  }
}
