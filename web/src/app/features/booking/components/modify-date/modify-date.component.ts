import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  AfterViewInit,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { da, fr, se } from 'date-fns/locale';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-modify-date',
  templateUrl: './modify-date.component.html',
  styleUrls: ['./modify-date.component.scss'],
})
export class ModifyDateComponent implements OnInit {
  @Output() dateRangeSelected = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();
  @Input() intialStartDate: Date | null = null;
  @Input() initialEndDate: Date | null = null;
  @Input() listingId: number = 0;
  @Input() unavailableDates: Date[] = [];

  today: Date = new Date();
  selectedStartDate!: Date | null;
  selectedEndDate!: Date | null;
  hoverDate: Date | null = null;

  displayedMonths: Date[] = [];
  weekDays: string[] = [];
  maxDate = new Date(2030, 11, 31);

  activeSelector: 'check-in' | 'check-out' | null = null;

  isCompactView = false;

  bookingDates: Date[] = [];

  get isInDialog(): boolean {
    return !!this.ref;
  }

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(
        format(addDays(weekStart, i), 'EEE', { locale: fr }).charAt(0)
      );
    }
    this.displayedMonths = [
      startOfMonth(this.today),
      startOfMonth(addMonths(this.today, 1)),
    ];
    this.checkViewportSize();

    if (this.config && this.config.data) {
      this.selectedStartDate = this.config.data.checkIn;
      this.selectedEndDate = this.config.data.checkOut;
      this.listingId = this.config.data.listingId;
    }

    if (this.listingId) {
      this.loadingBookingDates();
    }
  }

  loadingBookingDates(): void {
    if (!this.listingId) return;

    this.bookingService.getBookingDates(this.listingId).subscribe({
      next: (response) => {
        this.bookingDates = response.unavailableDates.map(
          (dateStr: string) => new Date(dateStr)
        );
      },
      error: (error) => {
        console.log('Cannnot load booking dates', error);
      },
    });
  }

  ngAfterViewInit(): void {
    // Set up resize observer to handle responsive behavior
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver((entries) => {
        this.checkViewportSize();
        this.cdr.detectChanges(); // Make sure changes are detected
      });
      resizeObserver.observe(this.elementRef.nativeElement);
    } else {
      // Fallback for browsers without ResizeObserver
      this.checkViewportSize();
      window.addEventListener('resize', () => {
        this.checkViewportSize();
        this.cdr.detectChanges();
      });
    }
  }

  checkViewportSize() {
    if (typeof window === 'undefined') return;

    const containerWidth = this.elementRef.nativeElement?.offsetWidth || 0;
    const wasCompactView = this.isCompactView;

    this.isCompactView = containerWidth < 600;

    // Ne recalculer les mois affichés que si le mode a changé
    if (wasCompactView !== this.isCompactView) {
      if (this.isCompactView) {
        this.displayedMonths = [
          startOfMonth(this.displayedMonths[0] || this.today),
        ];
      } else {
        const baseMonth = this.displayedMonths[0] || this.today;
        this.displayedMonths = [
          startOfMonth(baseMonth),
          startOfMonth(addMonths(baseMonth, 1)),
        ];
      }
    }

    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  onDateClick(date: Date) {
    if (this.isDisabled(date)) {
      return;
    }

    if (this.selectedStartDate && this.selectedEndDate) {
      this.selectedStartDate = date;
      this.selectedEndDate = null;
      this.activeSelector = 'check-out';
      this.cdr.detectChanges();
      return;
    }

    // If no start date or selecting check-in
    if (!this.selectedStartDate || this.activeSelector === 'check-in') {
      this.selectedStartDate = date;
      this.selectedEndDate = null;
      this.activeSelector = 'check-out';
      this.cdr.detectChanges();
      return;
    }

    // If there's a start date but no end date (or selecting check-out)
    if (this.selectedStartDate && !this.selectedEndDate) {
      // If clicked date is before start date, swap them
      if (isBefore(date, this.selectedStartDate)) {
        this.selectedEndDate = this.selectedStartDate;
        this.selectedStartDate = date;
      } else {
        this.selectedEndDate = date;
      }

      if (
        !this.isRangeAvailable(this.selectedStartDate, this.selectedEndDate)
      ) {
        this.selectedStartDate = date;
        this.selectedEndDate = null;
        this.activeSelector = 'check-out';
        this.cdr.detectChanges();
        return;
      }

      this.activeSelector = null;
      this.emitSelectedRange();
    }

    setTimeout(() => {
      this.activeSelector = null;
      this.cdr.detectChanges();
    }, 300); // Allow time for the view to update
    this.cdr.detectChanges();
  }

  onDateHover(date: Date | null) {
    this.hoverDate = date;
    this.cdr.detectChanges();
  }

  emitSelectedRange() {
    if (this.selectedStartDate && this.selectedEndDate) {
      this.dateRangeSelected.emit({
        startDate: this.selectedStartDate,
        endDate: this.selectedEndDate,
      });
    } else {
      console.log('emitSelectedRange: No date selected');
    }
  }

  isSelected(date: Date): boolean {
    return this.isStartDate(date) || this.isEndDate(date);
  }

  isStartDate(date: Date): boolean {
    if (!this.selectedStartDate) return false;
    return (
      date.getDate() === this.selectedStartDate.getDate() &&
      date.getMonth() === this.selectedStartDate.getMonth() &&
      date.getFullYear() === this.selectedStartDate.getFullYear()
    );
  }

  isEndDate(day: Date): boolean {
    if (!this.selectedEndDate) return false;
    return (
      day.getDate() === this.selectedEndDate.getDate() &&
      day.getMonth() === this.selectedEndDate.getMonth() &&
      day.getFullYear() === this.selectedEndDate.getFullYear()
    );
  }

  isRangeAvailable(start: Date, end: Date): boolean {
    const currentDate = new Date(start);
    currentDate.setHours(0, 0, 0, 0);

    const endDate = new Date(end);
    end.setHours(0, 0, 0, 0);

    while (currentDate <= endDate) {
      if (this.isDateUnavailable(currentDate)) {
        return false;
      }

      if (
        this.bookingDates.some((bookingDate) =>
          isSameDay(currentDate, bookingDate)
        )
      ) {
        return false;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return true;
  }

  isDateUnavailable(date: Date): boolean {
    return this.unavailableDates.some((unavailableDate) =>
      isSameDay(date, unavailableDate)
    );
  }

  isInRange(day: Date): boolean {
    if (!this.selectedStartDate || !this.selectedEndDate) return false;
    return day > this.selectedStartDate && day < this.selectedEndDate;
  }

  // Check if a range contain any unavailable dates

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  previousMonth() {
    const first = this.displayedMonths[0];
    const newStart = addMonths(first, -1);

    if (this.isCompactView) {
      this.displayedMonths = [startOfMonth(newStart)];
    } else {
      this.displayedMonths = [
        startOfMonth(newStart),
        startOfMonth(addMonths(newStart, 1)),
      ];
    }

    // Forcer la détection de changements de manière synchrone
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  nextMonth() {
    const last = this.displayedMonths[this.displayedMonths.length - 1];
    const nextStart = addMonths(last, 1);

    if (
      isBefore(nextStart, this.maxDate) ||
      isSameDay(startOfMonth(nextStart), startOfMonth(this.maxDate))
    ) {
      if (this.isCompactView) {
        this.displayedMonths = [startOfMonth(nextStart)];
      } else {
        this.displayedMonths = [
          startOfMonth(addMonths(last, 1)),
          startOfMonth(addMonths(last, 2)),
        ];
      }

      // Forcer la détection de changements de manière synchrone
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }
  }

  formatDay(date: Date): string {
    return format(date, 'd');
  }

  formatMonth(date: Date): string {
    return format(date, 'MMMM yyyy', { locale: fr });
  }

  formatDisplayDate(date: Date | null): string {
    if (!date) return 'Sélectionner une date';
    return format(date, 'd MMM yyyy', { locale: fr });
  }

  getDatesCount(): number {
    if (!this.selectedStartDate || !this.selectedEndDate) return 0;
    const diffTime = Math.abs(
      this.selectedEndDate.getTime() - this.selectedStartDate.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  daysInMonth(month: Date): (Date | null)[] {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const days: (Date | null)[] = [];

    // Get the first day of month
    const firstDayDate = new Date(month.getFullYear(), month.getMonth(), 1);

    // Get day of week for first day, convert to Monday-based index (0 = Monday, 6 = Sunday)
    const firstDayOfWeek = firstDayDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const mondayAdjustedDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // Add null placeholders for days before the start of the month
    for (let i = 0; i < mondayAdjustedDay; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let day = 1; day <= end.getDate(); day++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), day));
    }

    return days;
  }

  getDayOfWeek(date: Date): string {
    return format(date, 'EEEE', { locale: fr });
  }

  isDisabled(date: Date): boolean {
    if (isBefore(date, startOfDay(this.today))) {
      return true;
    }

    if (this.isDateUnavailable(date)) {
      return true;
    }

    if (this.bookingDates.some((bookingDate) => isSameDay(date, bookingDate))) {
      return true;
    }

    return false;
  }

  clearSelection() {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.activeSelector = 'check-in';
  }

  save(): void {
    if (this.selectedStartDate && this.selectedEndDate) {
      const result = {
        startDate: this.selectedStartDate,
        endDate: this.selectedEndDate,
      };

      if (this.isInDialog) {
        this.ref!.close(result);
      } else {
        this.dateRangeSelected.emit(result);
      }
    }
  }

  cancel(): void {
    this.ref.close();
  }
}
