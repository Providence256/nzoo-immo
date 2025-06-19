import { Component, OnInit } from '@angular/core';

interface BookingInfo {
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
}

@Component({
  selector: 'app-host-booking-calendar',
  templateUrl: './host-calendar.component.html',
})
export class HostCalendarComponent implements OnInit {
  currentDate = new Date();
  selectedMonth = new Date();
  bookings: BookingInfo[] = [];
  bookedDates = new Map<string, BookingInfo>();

  constructor() {}

  ngOnInit() {
    // Sample booking data - replace with your actual data service
    this.bookings = [
      {
        guestName: 'Alice Martin',
        checkIn: new Date(2025, 5, 15), // June 15, 2025
        checkOut: new Date(2025, 5, 18), // June 18, 2025
        nights: 3,
      },
      {
        guestName: 'John_traveler',
        checkIn: new Date(2025, 5, 22), // June 22, 2025
        checkOut: new Date(2025, 5, 25), // June 25, 2025
        nights: 3,
      },
      {
        guestName: 'Sophie L.',
        checkIn: new Date(2025, 5, 28), // June 28, 2025
        checkOut: new Date(2025, 6, 2), // July 2, 2025
        nights: 4,
      },
    ];

    this.processBookings();
  }

  processBookings() {
    this.bookedDates.clear();

    this.bookings.forEach((booking) => {
      const currentDate = new Date(booking.checkIn);
      const endDate = new Date(booking.checkOut);

      while (currentDate < endDate) {
        const dateKey = this.getDateKey(currentDate);
        this.bookedDates.set(dateKey, booking);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  }

  getDateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  getDaysInMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days: Date[] = [];

    // Add empty cells for days before the first day of the month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(new Date(year, month, -(firstDayOfWeek - 1 - i)));
    }

    // Add all days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }

  isBookedDate(date: Date): boolean {
    const dateKey = this.getDateKey(date);
    return this.bookedDates.has(dateKey);
  }

  getBookingForDate(date: Date): BookingInfo | undefined {
    const dateKey = this.getDateKey(date);
    return this.bookedDates.get(dateKey);
  }

  isCurrentMonth(date: Date): boolean {
    return (
      date.getMonth() === this.selectedMonth.getMonth() &&
      date.getFullYear() === this.selectedMonth.getFullYear()
    );
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  previousMonth() {
    this.selectedMonth = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth() - 1,
      1
    );
  }

  nextMonth() {
    this.selectedMonth = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth() + 1,
      1
    );
  }

  getMonthName(date: Date): string {
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }

  isCheckInDate(date: Date): boolean {
    return this.bookings.some(
      (booking) =>
        booking.checkIn.getDate() === date.getDate() &&
        booking.checkIn.getMonth() === date.getMonth() &&
        booking.checkIn.getFullYear() === date.getFullYear()
    );
  }

  isCheckOutDate(date: Date): boolean {
    return this.bookings.some(
      (booking) =>
        booking.checkOut.getDate() === date.getDate() &&
        booking.checkOut.getMonth() === date.getMonth() &&
        booking.checkOut.getFullYear() === date.getFullYear()
    );
  }
}
