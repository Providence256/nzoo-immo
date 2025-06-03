import { BookingGuests } from './booking-guest.model';

export interface BookingData {
  listingId: number;
  checkIn: Date;
  checkOut: Date;
  guests: BookingGuests;
}
