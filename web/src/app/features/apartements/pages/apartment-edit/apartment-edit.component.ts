// src/app/features/apartments/pages/apartment-edit/apartment-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../core/http/api.service';
import { AuthService } from '../../../../core/authentication/auth.service';
import { Apartment } from '../../../../core/models/apartment.model';
import { User } from '../../../../core/models/user.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-apartment-edit',
  templateUrl: './apartment-edit.component.html',
})
export class ApartmentEditComponent implements OnInit {
  apartmentForm: FormGroup;
  apartment!: Apartment;
  isSubmitting = false;
  loading = true;
  error = '';
  currentUser: User | null = null;
  apartmentId: string = '';
  
  // Common amenities for selection
  amenities: string[] = [
    'Wifi', 'Air Conditioning', 'Heating', 'Kitchen', 'TV', 
    'Washer', 'Dryer', 'Free Parking', 'Pool', 'Hot Tub', 
    'Gym', 'Elevator', 'Wheelchair Accessible', 'Smoke Detector',
    'Carbon Monoxide Detector', 'First Aid Kit', 'Fire Extinguisher'
  ];
  
  selectedAmenities: string[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.apartmentForm = this.createForm();
    // this.authService.currentUser$.subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.apartmentId = params.get('id') as string;
        return this.apiService.getApartmentById(this.apartmentId);
      })
    ).subscribe({
      next: (apartment) => {
        this.apartment = apartment;
        
        // Check if current user is the owner
        if (!this.currentUser || this.apartment.hostId !== this.currentUser.id) {
          this.router.navigate(['/']);
          return;
        }
        
        this.selectedAmenities = [...this.apartment.features.amenities];
        this.populateForm();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading apartment details';
        this.loading = false;
        console.error(err);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      location: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: ['', Validators.required],
        latitude: [null],
        longitude: [null]
      }),
      price: this.fb.group({
        amount: [0, [Validators.required, Validators.min(1)]],
        currency: ['USD', Validators.required],
        period: ['night', Validators.required]
      }),
      features: this.fb.group({
        bedroomCount: [1, [Validators.required, Validators.min(1)]],
        bathroomCount: [1, [Validators.required, Validators.min(1)]],
        maxOccupancy: [1, [Validators.required, Validators.min(1)]],
        area: [0, [Validators.required, Validators.min(1)]]
      }),
      media: this.fb.group({
        thumbnailUrl: ['', Validators.required],
        imageUrls: ['', Validators.required]
      }),
      availability: this.fb.group({
        isAvailable: [true]
      })
    });
  }

  populateForm(): void {
    const imageUrls = this.apartment.media.imageUrls.join(', ');
    
    this.apartmentForm.patchValue({
      title: this.apartment.title,
      description: this.apartment.description,
      location: {
        address: this.apartment.location.address,
        city: this.apartment.location.city,
        country: this.apartment.location.country,
        zipCode: this.apartment.location.zipCode,
        latitude: this.apartment.location.latitude,
        longitude: this.apartment.location.longitude
      },
      price: {
        amount: this.apartment.price.amount,
        currency: this.apartment.price.currency,
        period: this.apartment.price.period
      },
      features: {
        bedroomCount: this.apartment.features.bedroomCount,
        bathroomCount: this.apartment.features.bathroomCount,
        maxOccupancy: this.apartment.features.maxOccupancy,
        area: this.apartment.features.area
      },
      media: {
        thumbnailUrl: this.apartment.media.thumbnailUrl,
        imageUrls: imageUrls
      },
      availability: {
        isAvailable: this.apartment.availability.isAvailable
      }
    });
  }

  toggleAmenity(amenity: string): void {
    const index = this.selectedAmenities.indexOf(amenity);
    if (index === -1) {
      this.selectedAmenities.push(amenity);
    } else {
      this.selectedAmenities.splice(index, 1);
    }
  }

  isAmenitySelected(amenity: string): boolean {
    return this.selectedAmenities.includes(amenity);
  }

  onSubmit(): void {
    if (this.apartmentForm.invalid) {
      // Mark all controls as touched to trigger validation messages
      Object.keys(this.apartmentForm.controls).forEach(key => {
        const control = this.apartmentForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    
    // Prepare the apartment data
    const formValue = this.apartmentForm.value;
    
    // Convert comma-separated image URLs to array
    if (typeof formValue.media.imageUrls === 'string') {
      formValue.media.imageUrls = formValue.media.imageUrls
        .split(',')
        .map((url: string) => url.trim())
        .filter((url: string) => url);
    }
    
    // Add the selected amenities
    formValue.features.amenities = this.selectedAmenities;
    
    // Keep the original ID and host ID
    formValue.id = this.apartmentId;
    formValue.hostId = this.apartment.hostId;
    
    this.apiService.updateApartment(this.apartmentId, formValue).subscribe({
      next: () => {
        this.isSubmitting = false;
        // Navigate back to the apartment details
        this.router.navigate(['/apartments', this.apartmentId]);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = err.error?.message || 'Error updating apartment';
        console.error(err);
      }
    });
  }
}