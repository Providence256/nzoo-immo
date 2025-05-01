// src/app/features/apartments/pages/apartment-detail/apartment-detail.component.ts
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/http/api.service';
import { AuthService } from '../../../../core/authentication/auth.service';
import { Apartment } from '../../../../core/models/apartment.model';
import { User } from '../../../../core/models/user.model';
import { switchMap } from 'rxjs/operators';
import { PropertyService } from '../../../../core/services/property.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss'],
})
export class ApartmentDetailComponent implements OnInit {
  apartment?: Apartment;
  loading = true;
  error = '';
  currentUser: User | null = null;
  isOwner = false;
  bookingForm!: FormGroup;
  bookingSubmitted = false;
  bookingError = '';
  comparablePrices: any[] = [];
  loadingComparisons = false;

  currentImageIndex: number = 0;
  currentImage: string = '';

  // Full-screen photo modal
  isPhotoModalOpen: boolean = false;
  modalImageIndex: number = 0;

  minDate!: Date
  maxDate!: Date
  rangeDates: Date[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: PropertyService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
    

    // this.authService.currentUser.subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });

    this.bookingForm.get('checkInDate')?.valueChanges.subscribe(val => {
      if (val) {
        this.rangeDates[0] = val;
      }
    });

    this.bookingForm.get('checkOutDate')?.valueChanges.subscribe(val => {
      if (val) {
        this.rangeDates[1] = val;
      }
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') as string;
        return this.apiService.getPropertyById(id);
      })
    ).subscribe({
      next: (data) => {
        this.apartment = data;
        this.loading = false;
        
        // Check if current user is the owner
        if (this.currentUser && this.apartment!.hostId === this.currentUser.id) {
          this.isOwner = true;
        }
        
        // Load price comparisons
        this.loadPriceComparisons();
      },
      error: (err) => {
        this.error = 'Error loading apartment details';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadPriceComparisons(): void {
    if (!this.apartment?.id) return;
    
    this.loadingComparisons = true;
    // this.apiService.getComparablePrices(this.apartment.id).subscribe({
    //   next: (data) => {
    //     this.comparablePrices = data;
    //     this.loadingComparisons = false;
    //   },
    //   error: () => {
    //     this.loadingComparisons = false;
    //   }
    // });
  }

  submitBooking(): void {
    this.bookingSubmitted = true;
    
    if (this.bookingForm.invalid) {
      return;
    }
    
    if (!this.currentUser) {
      // Redirect to login if not authenticated
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url } 
      });
      return;
    }
    
    const bookingData = {
      apartmentId: this.apartment!.id,
      checkIn: this.bookingForm.value.checkIn,
      checkOut: this.bookingForm.value.checkOut,
      guests: this.bookingForm.value.guests
    };
    
    // this.apiService.createBooking(bookingData).subscribe({
    //   next: (response) => {
    //     // Navigate to payment page with booking ID
    //     this.router.navigate(['/payments/process'], { 
    //       queryParams: { bookingId: response.id } 
    //     });
    //   },
    //   error: (err) => {
    //     this.bookingError = err.error?.message || 'Error creating booking';
    //     console.error(err);
    //   }
    // });
  }

  onDateRangeSelect(event: { startDate: Date, endDate: Date }) {
    console.log('Form values after date range selection:', event);

    this.cdr.detectChanges();
  }

  nextImage(): void {
    if (!this.apartment) return;
    
    this.currentImageIndex = (this.currentImageIndex + 1) % this.apartment.media.imageUrls.length;
    this.currentImage = this.apartment.media.imageUrls[this.currentImageIndex];
  }

  prevImage(): void {
    if (!this.apartment) return;
    
    this.currentImageIndex = (this.currentImageIndex - 1 + this.apartment.media.imageUrls.length) % this.apartment.media.imageUrls.length;
    this.currentImage = this.apartment.media.imageUrls[this.currentImageIndex];
  }

  selectImage(index: number): void {
    if (!this.apartment) return;
    
    this.currentImageIndex = index;
    this.currentImage = this.apartment.media.imageUrls[this.currentImageIndex];
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
    if (!this.apartment) return;
    
    this.modalImageIndex = (this.modalImageIndex + 1) % this.apartment.media.imageUrls.length;
  }
  
  prevModalImage(event?: Event): void {
    if (event) event.stopPropagation();
    if (!this.apartment) return;
    
    this.modalImageIndex = (this.modalImageIndex - 1 + this.apartment.media.imageUrls.length) % this.apartment.media.imageUrls.length;
  }
  
  selectModalImage(index: number, event: Event): void {
    event.stopPropagation();
    if (!this.apartment) return;
    
    this.modalImageIndex = index;
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