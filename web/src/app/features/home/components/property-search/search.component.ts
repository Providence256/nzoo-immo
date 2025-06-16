import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { fr } from 'date-fns/locale';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, height: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*', overflow: 'hidden' }),
        animate('300ms ease-in', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  @ViewChild('locationInput') locationInput!: ElementRef;
  dropdownPosition = { top: '0px', left: '0px', width: '0px' };

  activeField: string | null = null;
  showMobileSearch = false;

  isDropdownOpen = false;
  displayedMonths: Date[] = [];
  weekDays: string[] = [];
  activeSelector: 'check-in' | 'check-out' | null = null;

  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;

  searchForm = {
    location: '',
    checkin: '',
    checkout: '',
    adults: 1,
    children: 0,
  };

  locationSuggestions = [
    { name: 'Paris', region: 'Île-de-France, France' },
    { name: 'Lyon', region: 'Auvergne-Rhône-Alpes, France' },
    { name: 'Marseille', region: "Provence-Alpes-Côte d'Azur, France" },
    { name: 'Bordeaux', region: 'Nouvelle-Aquitaine, France' },
    { name: 'Nice', region: "Provence-Alpes-Côte d'Azur, France" },
    { name: 'Toulouse', region: 'Occitanie, France' },
  ];

  filteredLocationSuggestions = [...this.locationSuggestions];

  today: Date = new Date();
  minDate = new Date();
  maxDate = new Date(2030, 11, 31);

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(
        format(addDays(weekStart, i), 'EEE', { locale: fr }).charAt(0)
      );
    }
    this.initializeCalendar();
  }

  initializeCalendar() {
    this.displayedMonths = [
      startOfMonth(this.today),
      startOfMonth(addMonths(this.today, 1)),
    ];
  }

  setActiveField(field: string) {
    console.log('setActiveField called with:', field);

    // Fermer le dropdown si on clique sur le même field
    if (this.activeField === field) {
      this.activeField = null;
      this.isDropdownOpen = false;
      return;
    }

    // Si on clique sur checkin ou checkout
    if (field === 'checkin' || field === 'checkout') {
      this.activeField = field;
      this.isDropdownOpen = true;
      console.log('Calendar should open, activeField:', this.activeField);
    } else {
      // Pour les autres fields (location, guests)
      this.activeField = field;
      this.isDropdownOpen = false;

      if (field === 'location') {
        setTimeout(() => {
          if (this.locationInput) {
            this.locationInput.nativeElement.focus();
          }
        }, 0);
      }
    }

    this.cdr.detectChanges();
  }

  onLocationInput() {
    if (!this.searchForm.location) {
      this.filteredLocationSuggestions = [...this.locationSuggestions];
      return;
    }
    this.filteredLocationSuggestions = this.locationSuggestions.filter(
      (location) =>
        location.name
          .toLowerCase()
          .includes(this.searchForm.location.toLowerCase()) ||
        location.region
          .toLowerCase()
          .includes(this.searchForm.location.toLowerCase())
    );
  }

  selectLocation(location: any) {
    this.searchForm.location = `${location.name}, ${location.region}`;
    this.activeField = null;
  }

  updateGuests(type: 'adults' | 'children', action: 'increment' | 'decrement') {
    const min = type === 'adults' ? 1 : 0;
    if (action === 'increment') {
      this.searchForm[type]++;
    } else if (this.searchForm[type] > min) {
      this.searchForm[type]--;
    }
  }

  getMobileSearchSummary() {
    if (!this.searchForm.location && !this.searchForm.checkin) {
      return 'Destination et dates';
    }
    return `${this.searchForm.location || 'Destination'}, ${
      this.searchForm.checkin || 'dates'
    }`;
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }

  performSearch() {
    console.log('Search performed:', this.searchForm);
    // Here you would typically call a service to perform the search
    this.activeField = null;
    this.showMobileSearch = false;
  }

  clearSearch() {
    this.searchForm = {
      location: '',
      checkin: '',
      checkout: '',
      adults: 1,
      children: 0,
    };
  }

  isToday(date: Date): boolean {
    return isSameDay(date, this.today);
  }

  isSelected(date: Date): boolean {
    return this.isStartDate(date) || this.isEndDate(date);
  }

  isStartDate(date: Date): boolean {
    return (
      !!date &&
      !!this.selectedStartDate &&
      isSameDay(date, this.selectedStartDate)
    );
  }

  isEndDate(date: Date): boolean {
    return (
      !!date && !!this.selectedEndDate && isSameDay(date, this.selectedEndDate)
    );
  }

  isDisabled(date: Date): boolean {
    if (isBefore(date, startOfDay(this.today))) {
      return true;
    }

    return false;
  }

  daysInMonth(month: Date): (Date | null)[] {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const days: (Date | null)[] = [];

    const firstDayDate = new Date(month.getFullYear(), month.getMonth(), 1);

    const firstDayOfWeek = firstDayDate.getDay();
    const mondayAdjusted = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    for (let i = 0; i < mondayAdjusted; i++) {
      days.push(null);
    }

    for (let day = 1; day <= end.getDate(); day++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), day));
    }

    return days;
  }

  onDateClick(date: Date) {
    if (this.isDisabled(date)) return;

    if (
      !this.selectedStartDate ||
      (this.selectedStartDate && this.selectedEndDate)
    ) {
      // Premier clic ou reset
      this.selectedStartDate = date;
      this.selectedEndDate = null;
      this.searchForm.checkin = format(date, 'yyyy-MM-dd');
      this.searchForm.checkout = '';
    } else if (this.selectedStartDate && !this.selectedEndDate) {
      // Deuxième clic
      if (isBefore(date, this.selectedStartDate)) {
        // Si la date est avant la date de début, remplacer la date de début
        this.selectedStartDate = date;
        this.searchForm.checkin = format(date, 'yyyy-MM-dd');
      } else {
        // Sinon, définir comme date de fin
        this.selectedEndDate = date;
        this.searchForm.checkout = format(date, 'yyyy-MM-dd');
      }
    }
  }

  isInRange(date: Date): boolean {
    if (!this.selectedStartDate || !this.selectedEndDate) return false;

    return date > this.selectedStartDate && date < this.selectedEndDate;
  }

  previousMonth() {
    this.displayedMonths = this.displayedMonths.map(
      (month) => new Date(month.getFullYear(), month.getMonth() - 1, 1)
    );
  }

  nextMonth() {
    this.displayedMonths = this.displayedMonths.map(
      (month) => new Date(month.getFullYear(), month.getMonth() + 1, 1)
    );
  }

  formatDay(date: Date): string {
    return format(date, 'd');
  }

  formatMonth(date: Date): string {
    return format(date, 'MMMM yyyy', { locale: fr });
  }

  getDateClasses(date: Date): string {
    const classes = [];

    if (this.isToday(date)) classes.push('today');
    if (this.isStartDate(date)) classes.push('start-date');
    if (this.isEndDate(date)) classes.push('end-date');
    if (this.isInRange(date)) classes.push('in-range');
    if (this.isSelected(date)) classes.push('selected');

    return classes.join(' ');
  }

  closeCalendar() {
    this.isDropdownOpen = false;
    this.activeSelector = null;
    this.activeField = null;
  }

  getNightsBetween(): number {
    if (!this.selectedStartDate || !this.selectedEndDate) return 0;

    const timeDiff =
      this.selectedEndDate.getTime() - this.selectedStartDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  formatDisplayDate(date: Date | null): string {
    if (!date) return '';
    return format(date, 'd MMM yyyy', { locale: fr });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.activeField = null;
      this.showMobileSearch = false;
      this.isDropdownOpen = false;
      this.activeSelector = null;
    }
  }
}
