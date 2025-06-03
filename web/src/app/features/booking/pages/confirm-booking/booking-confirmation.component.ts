import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { StripeService } from '../../../../core/services/stripe.service';
import { MessageService } from 'primeng/api';
import { ConfirmationToken } from '@stripe/stripe-js';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BookingSessionService } from '../../../apartements/services/booking-session.service';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';
import { ConfirmationData } from '../../../../core/models/confirmation-data.model';
import { BookingData } from '../../../../core/models/booking-data.model';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss'],
})
export class BookingConfirmationComponent implements OnInit, OnDestroy {
  confirmationData: ConfirmationData | null = null;
  booking: any | null = null;
  apartmentId: number;
  bookingData: BookingData | null = null;
  apartment: any = {};
  isLoading = true;
  error: string | null = null;
  isProcessingPayment = false;
  confirmationToken?: ConfirmationToken;
  user: any = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private bookingSessionService: BookingSessionService,
    private stripeService: StripeService,
    private messageService: MessageService,
    private annonceService: AnnoncesService
  ) {
    this.apartmentId = 0;
  }

  ngOnInit(): void {
    this.initiliazeConfirmationData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private initiliazeConfirmationData(): void {
    this.confirmationData = this.bookingSessionService.getConfirmationData();

    if (!this.confirmationData) {
      this.tryLoadFromUrl();
      return;
    }

    this.extractConfirmationData();
    this.isLoading = false;
  }

  private tryLoadFromUrl(): void {
    const urlSub = this.route.queryParams.subscribe((params) => {
      const urlBookingData =
        this.bookingSessionService.parseBookingDataFromUrl(params);

      if (
        urlBookingData &&
        this.bookingSessionService.isBookingDataValid(urlBookingData)
      ) {
        this.bookingSessionService.navigateWithBookingData(
          urlBookingData,
          '/booking'
        );
      } else {
        this.handleNoConfirmationData();
      }
    });

    this.subscriptions.push(urlSub);
    console.log(urlSub);
  }

  private extractConfirmationData(): void {
    if (!this.confirmationData) return;

    try {
      this.bookingData = this.confirmationData.bookingData;
      this.confirmationToken = this.confirmationData.confirmationToken;
      this.user = this.confirmationData.user;
    } catch (error) {
      console.error("Erreur lors de l'extraction des données:", error);
      this.error = 'Erreur lors du chargement des données de réservation.';
    }
  }

  private handleNoConfirmationData(): void {
    this.error =
      'Aucune donnée de réservation trouvée. Veuillez recommencer le processus.';
    this.isLoading = false;

    this.messageService.add({
      severity: 'warn',
      summary: 'Données manquantes',
      detail: "Redirection vers la page d'accueil...",
      life: 3000,
    });

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
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
        },
        (error) => {
          this.error = 'Failed to load apartment details. Please try again.';
          console.error('Apartment load error:', error);
        }
      );
    this.subscriptions.push(apartmentSub);
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
      setTimeout(() => {
        this.router.navigate(['/booking/success'], {
          queryParams: { bookingId: 1 },
        });
      }, 2000);
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

  goBack(): void {
    // Retourner à la page de réservation avec les données
    const currentBookingData =
      this.bookingSessionService.getCurrentBookingData();
    if (currentBookingData) {
      this.bookingSessionService.navigateWithBookingData(
        currentBookingData,
        '/booking/confirm'
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
