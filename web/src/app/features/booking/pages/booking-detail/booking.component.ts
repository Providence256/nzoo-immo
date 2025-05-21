// booking.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../../core/authentication/auth.service';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';
import { BookingSessionService } from '../../../apartements/services/booking-session.service';
import { fr, th } from 'date-fns/locale';
import { format } from 'date-fns';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit, OnDestroy {
  apartmentId: number;
  apartment: any = {};
  loading = true;
  error: string | null = null;
  bookingDetails: any = {};
  paymentForm!: FormGroup;
  isLoggedIn = false;
  user: any = null;
  isSubmitting = false;
  bookingSuccess = false;
  paymentMethods: any[] = [];

  // Calculated fields
  totalNights = 0;
  subtotal = 0;
  cleaningFee = 0;
  serviceFee = 0;
  totalPrice = 0;

  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private annonceService: AnnoncesService,
    private authService: AuthService,
    private bookingSessionService: BookingSessionService
  ) {
    this.apartmentId = 0;
    this.paymentForm = this.fb.group({
      paymentMethodId: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const bookingData =
        this.bookingSessionService.parseBookingDataFromUrl(params);
      if (bookingData) {
        this.bookingSessionService.updateBookingData(bookingData);
        this.processBookingData(bookingData);
      } else {
        const serviceData = this.bookingSessionService.getCurrentBookingData();
        if (serviceData) {
          this.bookingSessionService.navigateWithBookingData(
            serviceData,
            '/booking/confirm'
          );
          this.processBookingData(serviceData);
        }
      }
    });
  }

  private processBookingData(bookingData: any): void {
    this.apartmentId = bookingData.listingId;
    this.bookingDetails = {
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests.adults,
      children: bookingData.guests.children,
      infants: bookingData.guests.babies,
    };

    this.loadApartmentDetails();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadApartmentDetails(): void {
    if (!this.apartmentId) {
      this.error = 'No apartment ID provided';
      this.loading = false;
      return;
    }
    this.loading = true;
    const apartmentSub = this.annonceService
      .find(this.apartmentId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => {
          this.apartment = data;
          this.calculateBookingDetails();
        },
        (error) => {
          this.error = 'Failed to load apartment details. Please try again.';
          console.error('Apartment load error:', error);
        }
      );
    this.subscriptions.push(apartmentSub);
  }

  calculateBookingDetails(): void {
    if (
      !this.apartment ||
      !this.bookingDetails.checkIn ||
      !this.bookingDetails.checkOut
    ) {
      return;
    }

    try {
      const checkIn = new Date(this.bookingDetails.checkIn);
      const checkOut = new Date(this.bookingDetails.checkOut);

      // Calculate number of nights
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      this.totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (this.totalNights <= 0 || isNaN(this.totalNights)) {
        throw new Error('Invalid date range');
      }

      // Calculate subtotal (handle both price structures)
      if (this.apartment.price && typeof this.apartment.price === 'object') {
        // Handle if price is an object with amount property

        // Handle if price has prixBase property (from annonce object)
        if (this.apartment.price.prixBase) {
          this.subtotal = this.apartment.price.prixBase * this.totalNights;
        }
      } else if (typeof this.apartment.price === 'number') {
        // If price is just a number
        this.subtotal = this.apartment.price * this.totalNights;
      }

      // Add cleaning fee (10% of one night)
      this.cleaningFee = this.apartment.price.fraisMenage;

      // Add service fee (12% of subtotal)
      this.serviceFee = this.subtotal * 0.12;

      // Calculate total
      this.totalPrice = this.subtotal + this.cleaningFee;
    } catch (error) {
      console.error('Error calculating booking details:', error);
      this.error =
        'There was an error calculating your booking. Please try again.';
    }
  }

  addNewPaymentMethod(): void {
    // Save current booking state before navigating

    // Navigate to payment method add page with return URL
    this.router.navigate(['/account/payment-methods/add'], {
      queryParams: {
        returnUrl: this.router.url,
      },
    });
  }

  validateBookingData(): boolean {
    if (!this.apartment) {
      this.error = 'Apartment details not loaded';
      return false;
    }

    if (!this.bookingDetails.checkIn || !this.bookingDetails.checkOut) {
      this.error = 'Please select check-in and check-out dates';
      return false;
    }

    if (this.totalNights <= 0) {
      this.error = 'Invalid booking duration';
      return false;
    }

    if (this.paymentForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.paymentForm.controls).forEach((key) => {
        this.paymentForm.get(key)?.markAsTouched();
      });
      return false;
    }

    return true;
  }

  submitBooking(): void {
    if (!this.validateBookingData()) {
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const bookingData = {
      apartmentId: this.apartmentId,
      checkIn: this.bookingDetails.checkIn,
      checkOut: this.bookingDetails.checkOut,
      guests: this.bookingDetails.guests,
      children: this.bookingDetails.children,
      infants: this.bookingDetails.infants,
      paymentMethodId: this.paymentForm.get('paymentMethodId')?.value,
      nameOnCard: this.paymentForm.get('nameOnCard')?.value,
      totalAmount: this.totalPrice,
      currency: this.getCurrency(),
    };

    // Simulate a successful booking request
    setTimeout(() => {
      this.isSubmitting = false;
      this.bookingSuccess = true;

      // Clear booking intent from session storage
      sessionStorage.removeItem('bookingIntent');

      // Navigate to confirmation page after a brief delay
      setTimeout(() => {
        this.router.navigate(['/bookings/confirmation', 'mock-booking-id']);
      }, 1500);
    }, 2000);

    // In a real app, you would call a service to create the booking
    // this.bookingService.createBooking(bookingData).pipe(
    //   finalize(() => this.isSubmitting = false)
    // ).subscribe(
    //   (response) => {
    //     this.bookingSuccess = true;
    //     sessionStorage.removeItem('bookingIntent');
    //
    //     setTimeout(() => {
    //       this.router.navigate(['/bookings/confirmation', response.bookingId]);
    //     }, 1500);
    //   },
    //   (error) => {
    //     this.error = error.message || 'Failed to process your booking. Please try again.';
    //   }
    // );
  }

  getCurrency(): string {
    if (this.apartment?.price) {
      if (typeof this.apartment.price === 'object') {
        // Check if it has currency or codeDevise property
        return (
          this.apartment.price.currency ||
          this.apartment.price.codeDevise ||
          'USD'
        );
      }
    }

    return 'USD';
  }

  formatDate(date: Date): string {
    return format(date, 'dd MMMM yyyy', { locale: fr });
  }
}
