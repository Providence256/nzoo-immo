import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import {
  addDays, addMonths, endOfMonth, format,
  isBefore, isSameDay, isWithinInterval, startOfDay,
  startOfMonth, startOfWeek
} from 'date-fns';
import { fr, se } from 'date-fns/locale';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit, AfterViewInit {
  @Output() dateRangeSelected = new EventEmitter<{ startDate: Date, endDate: Date }>();
  @Input() unavailableDates: Date[] = []
  @Input() minDate: Date = new Date()

  today: Date = new Date();
  selectedStartDate!: Date | null;
  selectedEndDate!: Date | null;
  hoverDate: Date | null = null;

  displayedMonths: Date[] = [];
  weekDays: string[] = [];
  maxDate = new Date(2030, 11, 31);

  isDropdownOpen = false;
  activeSelector: 'check-in' | 'check-out' | null = null;
  

  isCompactView = false;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(format(addDays(weekStart, i), 'EEE', { locale: fr }).charAt(0));
    }
    this.displayedMonths = [
      startOfMonth(this.today), 
      startOfMonth(addMonths(this.today, 1))
    ];
    this.checkViewportSize();
  }

  ngAfterViewInit(): void {
    // Set up resize observer to handle responsive behavior
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(entries => {
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
    const containerWidth = this.elementRef.nativeElement.offsetWidth;
    this.isCompactView = containerWidth < 600;
    if (this.isCompactView) {
      this.displayedMonths = [startOfMonth(this.today)];
    } else {
      this.displayedMonths = [
        startOfMonth(this.today), 
        startOfMonth(addMonths(this.today, 1))
      ];
    }
    this.cdr.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isDropdownOpen) {
      this.isDropdownOpen = false;
      this.cdr.detectChanges();
    }
  }

  toggleDropdown(selector: 'check-in' | 'check-out') {
    if (this.isDropdownOpen && this.activeSelector === selector) {
      this.isDropdownOpen = false;
      this.activeSelector = null;
    } else {
      this.isDropdownOpen = true;
      this.activeSelector = selector;
    }
    this.cdr.detectChanges();
  }

  onDateClick(date: Date) {
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
      
      this.activeSelector = null;
      this.isDropdownOpen = false;
      this.emitSelectedRange();
    }

    setTimeout(() => {
      this.isDropdownOpen = false;
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
      console.log('Selected range:', this.selectedStartDate, this.selectedEndDate);
      this.dateRangeSelected.emit({
        startDate: this.selectedStartDate,
        endDate: this.selectedEndDate
      });

    }
  }

  isSelected(date: Date): boolean {

    return this.isStartDate(date) || this.isEndDate(date);
  }

  isStartDate(date: Date): boolean {
    return !!date && !!this.selectedStartDate && isSameDay(date, this.selectedStartDate);
  }

  isEndDate(date: Date): boolean {
    return !!date && !!this.selectedEndDate && isSameDay(date, this.selectedEndDate);
  }

  isInRange(date: Date): boolean {

    if (!date || !this.selectedStartDate) return false;
    
    // For completed selection (both start and end dates are selected)
    if (this.selectedEndDate) {
      const start = isBefore(this.selectedStartDate, this.selectedEndDate) 
        ? this.selectedStartDate 
        : this.selectedEndDate;
        
      const end = isBefore(this.selectedStartDate, this.selectedEndDate) 
        ? this.selectedEndDate 
        : this.selectedStartDate;
      
      return isWithinInterval(date, { start, end }) && 
             !isSameDay(date, start) && 
             !isSameDay(date, end);
    }
    
    // For hover effect when only start date is selected
    if (this.hoverDate && this.selectedStartDate) {
      const start = isBefore(this.selectedStartDate, this.hoverDate) 
        ? this.selectedStartDate 
        : this.hoverDate;
        
      const end = isBefore(this.selectedStartDate, this.hoverDate) 
        ? this.hoverDate 
        : this.selectedStartDate;
      
      return isWithinInterval(date, { start, end }) && 
             !isSameDay(date, start) && 
             !isSameDay(date, end);
    }
    
    return false;
  }

  isDisabled(date: Date): boolean {
    return isBefore(date, startOfDay(this.today));
  }

  isDateUnavailable(date : Date) : boolean{
    return this.unavailableDates.some(unavailableDate => this.isSameDay(date, unavailableDate))
  }

  
  // Check if a range contain any unavailable dates
  isRangeAvailable(start: Date, end: Date): boolean {
    const currentDate = new Date(start);
    currentDate.setHours(0,0,0,0)

    const endDate = new Date(end)
    end.setHours(0,0,0,0)

    while(currentDate <= endDate){
      if(this.isDateUnavailable(currentDate)){
        return false;
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return true;
  }

  isToday(date: Date): boolean {
    return isSameDay(date, this.today);
  }

  previousMonth() {
    this.displayedMonths = this.displayedMonths.map(month => startOfMonth(addMonths(month, -1)));
  }

  nextMonth() {
    const next = this.displayedMonths.map(month => startOfMonth(addMonths(month, 1)));
    if (!isBefore(this.maxDate, next[1] || next[0])) {
      this.displayedMonths = next;
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

  getDatesCount(): number | null {
    if (this.selectedStartDate && this.selectedEndDate) {
      const diffTime = Math.abs(this.selectedEndDate.getTime() - this.selectedStartDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return null;
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
    for(let i = 0; i < mondayAdjustedDay; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for(let day = 1; day <= end.getDate(); day++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), day));
    }
    
    return days;
  }

  getDayOfWeek(date: Date) : string{
    return format(date, 'EEEE', {locale: fr})
  }

  isSameDay(date1: Date, date2: Date) : boolean{
    return isSameDay(date1, date2)
  }

  clearSelection() {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.activeSelector = 'check-in';
  }
}