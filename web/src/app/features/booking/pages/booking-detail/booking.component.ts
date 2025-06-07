// booking.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../../core/authentication/auth.service';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';
import { BookingSessionService } from '../../../apartements/services/booking-session.service';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import {
  ConfirmationToken,
  StripePaymentElement,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js';
import { StripeService } from '../../../../core/services/stripe.service';
import { MessageService } from 'primeng/api';
import { BookingData } from '../../../../core/models/booking-data.model';
import { ConfirmationData } from '../../../../core/models/confirmation-data.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit, OnDestroy {
  @ViewChild('paymentElement', { static: false })
  paymentElementRef!: ElementRef;

  bookingData: BookingData | null = null;
  apartment: any = {};
  user: any = null;

  loading = true;
  error: string | null = null;
  isSubmitting = false;
  bookingDetails: any = {};
  paymentForm!: FormGroup;
  isLoggedIn = false;

  bookingSuccess = false;
  paymentMethods: any[] = [];

  // Calculated fields
  totalNights = 0;
  subtotal = 0;
  cleaningFee = 0;
  serviceFee = 0;
  totalPrice = 0;

  isDatePickerOpen = false;
  isGuestSelectorOpen = false;

  paymentElement?: StripePaymentElement;
  clientSecret = '';
  elements?: any;

  paymentElementReady = false;
  paymentError: string | null = null;

  completionStatus = signal<{ payment: boolean }>({ payment: false });

  confirmationToken?: ConfirmationToken;

  // Subscriptions
  private subscriptions: Subscription[] = [];
  private paymentInitialized = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private annonceService: AnnoncesService,
    private authService: AuthService,
    private bookingSessionService: BookingSessionService,
    private messageService: MessageService,
    private stripeService: StripeService // Assuming you have a Stripe service to handle payments
  ) {
    this.paymentForm = this.fb.group({
      paymentMethodId: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
    });
  }

  async ngOnInit() {
    this.initializeBookingData();
    this.getCurrentUser();
  }

  private initializeBookingData(): void {
    this.route.queryParams.subscribe((params) => {
      const urlBookingData =
        this.bookingSessionService.parseBookingDataFromUrl(params);
      if (
        urlBookingData &&
        this.bookingSessionService.isBookingDataValid(urlBookingData)
      ) {
        this.bookingData = urlBookingData;
        this.bookingSessionService.updateBookingData(urlBookingData);
        this.loadApartmentDetails();
      } else {
        const serviceData = this.bookingSessionService.getCurrentBookingData();

        if (
          serviceData &&
          this.bookingSessionService.isBookingDataValid(serviceData)
        ) {
          this.bookingData = serviceData;
          this.bookingSessionService.navigateWithBookingData(
            serviceData,
            '/booking/confirm'
          );
          this.loadApartmentDetails();
        } else {
          this.handleNoBookingData();
        }
      }
    });
  }

  private handleNoBookingData(): void {
    this.error = 'Aucune donnée de réservation trouvée. Veuillez recommencer.';
    this.loading = false;
    setTimeout(() => this.router.navigate(['/']), 3000);
  }

  private getCurrentUser() {
    this.user = this.authService.getCurrentUser();
  }

  loadApartmentDetails(): void {
    if (!this.bookingData?.listingId) {
      this.error = "ID d'appartement manquant";
      this.loading = false;
      return;
    }
    this.loading = true;
    const apartmentSub = this.annonceService
      .find(this.bookingData.listingId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data) => {
          this.apartment = data;
          this.calculateBookingDetails();
          if (!this.paymentInitialized) {
            this.initilizeBookingAndPayment();
          }
        },
        (error) => {
          this.error = 'Failed to load apartment details. Please try again.';
          console.error('Apartment load error:', error);
        }
      );
    this.subscriptions.push(apartmentSub);
  }

  private buildBookingPayload(): any {
    return {
      listingId: this.bookingData?.listingId,
      checkInDate: new Date(this.bookingData!.checkIn),
      checkOutDate: new Date(this.bookingData!.checkOut),
      adults: this.bookingData!.guests.adults,
      children: this.bookingData!.guests.children ?? 0,
      babies: this.bookingData!.guests.babies ?? 0,
      customerEmail: this.user?.email,
    };
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async initilizeBookingAndPayment() {
    try {
      const bookingData = this.buildBookingPayload();

      const result = await this.stripeService.createBookingAndProcessPayment(
        bookingData
      );

      this.paymentElement = result.paymentElement;
      this.clientSecret = result.clientSecret;
      this.elements = result.elements;

      this.paymentElement.on('change', this.handlePaymentChange);

      setTimeout(() => {
        if (this.paymentElementRef) {
          result.paymentElement.mount(this.paymentElementRef.nativeElement);
        }
      }, 100);
    } catch (error) {
      console.log('error initializing payment intent ', error);
      this.error =
        'Failed to initialize payment. Please refresh and try again.';
    }
  }

  handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    this.completionStatus.update((state) => {
      state.payment = event.complete;
      return state;
    });
  };

  async getConfirmationToken(): Promise<ConfirmationToken | undefined> {
    try {
      if (
        Object.values(this.completionStatus()).every(
          (status) => status === true
        )
      ) {
        const result = await this.stripeService.createConfirmationToken(
          this.clientSecret
        );
        if (result.error) throw new Error(result.error.message);
        this.confirmationToken = result.confirmationToken;

        return this.confirmationToken;
      }
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: error.message,
        life: 3000,
      });
    }
    return undefined;
  }

  calculateBookingDetails(): void {
    if (!this.apartment || !this.bookingData) {
      return;
    }

    try {
      const checkIn = new Date(this.bookingData.checkIn);
      const checkOut = new Date(this.bookingData.checkOut);

      // Calculate number of nights
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      this.totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (this.totalNights <= 0 || isNaN(this.totalNights)) {
        throw new Error('Plage de dates invalide');
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

  async completeBooking() {
    this.isSubmitting = true;
    this.error = null;

    try {
      const confirmationToken = await this.getConfirmationToken();

      if (!confirmationToken) throw new Error('Token non généré');

      const confirmationData: ConfirmationData = {
        bookingData: this.bookingData!,
        confirmationToken: confirmationToken,
        user: this.user,
        clientSecret: this.clientSecret,
      };

      this.bookingSessionService.setConfirmationData(confirmationData);
      this.bookingSessionService.navigateWithBookingData(
        this.bookingData!,
        '/booking/confirm'
      );
    } catch (error) {
      console.error('Erreur lors de la finalisation:', error);
      this.error = 'Erreur lors de la finalisation de la réservation';
    } finally {
      this.isSubmitting = false;
    }
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

  toggleDatePicker(): void {
    this.isDatePickerOpen = !this.isDatePickerOpen;
    this.isGuestSelectorOpen = false;
  }

  formatDate(date: Date): string {
    return format(date, 'dd MMMM yyyy', { locale: fr });
  }

  private formateDateApi(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
