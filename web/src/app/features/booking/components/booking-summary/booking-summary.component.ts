import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BookingSessionService } from '../../../apartements/services/booking-session.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModifyDateComponent } from '../modify-date/modify-date.component';
import { ModifyGuestComponent } from '../modify-guest/modify-guest.component';
import { finalize } from 'rxjs';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss'],
})
export class BookingSummaryComponent implements OnInit, OnDestroy {
  @Input() apartmentId!: string;

  error: string | null = null;
  loading = true;
  apartment: any = {};
  bookingDetails: any = {
    checkIn: null,
    checkOut: null,
    guests: 1,
    children: 0,
    infants: 0,
  };

  tempDates: {
    checkIn: Date | null;
    checkOut: Date | null;
  } = {
    checkIn: null,
    checkOut: null,
  };

  tempVisiteurs: {
    adults: number;
    children: number;
    infants: number;
  } = {
    adults: 1,
    children: 0,
    infants: 0,
  };

  isDatePickerOpen = false;
  isGuestSelectorOpen = false;

  ref: DynamicDialogRef | undefined = undefined;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private bookingSessionService: BookingSessionService,
    private dialogService: DialogService,
    private annonceService: AnnoncesService
  ) {}

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  ngOnInit(): void {
    // Get booking data from service or query params
    const bookingData = this.bookingSessionService.getCurrentBookingData();

    if (bookingData) {
      this.bookingDetails = {
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests.adults,
        children: bookingData.guests.children || 0,
        infants: bookingData.guests.babies || 0,
      };
    } else {
      // Fallback to query params if no booking data in service
      this.route.queryParams.subscribe((params) => {
        const parsedData =
          this.bookingSessionService.parseBookingDataFromUrl(params);
        if (parsedData) {
          this.bookingDetails = {
            checkIn: parsedData.checkIn,
            checkOut: parsedData.checkOut,
            guests: parsedData.guests.adults,
            children: parsedData.guests.children || 0,
            infants: parsedData.guests.babies || 0,
          };
        }
      });
    }

    this.loadApartmentDetails();

    this.tempDates = {
      checkIn: this.bookingDetails.checkIn,
      checkOut: this.bookingDetails.checkOut,
    };

    this.tempVisiteurs = {
      adults: this.bookingDetails.guests,
      children: this.bookingDetails.children,
      infants: this.bookingDetails.infants,
    };
  }

  formatDate(date: Date | string | null): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'd MMM', { locale: fr });
  }

  toggleDatePicker(): void {
    this.ref = this.dialogService.open(ModifyDateComponent, {
      header: 'Modifier les date',
      contentStyle: {
        'overflow-y': 'visible',
      },
      width: this.getDialogWidth(),
      height: this.getDialogHeight(),
      baseZIndex: 10000,
      maximizable: false,
      modal: true,

      closable: true,
      data: {
        checkIn: this.tempDates.checkIn,
        checkOut: this.tempDates.checkOut,
      },
    });
    this.ref.onClose.subscribe((result: { startDate: Date; endDate: Date }) => {
      if (result) {
        this.bookingDetails.checkIn = result.startDate;
        this.bookingDetails.checkOut = result.endDate;

        this.tempDates.checkIn = result.startDate;
        this.tempDates.checkOut = result.endDate;

        this.updateBookingSessionData();
        this.cdr.detectChanges();
      }
    });
  }

  toggleGuestSelector(): void {
    this.ref = this.dialogService.open(ModifyGuestComponent, {
      header: 'Modifier le nombre de visiteurs',
      contentStyle: {
        'overflow-y': 'visible',
        padding: '0',
        'border-radius': '12px',
        font: 'font-jost',
      },

      width: this.getDialogWidth(),
      height: 'auto',
      baseZIndex: 10000,
      maximizable: false,
      modal: true,
      closable: true,
      styleClass: 'custom-guest-dialog responsive-dialog',
      data: {
        adults: this.tempVisiteurs.adults,
        children: this.tempVisiteurs.children,
        infants: this.tempVisiteurs.infants,
        maxOccupancy: this.apartment.nbreVisiteurs, // or your dynamic value
      },
      breakpoints: {
        '960px': '80vw',
        '640px': '95vw', // Mobile - almost full screen
        '480px': '95vw', // Mobile - almost full screen
        '360px': '95vw', // Mobile - almost full screen
        '320px': '95vw', // Mobile - almost full screen
      },
    });

    this.ref.onClose.subscribe(
      (result: { adults: number; children: number; infants: number }) => {
        if (result) {
          this.tempVisiteurs.adults = result.adults;
          this.tempVisiteurs.children = result.children;
          this.tempVisiteurs.infants = result.infants;

          this.bookingDetails.guests = result.adults;
          this.bookingDetails.children = result.children;
          this.bookingDetails.infants = result.infants;

          this.updateBookingSessionData();
          this.cdr.detectChanges();
        }
      }
    );
  }

  loadApartmentDetails(): void {
    if (!this.apartmentId) {
      this.error = "ID de l'appartement manquant";
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = null;

    this.annonceService
      .find(+this.apartmentId)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (apartment) => {
          if (apartment) {
            this.apartment = apartment;
          } else {
            this.error = 'Appartement non trouvé';
          }
        },
        error: (error) => {
          console.error("Erreur lors du chargement de l'appartement:", error);
          this.error = "Erreur lors du chargement des détails de l'appartement";
          this.apartment = {};
        },
      });
  }

  onDateRangeSelect(event: { startDate: Date; endDate: Date }) {
    this.tempDates.checkIn = event.startDate;
    this.tempDates.checkOut = event.endDate;
    this.cdr.detectChanges();
  }

  saveDateSelection(): void {
    if (this.tempDates.checkIn && this.tempDates.checkOut) {
      this.bookingDetails.checkIn = this.tempDates.checkIn;
      this.bookingDetails.checkOut = this.tempDates.checkOut;

      this.updateBookingSessionData();
    }
    this.isDatePickerOpen = false;
  }

  cancelDateSelection(): void {
    // Reset temp dates and close the dialog without saving
    this.tempDates = {
      checkIn: this.bookingDetails.checkIn,
      checkOut: this.bookingDetails.checkOut,
    };
    this.isDatePickerOpen = false;
  }

  saveGuestSelection(): void {
    if (this.tempVisiteurs) {
      this.bookingDetails.guests = this.tempVisiteurs.adults;
      this.bookingDetails.children = this.tempVisiteurs.children;
      this.bookingDetails.infants = this.tempVisiteurs.infants;

      // Update booking session data
      this.updateBookingSessionData();
    }
  }

  onGuestCountChange(guestCount: {
    adults: number;
    children: number;
    babies: number;
  }): void {
    this.bookingDetails.guests = guestCount.adults;
    this.bookingDetails.children = guestCount.children;
    this.bookingDetails.infants = guestCount.babies;

    // Update booking session data
    this.updateBookingSessionData();
  }

  private updateBookingSessionData(): void {
    // Update booking session data
    const currentBookingData =
      this.bookingSessionService.getCurrentBookingData();
    console.log('Updating booking session data', currentBookingData);

    if (currentBookingData) {
      // Update dates
      if (this.bookingDetails.checkIn && this.bookingDetails.checkOut) {
        currentBookingData.checkIn = this.bookingDetails.checkIn;
        currentBookingData.checkOut = this.bookingDetails.checkOut;
      }

      // Update guest counts
      currentBookingData.guests = {
        adults: this.bookingDetails.guests,
        children: this.bookingDetails.children,
        babies: this.bookingDetails.infants,
      };

      // Update service and url
      this.bookingSessionService.updateBookingData(currentBookingData);
      this.bookingSessionService.navigateWithBookingData(
        currentBookingData,
        this.router.url.split('?')[0] // Preserve current route without query params
      );
    }
  }

  private getDialogWidth(): string {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      if (screenWidth < 576) {
        return '95vw'; // Mobile - almost full screen
      } else if (screenWidth < 768) {
        return '90vw'; // Tablet small
      } else if (screenWidth < 992) {
        return '80vw'; // Tablet large
      } else if (screenWidth < 1200) {
        return '70vw'; // Desktop small
      } else {
        return '60vw'; // Desktop large
      }
    }
    return '90%'; // Fallback
  }

  private getDialogHeight(): string {
    if (typeof window !== 'undefined') {
      const screenHeight = window.innerHeight;
      if (screenHeight < 600) {
        return '90vh'; // Small screens
      } else if (screenHeight < 800) {
        return '80vh'; // Medium screens
      } else {
        return '70vh'; // Large screens
      }
    }
    return 'auto'; // Fallback
  }
}
