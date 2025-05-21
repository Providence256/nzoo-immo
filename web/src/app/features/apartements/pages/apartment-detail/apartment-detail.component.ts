// src/app/features/apartments/pages/apartment-detail/apartment-detail.component.ts
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/authentication/auth.service';
import { User } from '../../../../core/models/user.model';
import { PropertyService } from '../../../../core/services/property.service';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';
import { BookingSessionService } from '../../services/booking-session.service';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss'],
})
export class ApartmentDetailComponent implements OnInit {
  loading = true;
  error = '';
  currentUser: User | null = null;
  isOwner = false;
  bookingForm!: FormGroup;
  bookingSubmitted = false;
  bookingError = '';
  comparablePrices: any[] = [];
  loadingComparisons = false;
  annonce: any = {};
  equipements: any[] = [];
  checkingAvailability = false;
  isAvailable = true;
  unavailableDates: Date[] = [];

  currentImageIndex: number = 0;
  currentImage: string = '';

  // Full-screen photo modal
  isPhotoModalOpen: boolean = false;
  modalImageIndex: number = 0;

  minDate!: Date;
  maxDate!: Date;
  rangeDates: Date[] = [];

  guestCount = {
    adults: 1,
    children: 0,
    babies: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: PropertyService,
    private annonceService: AnnoncesService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private bookingSessionService: BookingSessionService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
    });

    this.loadAnnonce();
    this.loadEquipements();

    this.bookingForm.get('checkIn')?.valueChanges.subscribe((val) => {
      if (val) {
        this.rangeDates[0] = val;
      }
    });

    this.bookingForm.get('checkOut')?.valueChanges.subscribe((val) => {
      if (val) {
        this.rangeDates[1] = val;
      }
    });
  }

  loadAnnonce() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;
    this.annonceService.find(+id).subscribe({
      next: (annonce) => {
        (this.annonce = annonce), (this.loading = false);
        this.currentImage = this.annonce.photoUrls[this.currentImageIndex];

        if (this.bookingForm) {
          const guestsControl = this.bookingForm.get('guests');
          if (guestsControl) {
            guestsControl.setValidators([
              Validators.required,
              Validators.min(1),
              Validators.max(this.annonce.nbreVisiteurs || 16),
            ]);
            guestsControl.updateValueAndValidity();
          }
        }
      },
      error: (error) => {
        console.log(error);
        this.error = 'Failed to load apartment details';
        this.loading = false;
      },
    });
  }

  loadEquipements(): void {
    this.annonceService.findAllEquipements().subscribe({
      next: (data) => {
        this.equipements = data;
      },
      error: (err) => {
        console.error('Erreur chargement équipements');
      },
    });
  }

  checkDateAvailability(): void {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;

    if (!checkIn || !checkOut || !this.annonce?.id) {
      return;
    }

    this.checkingAvailability = true;
    this.isAvailable = true;
  }

  checkRangeAvailability(startDate: Date, endDate: Date): boolean {
    if (!startDate || !endDate) return true;

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (
      let day = new Date(start);
      day <= end;
      day.setDate(day.getDate() + 1)
    ) {
      const currentDay = new Date(day);

      if (
        this.unavailableDates.some((unavailableDate) =>
          this.isSameDay(currentDay, unavailableDate)
        )
      ) {
        return false;
      }
    }

    return true;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private populateFormWithData(data: any): void {
    if (data) {
      this.bookingForm.patchValue({
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
      });

      this.bookingSessionService.updateBookingData(data);
    }
  }

  goToConfirmBooking(): void {
    this.bookingSubmitted = true;

    if (this.bookingForm.invalid) {
      return;
    }

    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;

    if (!this.checkRangeAvailability(checkIn, checkOut)) {
      this.bookingError =
        "Ces dates ne sont pas disponibles. Veuillez sélectionner d'autres dates.";
      return;
    }

    this.loading = true;

    const bookingData = {
      listingId: this.annonce.id,
      checkIn: this.bookingForm.get('checkIn')?.value,
      checkOut: this.bookingForm.get('checkOut')?.value,
      guests: {
        adults: this.guestCount.adults,
        children: this.guestCount.children,
        babies: this.guestCount.babies,
      },
    };

    this.bookingSessionService.navigateWithBookingData(
      bookingData,
      '/booking/confirm'
    );
  }

  onDateRangeSelect(event: { startDate: Date; endDate: Date }) {
    this.bookingForm.patchValue({
      checkIn: event.startDate,
      checkOut: event.endDate,
    });
    this.cdr.detectChanges();
  }

  nextImage(): void {
    if (!this.annonce) return;

    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.annonce.photoUrls.length;
    this.currentImage = this.annonce.photoUrls[this.currentImageIndex];
  }

  onGuestCountChange(guestCount: any): void {
    this.guestCount = guestCount;
    this.bookingForm.get('guests')?.setValue(guestCount);
  }

  prevImage(): void {
    if (!this.annonce) return;

    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.annonce.photoUrls.length) %
      this.annonce.photoUrls.length;
    this.currentImage = this.annonce.photoUrls[this.currentImageIndex];
  }

  selectImage(index: number): void {
    if (!this.annonce) return;

    this.currentImageIndex = index;
    this.currentImage = this.annonce.photoUrls[this.currentImageIndex];
  }

  openPhotoModal(): void {
    this.isPhotoModalOpen = true;
    this.modalImageIndex = this.currentImageIndex;
    document.body.classList.add('overflow-hidden'); // Prevent scrolling while modal is open
  }

  closePhotoModal(): void {
    this.isPhotoModalOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  nextModalImage(event?: Event): void {
    if (event) event.stopPropagation();
    if (!this.annonce) return;

    this.modalImageIndex =
      (this.modalImageIndex + 1) % this.annonce.photoUrls.length;
  }

  prevModalImage(event?: Event): void {
    if (event) event.stopPropagation();
    if (!this.annonce) return;

    this.modalImageIndex =
      (this.modalImageIndex - 1 + this.annonce.photoUrls.length) %
      this.annonce.photoUrls.length;
  }

  selectModalImage(index: number, event: Event): void {
    event.stopPropagation();
    if (!this.annonce) return;

    this.modalImageIndex = index;
  }

  getEquipementIconById(id: number) {
    const equipement = this.equipements.find((e) => e.id === id);

    return equipement.icon;
  }

  formatPrice(property: any): string {
    if (property && property.price && property.price.prixBase) {
      return `${property.price.prixBase} ${property.price.codeDevise || 'USD'}`;
    }

    return 'Prix non disponible';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isPhotoModalOpen) return;

    switch (event.key) {
      case 'ArrowRight':
        this.nextModalImage();
        break;
      case 'ArrowLeft':
        this.prevModalImage();
        break;
      case 'Escape':
        this.closePhotoModal();
        break;
    }
  }
}
