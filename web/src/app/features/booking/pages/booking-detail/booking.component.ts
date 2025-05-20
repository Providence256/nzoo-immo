// booking.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { PropertyService } from '../../../../core/services/property.service';
import { Apartment } from '../../../../core/models/apartment.model';
import { AuthService } from '../../../../core/authentication/auth.service';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';

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
  apartmentId: number;
  apartment: any = {};
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
  isLoggedIn = false; // Default to true for testing, will be updated in checkAuthStatus
  user: any = null;
  isSubmitting = false;
  bookingSuccess = false;
  paymentMethods: PaymentMethod[] = [
    // Mock data for payment methods
    {
      id: 'pm_123456',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
      isDefault: true
    },
    {
      id: 'pm_654321',
      brand: 'mastercard',
      last4: '8888',
      expMonth: 10,
      expYear: 2026,
      isDefault: false
    }
  ];
  
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
  ) {
    this.apartmentId = 0;
    this.paymentForm = this.fb.group({
      paymentMethodId: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    });

    const navigation = this.router.getCurrentNavigation()
    console.log(navigation?.extras?.state)
  }

  ngOnInit(): void {
    this.checkAuthStatus();
    this.getRouteParams();
    this.getBookingDataFromState();
    this.saveBookingIntent();
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  checkAuthStatus(): void {
    // Subscribe to auth state from AuthService
    // const authSub = this.authService.currentUser.subscribe(
    //   (user) => {
    //     this.isLoggedIn = !!user;
    //     this.user = user;
        
    //     if (this.isLoggedIn) {
    //       // In a real app, this would load user's payment methods
    //       // For now we're using the mock data
    //       if (this.paymentMethods.length > 0) {
    //         this.paymentForm.patchValue({
    //           paymentMethodId: this.paymentMethods[0].id,
    //           nameOnCard: this.user?.name || ''
    //         });
    //       }
    //     }
    //   },
    //   (error) => {
    //     console.error('Auth check error:', error);
    //     this.isLoggedIn = false;
    //   }
    // );
    // this.subscriptions.push(authSub);
  }

  getRouteParams(): void {
    const paramSub = this.route.paramMap.subscribe(params => {
      this.apartmentId =  3;
      
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

  // Get booking data passed from the apartment detail page through router state
  getBookingDataFromState(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
      console.log(this.router.getCurrentNavigation())
    if (state && state['bookingData']) {
      this.apartmentId = state['bookingData'].annonceId;
      this.bookingDetails = {
        checkIn: state['bookingData'].checkIn,
        checkOut: state['bookingData'].checkOut,
        guests: state['bookingData'].guests,
        children: 0, // Assuming these aren't passed from the detail page
        infants: 0
      };
      
      // If apartment info is passed through state, use it
      if (state['apartment']) {
        this.apartment = state['apartment'];
        this.loading = false;
        this.calculateBookingDetails();
      } else {
        // Otherwise, load from API
        this.loadApartmentDetails();
      }
    }
  }

  loadApartmentDetails(): void {
    if (!this.apartmentId) {
      this.error = 'No apartment ID provided';
      this.loading = false;
      return;
    }
    
    this.loading = true;
    const apartmentSub = this.annonceService.find(this.apartmentId).pipe(
      finalize(() => this.loading = false)
    ).subscribe(
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
      
      // Calculate subtotal (handle both price structures)
      if (this.apartment.price && typeof this.apartment.price === 'object') {
        // Handle if price is an object with amount property
        if (this.apartment.price.amount) {
          this.subtotal = this.apartment.price.amount * this.totalNights;
        } 
        // Handle if price has prixBase property (from annonce object)
        else if (this.apartment.price.prixBase) {
          this.subtotal = this.apartment.price.prixBase * this.totalNights;
        }
      } else if (typeof this.apartment.price === 'number') {
        // If price is just a number
        this.subtotal = this.apartment.price * this.totalNights;
      }
      
      // Add cleaning fee (10% of one night)
      this.cleaningFee = this.subtotal / this.totalNights * 0.1;
      
      // Add service fee (12% of subtotal)
      this.serviceFee = this.subtotal * 0.12;
      
      // Calculate total
      this.totalPrice = this.subtotal + this.cleaningFee + this.serviceFee;
    } catch (error) {
      console.error('Error calculating booking details:', error);
      this.error = 'There was an error calculating your booking. Please try again.';
    }
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
      currency: this.getCurrency()
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
        return this.apartment.price.currency || 
               this.apartment.price.codeDevise || 
               'USD';
      }
    }
    
    return 'USD';
  }
}