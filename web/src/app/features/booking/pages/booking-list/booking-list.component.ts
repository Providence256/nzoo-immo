import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BookingService } from '../../services/booking.service';

// Interface pour les données de réservation de votre API
interface UserBooking {
  id: number;
  listingId: number;
  listingTitle: string;
  listingPhotoUrl: string;
  location: string | null;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  babies: number;
  totalPrice: number;
  currency: string;
  status: number; // 0 = pending, 1 = confirmed, 2 = completed, 3 = cancelled, 4 = no-show
  createdAt: string;
  paymentStatus: number; // 0 = pending, 1 = paid, 2 = failed, 3 = refunded
}

// Enums pour les statuts
enum BookingStatus {
  PENDING = 0,
  CONFIRMED = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  NO_SHOW = 4,
}

enum PaymentStatus {
  PENDING = 0,
  PAID = 1,
  FAILED = 2,
  REFUNDED = 3,
}

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit, AfterViewInit {
  @ViewChildren('bookingCard') bookingCards!: QueryList<ElementRef>;

  bookings: UserBooking[] = [];
  filteredBookings: UserBooking[] = [];
  selectedStatus: string = 'all';
  selectedPaymentStatus: string = 'all';
  searchQuery: string = '';
  isLoading = false;

  readonly BookingStatus = BookingStatus;
  readonly PaymentStatus = PaymentStatus;

  constructor(
    private bookingService: BookingService // Injectez votre service de booking ici // private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateCards();
    }, 100);
  }

  private animateCards(): void {
    // Animation des cartes avec un délai progressif
    this.bookingCards.forEach((card, index) => {
      setTimeout(() => {
        card.nativeElement.classList.add('animate-in');
      }, index * 100);
    });
  }

  loadBookings(): void {
    this.isLoading = true;

    // Remplacez cette simulation par votre appel API réel
    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.filteredBookings = [...this.bookings];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des réservations:', error);
        this.isLoading = false;
      },
    });
  }

  // Méthodes de gestion des filtres
  onStatusFilterChange(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  onPaymentStatusFilterChange(paymentStatus: string): void {
    this.selectedPaymentStatus = paymentStatus;
    this.applyFilters();
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredBookings = this.bookings.filter((booking) => {
      // Filtre par statut de réservation
      const statusMatch =
        this.selectedStatus === 'all' ||
        booking.status.toString() === this.selectedStatus;

      // Filtre par statut de paiement
      const paymentStatusMatch =
        this.selectedPaymentStatus === 'all' ||
        booking.paymentStatus.toString() === this.selectedPaymentStatus;

      // Filtre par recherche textuelle
      const searchMatch =
        !this.searchQuery ||
        booking.listingTitle
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        booking.id.toString().includes(this.searchQuery);

      return statusMatch && paymentStatusMatch && searchMatch;
    });
  }

  // Méthodes utilitaires pour l'affichage
  getBookingCountByStatus(status: BookingStatus): number {
    return this.bookings.filter((booking) => booking.status === status).length;
  }

  getBookingCountByPaymentStatus(paymentStatus: PaymentStatus): number {
    return this.bookings.filter(
      (booking) => booking.paymentStatus === paymentStatus
    ).length;
  }

  getStatusIndicatorClass(status: number): string {
    const classes: { [key: number]: string } = {
      [BookingStatus.PENDING]: 'status-indicator pending',
      [BookingStatus.CONFIRMED]: 'status-indicator confirmed',
      [BookingStatus.COMPLETED]: 'status-indicator completed',
      [BookingStatus.CANCELLED]: 'status-indicator cancelled',
      [BookingStatus.NO_SHOW]: 'status-indicator no-show',
    };
    return classes[status] || 'status-indicator pending';
  }

  getStatusBadgeClass(status: number): string {
    const classes: { [key: number]: string } = {
      [BookingStatus.PENDING]: 'status-badge pending',
      [BookingStatus.CONFIRMED]: 'status-badge confirmed',
      [BookingStatus.COMPLETED]: 'status-badge completed',
      [BookingStatus.CANCELLED]: 'status-badge cancelled',
      [BookingStatus.NO_SHOW]: 'status-badge no-show',
    };
    return classes[status] || 'status-badge pending';
  }

  getPaymentStatusBadgeClass(paymentStatus: number): string {
    const classes: { [key: number]: string } = {
      [PaymentStatus.PENDING]:
        'bg-yellow-100 text-yellow-800 border border-yellow-200',
      [PaymentStatus.PAID]:
        'bg-green-100 text-green-800 border border-green-200',
      [PaymentStatus.FAILED]: 'bg-red-100 text-red-800 border border-red-200',
      [PaymentStatus.REFUNDED]:
        'bg-gray-100 text-gray-800 border border-gray-200',
    };
    return (
      classes[paymentStatus] ||
      'bg-yellow-100 text-yellow-800 border border-yellow-200'
    );
  }

  getStatusText(status: number): string {
    const statusTexts: { [key: number]: string } = {
      [BookingStatus.PENDING]: 'En attente',
      [BookingStatus.CONFIRMED]: 'Confirmé',
      [BookingStatus.COMPLETED]: 'Terminé',
      [BookingStatus.CANCELLED]: 'Annulé',
      [BookingStatus.NO_SHOW]: 'Absent',
    };
    return statusTexts[status] || 'En attente';
  }

  getPaymentStatusText(paymentStatus: number): string {
    const paymentStatusTexts: { [key: number]: string } = {
      [PaymentStatus.PENDING]: 'En attente',
      [PaymentStatus.PAID]: 'Payé',
      [PaymentStatus.FAILED]: 'Échoué',
      [PaymentStatus.REFUNDED]: 'Remboursé',
    };
    return paymentStatusTexts[paymentStatus] || 'En attente';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  formatSimpleDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  getGuestCount(booking: UserBooking): string {
    let guests = [];
    if (booking.adults > 0)
      guests.push(`${booking.adults} adulte${booking.adults > 1 ? 's' : ''}`);
    if (booking.children > 0)
      guests.push(
        `${booking.children} enfant${booking.children > 1 ? 's' : ''}`
      );
    if (booking.babies > 0)
      guests.push(`${booking.babies} bébé${booking.babies > 1 ? 's' : ''}`);
    return guests.join(', ');
  }

  getStayDuration(checkIn: string, checkOut: string): number {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Méthodes d'actions
  viewBookingDetails(booking: UserBooking): void {
    console.log('Voir détails de la réservation:', booking);
    // Navigation vers la page de détails
    // this.router.navigate(['/bookings', booking.id]);
  }

  editBooking(booking: UserBooking): void {
    if (
      booking.status === BookingStatus.COMPLETED ||
      booking.status === BookingStatus.CANCELLED
    ) {
      alert('Cette réservation ne peut plus être modifiée.');
      return;
    }
    console.log('Modifier la réservation:', booking);
    // Navigation vers la page d'édition
    // this.router.navigate(['/bookings', booking.id, 'edit']);
  }

  cancelBooking(booking: UserBooking): void {
    if (
      booking.status === BookingStatus.COMPLETED ||
      booking.status === BookingStatus.CANCELLED
    ) {
      alert('Cette réservation ne peut pas être annulée.');
      return;
    }

    if (
      confirm(
        `Êtes-vous sûr de vouloir annuler la réservation "${booking.listingTitle}" ?`
      )
    ) {
      // Mettre à jour le statut localement
      const bookingIndex = this.bookings.findIndex((b) => b.id === booking.id);
      if (bookingIndex !== -1) {
        this.bookings[bookingIndex].status = BookingStatus.CANCELLED;
        this.applyFilters();
      }

      console.log('Réservation annulée:', booking);
      // Appel API pour annuler la réservation
      // this.bookingService.cancelBooking(booking.id).subscribe(...)
    }
  }

  contactHost(booking: UserBooking): void {
    console.log("Contacter l'hôte pour la réservation:", booking);
    // Ouvrir un modal de contact ou rediriger vers une page de messagerie
  }

  downloadInvoice(booking: UserBooking): void {
    if (booking.paymentStatus !== PaymentStatus.PAID) {
      alert("La facture n'est disponible que pour les réservations payées.");
      return;
    }
    console.log('Télécharger la facture pour:', booking);
    // Appel API pour générer et télécharger la facture
    // this.bookingService.downloadInvoice(booking.id).subscribe(...)
  }

  createNewBooking(): void {
    console.log('Créer une nouvelle réservation');
    // Navigation vers la page de recherche/création de réservation
    // this.router.navigate(['/search']);
  }
}
