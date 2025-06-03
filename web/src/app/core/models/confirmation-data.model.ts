import { BookingData } from './booking-data.model';

export interface ConfirmationData {
  bookingData: BookingData;
  confirmationToken?: any;
  user?: any;
}
