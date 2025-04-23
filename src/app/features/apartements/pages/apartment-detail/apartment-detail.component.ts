// src/app/features/apartments/pages/apartment-detail/apartment-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/http/api.service';
import { AuthService } from '../../../../core/authentication/auth.service';
import { Apartment } from '../../../../core/models/apartment.model';
import { User } from '../../../../core/models/user.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
})
export class ApartmentDetailComponent implements OnInit {
  apartment!: Apartment;
  loading = true;
  error = '';
  currentUser: User | null = null;
  isOwner = false;
  bookingForm: FormGroup;
  bookingSubmitted = false;
  bookingError = '';
  comparablePrices: any[] = [];
  loadingComparisons = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') as string;
        return this.apiService.getApartmentById(id);
      })
    ).subscribe({
      next: (data) => {
        this.apartment = data;
        this.loading = false;
        
        // Check if current user is the owner
        if (this.currentUser && this.apartment.hostId === this.currentUser.id) {
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
    this.apiService.getComparablePrices(this.apartment.id).subscribe({
      next: (data) => {
        this.comparablePrices = data;
        this.loadingComparisons = false;
      },
      error: () => {
        this.loadingComparisons = false;
      }
    });
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
      apartmentId: this.apartment.id,
      checkIn: this.bookingForm.value.checkIn,
      checkOut: this.bookingForm.value.checkOut,
      guests: this.bookingForm.value.guests
    };
    
    this.apiService.createBooking(bookingData).subscribe({
      next: (response) => {
        // Navigate to payment page with booking ID
        this.router.navigate(['/payments/process'], { 
          queryParams: { bookingId: response.id } 
        });
      },
      error: (err) => {
        this.bookingError = err.error?.message || 'Error creating booking';
        console.error(err);
      }
    });
  }
}