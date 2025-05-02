import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

interface Booking {
  id: string;
  property: {
    id: string;
    name: string;
    type: string;
    location: string;
    imageUrl: string;
    host: {
      name: string;
      photoUrl: string;
    }
  };
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    babies: number;
    pets: number;
  };
  totalNights: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  totalPrice: number;
  paymentMethod: string;
  confirmationCode: string;
}

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {
  booking: Booking | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    // Get the booking ID from route params
    const bookingId = this.route.snapshot.paramMap.get('id');
    
    if (!bookingId) {
      this.error = 'Booking ID not found';
      this.isLoading = false;
      return;
    }

    // In a real app, fetch booking data from service
    // For demo purposes, we'll use mockup data
    this.getMockBooking(bookingId);
  }

  private getMockBooking(bookingId: string): void {
    // Simulate API delay
    setTimeout(() => {
      this.booking = {
        id: bookingId,
        property: {
          id: 'prop123',
          name: 'Oceanfront Villa with Infinity Pool',
          type: 'Entire villa',
          location: 'Malibu, California',
          imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          host: {
            name: 'Sarah',
            photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg'
          }
        },
        checkIn: '2025-05-15',
        checkOut: '2025-05-20',
        guests: {
          adults: 2,
          children: 1,
          babies: 0,
          pets: 0
        },
        totalNights: 5,
        pricePerNight: 299,
        cleaningFee: 150,
        serviceFee: 221,
        taxes: 180,
        totalPrice: 2046,
        paymentMethod: 'Visa ending in 4242',
        confirmationCode: 'HMRXP7'
      };
      
      this.isLoading = false;
    }, 800);
  }

  // Helper to format date as "May 15, 2025"
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Helper to get total guest count
  getTotalGuests(): number {
    if (!this.booking) return 0;
    const { adults, children, babies } = this.booking.guests;
    return adults + children + babies;
  }

  // Helper to get guest summary text
  getGuestSummary(): string {
    if (!this.booking) return '';
    
    const { adults, children, babies, pets } = this.booking.guests;
    const total = adults + children + babies;
    
    let summary = `${total} guest${total !== 1 ? 's' : ''}`;
    
    if (pets > 0) {
      summary += `, ${pets} pet${pets !== 1 ? 's' : ''}`;
    }
    
    return summary;
  }

  // Navigate to trip details
  viewTrip(): void {
    // In a real app, navigate to trip details page
    this.router.navigate(['/trips']);
  }

  // Navigate to send message
  messageHost(): void {
    // In a real app, navigate to messaging page
    this.router.navigate(['/inbox']);
  }

  // Navigate to property details
  viewProperty(): void {
    if (!this.booking) return;
    // In a real app, navigate to property details page
    this.router.navigate(['/property', this.booking.property.id]);
  }
}