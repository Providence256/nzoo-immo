// booking.interface.ts

// booking-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Booking,
  BookingStatus,
  BookingType,
} from '../../../../core/models/booking.interface';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  selectedStatus: string = 'all';
  selectedType: string = 'all';
  isLoading = false;

  readonly BookingStatus = BookingStatus;
  readonly BookingType = BookingType;

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;

    // Simuler des données de réservations
    setTimeout(() => {
      this.bookings = [
        {
          id: '1',
          title: 'Consultation médicale',
          description: 'Consultation de routine',
          startDate: new Date('2025-06-10T09:00:00'),
          endDate: new Date('2025-06-10T10:00:00'),
          status: BookingStatus.CONFIRMED,
          customerName: 'Jean Dupont',
          customerEmail: 'jean.dupont@email.com',
          totalAmount: 75,
          currency: 'EUR',
          createdAt: new Date('2025-06-01T14:30:00'),
          location: 'Cabinet médical',
          type: BookingType.APPOINTMENT,
        },
        {
          id: '2',
          title: 'Réservation restaurant',
          description: 'Table pour 4 personnes',
          startDate: new Date('2025-06-08T19:30:00'),
          endDate: new Date('2025-06-08T21:30:00'),
          status: BookingStatus.PENDING,
          customerName: 'Marie Martin',
          customerEmail: 'marie.martin@email.com',
          totalAmount: 120,
          currency: 'EUR',
          createdAt: new Date('2025-06-02T16:45:00'),
          location: 'Le Petit Bistrot',
          type: BookingType.RESERVATION,
        },
        {
          id: '3',
          title: 'Service de nettoyage',
          description: 'Nettoyage complet appartement',
          startDate: new Date('2025-06-12T14:00:00'),
          endDate: new Date('2025-06-12T17:00:00'),
          status: BookingStatus.COMPLETED,
          customerName: 'Pierre Durand',
          customerEmail: 'pierre.durand@email.com',
          totalAmount: 95,
          currency: 'EUR',
          createdAt: new Date('2025-05-28T10:15:00'),
          location: '123 Rue de la Paix',
          type: BookingType.SERVICE,
        },
        {
          id: '4',
          title: 'Atelier de cuisine',
          description: 'Cours de pâtisserie',
          startDate: new Date('2025-06-15T10:00:00'),
          endDate: new Date('2025-06-15T13:00:00'),
          status: BookingStatus.CANCELLED,
          customerName: 'Sophie Leblanc',
          customerEmail: 'sophie.leblanc@email.com',
          totalAmount: 85,
          currency: 'EUR',
          createdAt: new Date('2025-06-03T09:20:00'),
          location: 'École de cuisine',
          type: BookingType.EVENT,
        },
      ];

      this.filteredBookings = [...this.bookings];
      this.isLoading = false;
    }, 1000);
  }

  filterBookings(): void {
    this.filteredBookings = this.bookings.filter((booking) => {
      const statusMatch =
        this.selectedStatus === 'all' || booking.status === this.selectedStatus;
      const typeMatch =
        this.selectedType === 'all' || booking.type === this.selectedType;
      return statusMatch && typeMatch;
    });
  }

  onStatusFilterChange(status: string): void {
    this.selectedStatus = status;
    this.filterBookings();
  }

  onTypeFilterChange(type: string): void {
    this.selectedType = type;
    this.filterBookings();
  }

  getStatusClass(status: BookingStatus): string {
    switch (status) {
      case BookingStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case BookingStatus.CONFIRMED:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case BookingStatus.COMPLETED:
        return 'bg-green-100 text-green-800 border-green-200';
      case BookingStatus.CANCELLED:
        return 'bg-red-100 text-red-800 border-red-200';
      case BookingStatus.NO_SHOW:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getStatusText(status: BookingStatus): string {
    switch (status) {
      case BookingStatus.PENDING:
        return 'En attente';
      case BookingStatus.CONFIRMED:
        return 'Confirmé';
      case BookingStatus.COMPLETED:
        return 'Terminé';
      case BookingStatus.CANCELLED:
        return 'Annulé';
      case BookingStatus.NO_SHOW:
        return 'Absent';
      default:
        return status;
    }
  }

  getTypeText(type: BookingType): string {
    switch (type) {
      case BookingType.APPOINTMENT:
        return 'Rendez-vous';
      case BookingType.RESERVATION:
        return 'Réservation';
      case BookingType.SERVICE:
        return 'Service';
      case BookingType.EVENT:
        return 'Événement';
      default:
        return type;
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  viewBookingDetails(booking: Booking): void {
    console.log('Voir détails de la réservation:', booking);
    // Implementer la navigation vers les détails
  }

  editBooking(booking: Booking): void {
    console.log('Modifier la réservation:', booking);
    // Implementer la logique de modification
  }

  cancelBooking(booking: Booking): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      booking.status = BookingStatus.CANCELLED;
      console.log('Réservation annulée:', booking);
      // Implementer l'appel API pour annuler
    }
  }
}
