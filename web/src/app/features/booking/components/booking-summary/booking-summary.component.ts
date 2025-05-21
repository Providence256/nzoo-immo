import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BookingSessionService } from '../../../apartements/services/booking-session.service';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss'],
})
export class BookingSummaryComponent implements OnInit {
  @Input() apartmentId!: string;

  bookingDetails: any = {
    checkIn: null,
    checkOut: null,
    guests: 1,
    children: 0,
    infants: 0,
  };

  isDatePickerOpen = false;
  isGuestSelectorOpen = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private bookingSessionService: BookingSessionService
  ) {}

  ngOnInit(): void {
    // Get booking data from service or query params
    const bookingData = this.bookingSessionService.getCurrentBookingData();

    if (bookingData) {
      this.bookingDetails = {
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests.adults,
        children: bookingData.guests.children || 0,
        infants: bookingData.guests.babies || 0,
      };
    } else {
      // Fallback to query params if no booking data in service
      this.route.queryParams.subscribe((params) => {
        const parsedData =
          this.bookingSessionService.parseBookingDataFromUrl(params);
        if (parsedData) {
          this.bookingDetails = {
            checkIn: parsedData.checkIn,
            checkOut: parsedData.checkOut,
            guests: parsedData.guests.adults,
            children: parsedData.guests.children || 0,
            infants: parsedData.guests.babies || 0,
          };
        }
      });
    }
  }

  formatDate(date: Date | string | null): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'd MMM', { locale: fr });
  }

  toggleDatePicker(): void {
    this.isDatePickerOpen = !this.isDatePickerOpen;
    if (this.isDatePickerOpen) {
      this.isGuestSelectorOpen = false;
    }
  }

  toggleGuestSelector(): void {
    this.isGuestSelectorOpen = !this.isGuestSelectorOpen;
    if (this.isGuestSelectorOpen) {
      this.isDatePickerOpen = false; // Close date picker if open
    }
  }

  onDateRangeSelect(event: { startDate: Date; endDate: Date }) {
    console.log('Selected date range:', event);
    this.cdr.detectChanges();
  }

  onGuestCountChange(guestCount: {
    adults: number;
    children: number;
    babies: number;
  }): void {
    this.bookingDetails.guests = guestCount.adults;
    this.bookingDetails.children = guestCount.children;
    this.bookingDetails.infants = guestCount.babies;

    // Update booking session data
    this.updateBookingSessionData();
  }

  private updateBookingSessionData(): void {
    // Update booking session data
    const currentBookingData =
      this.bookingSessionService.getCurrentBookingData();
    if (currentBookingData) {
      // Update dates
      if (this.bookingDetails.checkIn && this.bookingDetails.checkOut) {
        currentBookingData.checkIn = this.bookingDetails.checkIn;
        currentBookingData.checkOut = this.bookingDetails.checkOut;
      }

      // Update guest counts
      currentBookingData.guests = {
        adults: this.bookingDetails.guests,
        children: this.bookingDetails.children,
        babies: this.bookingDetails.infants,
      };

      // Update service and url
      this.bookingSessionService.updateBookingData(currentBookingData);
      this.bookingSessionService.navigateWithBookingData(
        currentBookingData,
        this.router.url.split('?')[0] // Preserve current route without query params
      );
    }
  }
}
