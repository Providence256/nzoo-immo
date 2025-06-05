export interface Booking {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  currency: string;
  createdAt: Date;
  location?: string;
  type: BookingType;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum BookingType {
  APPOINTMENT = 'appointment',
  RESERVATION = 'reservation',
  SERVICE = 'service',
  EVENT = 'event',
}
