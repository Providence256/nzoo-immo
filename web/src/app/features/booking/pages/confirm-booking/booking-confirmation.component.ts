import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, firstValueFrom, Subscription } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { StripeService } from '../../../../core/services/stripe.service';
import { MessageService } from 'primeng/api';
import { ConfirmationToken } from '@stripe/stripe-js';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BookingSessionService } from '../../../apartements/services/booking-session.service';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';
import { AuthService } from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss'],
})
export class BookingConfirmationComponent implements OnInit, OnDestroy {
  @Input() confirmationToken?: ConfirmationToken;

  booking: any | null = null;
  apartmentId: number;
  bookingDetails: any = {};
  apartment: any = {};
  pricing: any | null = null;
  isLoading = true;
  error: string | null = null;
  isProcessingPayment = false;

  // Calculated fields
  totalNights = 0;
  subtotal = 0;
  cleaningFee = 0;
  serviceFee = 0;
  totalPrice = 0;
  user: any = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService,
    private bookingSessionService: BookingSessionService,
    private stripeService: StripeService,
    private messageService: MessageService,
    private annonceService: AnnoncesService
  ) {
    this.apartmentId = 0;
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.loadConfirmationData();
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

  private getCurrentUser() {
    this.user = this.authService.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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

  loadApartmentDetails(): void {
    if (!this.apartmentId) {
      this.error = 'No apartment ID provided';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    const apartmentSub = this.annonceService
      .find(this.apartmentId)
      .pipe(finalize(() => (this.isLoading = false)))
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

  private loadConfirmationData(): void {
    const confirmationData = this.bookingSessionService.getConfirmationData();

    if (!confirmationData) {
      this.error =
        'Aucune donnée de réservation trouvée. Veuillez recommencer le processus de réservation.';
      this.isLoading = false;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);
      return;
    }

    try {
      this.booking = confirmationData.bookingData;
      this.confirmationToken = confirmationData.confirmationToken;

      console.log('Confirmation data loaded:', {
        booking: this.booking,
        apartment: this.apartment,
        pricing: this.pricing,
        token: this.confirmationToken,
      });

      this.isLoading = false;
    } catch (error) {
      console.error('Error loading confirmation data:', error);
      this.error = 'Erreur lors du chargement des données de réservation.';
      this.isLoading = false;
    }
  }

  async confirmPayment(): Promise<void> {
    if (!this.confirmationToken) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Token de confirmation manquant',
        life: 3000,
      });
      return;
    }

    if (!this.booking) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Données de réservation manquantes',
        life: 3000,
      });
      return;
    }

    this.isProcessingPayment = true;

    try {
      const confirmationData = this.bookingSessionService.getConfirmationData();

      if (!confirmationData?.clientSecret) {
        throw new Error('Client secret manquant pour le paiement');
      }

      const paymentResult = await this.stripeService.confirmPayment(
        this.confirmationToken,
        confirmationData.clientSecret
      );

      if (paymentResult.paymentIntent?.status === 'succeeded') {
        const booking = await this.createBooking();

        const bookingData = {
          listingId: this.booking.listingId,
          checkInDate: this.booking.checkIn,
          checkOutDate: this.booking.checkOut,
          adults: this.booking.guests.adults,
          children: this.booking.guests.children,
          babies: this.booking.guests.babies,
          customerEmail: this.user.email,
          paymentIntentId: paymentResult.paymentIntent.id,
        };

        const bookingResult = await this.stripeService.createBookingAndPay(
          bookingData
        );

        if (bookingResult) {
          console.log('booking Id is', bookingResult);
          this.router.navigate(['booking/success'], {
            queryParams: {
              bookingId: bookingResult.bookingId,
            },
          });
        } else {
          throw new Error('Booking creation failed');
        }
      } else if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      } else {
        throw new Error('Something went wrong');
      }

      // Finaliser le paiement avec Stripe
      // const paymentResult = await this.stripeService.confirmPayment(
      //   this.confirmationToken
      // );

      // if (paymentResult.error) {
      //   throw new Error(paymentResult.error.message);
      // }

      // Créer la réservation dans votre base de données
      // const bookingPayload = {
      //   ...this.booking,
      //   paymentIntentId: paymentResult.paymentIntent?.id,
      //   confirmationTokenId: this.confirmationToken.id,
      //   totalAmount: this.pricing?.totalPrice,
      //   status: 'confirmed'
      // };

      //const bookingResult = await this.bookingService.createBooking(bookingPayload).toPromise();

      // Succès - nettoyer les données de session
      // this.bookingSessionService.clearConfirmationData();

      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Réservation confirmée avec succès !',
        life: 5000,
      });

      // Rediriger vers la page de succès avec l'ID de réservation
    } catch (error: any) {
      console.error('Error confirming payment:', error);

      this.messageService.add({
        severity: 'error',
        summary: 'Erreur de paiement',
        detail:
          error.message ||
          'Échec de la confirmation du paiement. Veuillez contacter le support.',
        life: 5000,
      });
    } finally {
      this.isProcessingPayment = false;
    }
  }

  private async createBooking() {
    return {
      listingId: this.booking.listingId,
      checkInDate: this.booking.checkIn,
      checkOutDate: this.booking.checkOut,
      adults: this.booking.guests.adults,
      children: this.booking.guests.children,
      babies: this.booking.guests.babies,
      customerEmail: this.user.email,
    };
  }

  goBack(): void {
    // Retourner à la page de réservation avec les données
    const currentBookingData =
      this.bookingSessionService.getCurrentBookingData();
    if (currentBookingData) {
      this.bookingSessionService.navigateWithBookingData(
        currentBookingData,
        '/booking/payment'
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  formatDate(dateStr: string | Date): string {
    try {
      const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
      return format(date, 'EEEE d MMMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date invalide';
    }
  }

  getTotalGuests(): number {
    if (!this.booking) return 0;
    const adults = this.booking.adults || 0;
    const children = this.booking.children || 0;
    const babies = this.booking.babies || 0;
    return adults + children + babies;
  }

  getGuestSummary(): string {
    if (!this.booking) return '';

    const adults = this.booking.adults || 0;
    const children = this.booking.children || 0;
    const babies = this.booking.babies || 0;
    const total = adults + children + babies;

    if (total === 0) return 'Aucun voyageur';
    if (total === 1) return '1 voyageur';

    let summary = `${total} voyageurs`;

    const details = [];
    if (adults > 0) details.push(`${adults} adulte${adults > 1 ? 's' : ''}`);
    if (children > 0)
      details.push(`${children} enfant${children > 1 ? 's' : ''}`);
    if (babies > 0) details.push(`${babies} bébé${babies > 1 ? 's' : ''}`);

    if (details.length > 0) {
      summary += ` (${details.join(', ')})`;
    }

    return summary;
  }

  calculateBookingDetails(): void {
    if (!this.apartment || !this.booking) {
      return;
    }

    try {
      const checkIn = new Date(this.booking.checkIn);
      const checkOut = new Date(this.booking.checkOut);

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

  getCurrency(): string {
    if (this.apartment?.price) {
      if (typeof this.apartment.price === 'object') {
        return (
          this.apartment.price.currency ||
          this.apartment.price.codeDevise ||
          'EUR'
        );
      }
    }
    return 'EUR';
  }
}
