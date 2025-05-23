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

interface GuestCount {
  adults: number;
  children: number;
  babies: number;
}

@Component({
  selector: 'app-guest-selector',
  templateUrl: './guest-selector.component.html',
  styleUrls: ['./guest-selector.component.scss'],
})
export class GuestSelectorComponent implements OnInit {
  @Input() maxOccupancy = 16;
  @Input() initialValues: GuestCount = { adults: 1, children: 0, babies: 0 };
  @Output() guestCountChange = new EventEmitter<GuestCount>();

  isDropdownOpen = false;
  guestForm!: FormGroup;

  constructor(private fb: FormBuilder, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.guestForm = this.fb.group({
      adults: [1],
      children: [0],
      babies: [0],
    });

    this.guestForm.valueChanges.subscribe((value: GuestCount) => {
      this.guestCountChange.emit(value);
    });
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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
    const total = this.getTotalGuests();

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
}
