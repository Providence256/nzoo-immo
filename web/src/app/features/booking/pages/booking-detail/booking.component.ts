// booking.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { PropertyService } from '../../../../core/services/property.service';
import { Apartment } from '../../../../core/models/apartment.model';
// import { ApartmentService } from '../../services/apartment.service';
// import { AuthService } from '../../services/auth.service';
// import { PaymentService } from '../../services/payment.service';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  children: number;
  infants: number;
}



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit, OnDestroy {
  apartmentId: string;
  apartment?: Apartment;
  loading = true;
  error: string | null = null;
  bookingDetails: BookingDetails = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    children: 0,
    infants: 0
  };
  paymentForm: FormGroup;
  isLoggedIn = false;
  user: any = null;
  isSubmitting = false;
  bookingSuccess = false;
  paymentMethods: PaymentMethod[] = [];
  
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
     private apartmentService: PropertyService,
    // private authService: AuthService,
    // private paymentService: PaymentService,
  ) {
    this.apartmentId = '';
    this.paymentForm = this.fb.group({
      paymentMethodId: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    // this.checkAuthStatus();
    this.getRouteParams();
    this.saveBookingIntent();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // checkAuthStatus(): void {
  //   const authSub = this.authService.isAuthenticated().subscribe(
  //     (isLoggedIn) => {
  //       this.isLoggedIn = isLoggedIn;
  //       if (isLoggedIn) {
  //         this.getUserInfo();
  //         this.loadSavedPaymentMethods();
  //       }
  //     },
  //     (error) => {
  //       this.error = 'Authentication check failed. Please try again.';
  //       console.error('Auth check error:', error);
  //     }
  //   );
  //   this.subscriptions.push(authSub);
  // }

  // getUserInfo(): void {
  //   const userSub = this.authService.getCurrentUser().subscribe(
  //     (user) => {
  //       this.user = user;
  //     },
  //     (error) => {
  //       console.error('Error fetching user info:', error);
  //     }
  //   );
  //   this.subscriptions.push(userSub);
  // }

  getRouteParams(): void {
    const paramSub = this.route.paramMap.subscribe(params => {
      this.apartmentId = params.get('1') || '1';
     
      if (this.apartmentId) {
        this.loadApartmentDetails();
        
        // Get query params for booking details
        const querySub = this.route.queryParamMap.subscribe(queryParams => {
          this.bookingDetails = {
            checkIn: queryParams.get('checkIn') || '',
            checkOut: queryParams.get('checkOut') || '',
            guests: Number(queryParams.get('guests') || 1),
            children: Number(queryParams.get('children') || 0),
            infants: Number(queryParams.get('infants') || 0)
          };
          
          // Try to restore from session storage if query params are empty
          if (!this.bookingDetails.checkIn || !this.bookingDetails.checkOut) {
            this.restoreBookingIntent();
          } else {
            this.calculateBookingDetails();
          }
        });
        this.subscriptions.push(querySub);
      } else {
        this.error = 'Apartment ID is missing';
        this.loading = false;
      }
    });
    this.subscriptions.push(paramSub);
  }

  loadApartmentDetails(): void {
    this.loading = true;
     const apartmentSub = this.apartmentService.getPropertyById('1').pipe(
       finalize(() => this.loading = false)
     ).subscribe(
      (data) => {
        this.apartment = data;
        console.log(data)
         this.calculateBookingDetails();
      },
      (error) => {
         this.error = 'Failed to load apartment details. Please try again.';
         console.error('Apartment load error:', error);
       }
     );
     this.subscriptions.push(apartmentSub);
     
  }

  saveBookingIntent(): void {
    if (this.apartmentId && this.bookingDetails.checkIn && this.bookingDetails.checkOut) {
      const bookingIntent = {
        apartmentId: this.apartmentId,
        ...this.bookingDetails
      };
      sessionStorage.setItem('bookingIntent', JSON.stringify(bookingIntent));
    }
  }

  restoreBookingIntent(): void {
    const bookingIntentStr = sessionStorage.getItem('bookingIntent');
    if (bookingIntentStr) {
      try {
        const bookingIntent = JSON.parse(bookingIntentStr);
        if (bookingIntent.apartmentId === this.apartmentId) {
          this.bookingDetails = {
            checkIn: bookingIntent.checkIn,
            checkOut: bookingIntent.checkOut,
            guests: bookingIntent.guests || 1,
            children: bookingIntent.children || 0,
            infants: bookingIntent.infants || 0
          };
          this.calculateBookingDetails();
        }
      } catch (e) {
        console.error('Error parsing booking intent:', e);
      }
    }
  }

  calculateBookingDetails(): void {
    if (!this.apartment || !this.bookingDetails.checkIn || !this.bookingDetails.checkOut) {
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
      
      console.log('Total nights:', this.totalNights);
      // Calculate subtotal
      this.subtotal = this.apartment.price.amount * this.totalNights;
      
      // Add cleaning fee (this could be a property of the apartment)
      this.cleaningFee = this.apartment.price.amount * 0.1; // Example: 10% of one night
      
      // Add service fee
      this.serviceFee = this.subtotal * 0.12; // Example: 12% service fee
      
      // Calculate total
      this.totalPrice = this.subtotal + this.cleaningFee + this.serviceFee;
    } catch (error) {
      console.error('Error calculating booking details:', error);
      this.error = 'There was an error calculating your booking. Please try again.';
    }
  }

  loadSavedPaymentMethods(): void {
    // const paymentSub = this.paymentService.getSavedPaymentMethods().subscribe(
    //   (methods) => {
    //     this.paymentMethods = methods;
    //     if (methods.length > 0) {
    //       this.paymentForm.patchValue({
    //         paymentMethodId: methods[0].id,
    //         nameOnCard: methods[0].cardHolderName || this.user?.fullName || ''
    //       });
    //     }
    //   },
    //   (error) => {
    //     console.error('Error loading payment methods:', error);
    //     this.notificationService.showError('Unable to load payment methods. Please try again.');
    //   }
    // );
    // this.subscriptions.push(paymentSub);
  }

  addNewPaymentMethod(): void {
    // Save current booking state before navigating
    this.saveBookingIntent();
    
    // Navigate to payment method add page with return URL
    this.router.navigate(['/account/payment-methods/add'], {
      queryParams: {
        returnUrl: this.router.url
      }
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
      Object.keys(this.paymentForm.controls).forEach(key => {
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
      currency: this.apartment?.price.currency || 'USD'
    };
    
    // const bookingSub = this.apartmentService.createBooking(bookingData).pipe(
    //   finalize(() => this.isSubmitting = false)
    // ).subscribe(
    //   (response) => {
    //     this.bookingSuccess = true;
    //     // Clear booking intent from session storage
    //     sessionStorage.removeItem('bookingIntent');
    //     this.notificationService.showSuccess('Booking successful!');
        
    //     // Navigate to confirmation page
    //     setTimeout(() => {
    //       this.router.navigate(['/bookings/confirmation', response.bookingId]);
    //     }, 1500);
    //   },
    //   (error) => {
    //     this.error = error.message || 'Failed to process your booking. Please try again.';
    //     this.notificationService.showError(this.error);
    //   }
    // );
    // this.subscriptions.push(bookingSub);
  }
}