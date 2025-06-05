import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';
import { AuthService } from '../../../../core/authentication/auth.service';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.scss'],
})
export class BookingSuccessComponent implements OnInit, OnDestroy {
  bookingId: string | null = null;
  paymentIntentId: string | null = null;
  booking: any = null;
  apartment: any = null;
  user: any = null;

  isLoading = true;
  error: string | null = null;

  // Calculated fields
  totalNights = 0;
  subtotal = 0;
  cleaningFee = 0;
  serviceFee = 0;
  totalPrice = 0;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private annonceService: AnnoncesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    this.route.queryParams.subscribe((params) => {
      this.bookingId = params['bookingId'];
      this.paymentIntentId = params['paymentIntentId'];

      if (this.bookingId) {
        this.loadBookingDetails();
      } else {
        this.error = 'ID de réservation manquant';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private loadBookingDetails(): void {
    if (!this.bookingId) return;

    this.isLoading = true;

    const bookingSub = this.bookingService
      .getBooking(this.bookingId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (booking) => {
          this.booking = booking;
          this.loadApartmentDetails();
        },
        error: (error) => {
          console.error('Error loading booking:', error);
          this.error =
            'Erreur lors du chargement des détails de la réservation';
        },
      });

    this.subscriptions.push(bookingSub);
  }

  private loadApartmentDetails(): void {
    if (!this.booking?.listingId) return;

    const apartmentSub = this.annonceService
      .find(this.booking.listingId)
      .subscribe({
        next: (apartment) => {
          this.apartment = apartment;
          this.calculateBookingDetails();
        },
        error: (error) => {
          console.error('Error loading apartment:', error);
        },
      });

    this.subscriptions.push(apartmentSub);
  }

  private calculateBookingDetails(): void {
    if (!this.booking) return;

    try {
      const checkIn = new Date(this.booking.checkInDate);
      const checkOut = new Date(this.booking.checkOutDate);

      // Calculate number of nights
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      this.totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Use booking totals if available, otherwise calculate
      this.totalPrice = this.booking.totalPrice || 0;
      if (this.apartment.price.prixBase) {
        this.subtotal = this.apartment.price.prixBase * this.totalNights;
      }

      this.cleaningFee = this.apartment.price.fraisMenage || 0;
    } catch (error) {
      console.error('Error calculating booking details:', error);
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

  formatShortDate(dateStr: string | Date): string {
    try {
      const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
      return format(date, 'd MMM', { locale: fr });
    } catch (error) {
      return '';
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
    return this.booking?.currency || this.apartment?.price?.currency || 'EUR';
  }

  downloadBookingConfirmation(): void {
    // Implement PDF download logic here
    console.log('Download booking confirmation');
  }

  goToMyBookings(): void {
    this.router.navigate(['/profile/bookings']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  shareBooking(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Ma réservation confirmée',
        text: `Réservation confirmée pour ${this.apartment?.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  }
}
