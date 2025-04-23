// src/app/features/apartments/pages/apartment-create/apartment-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/http/api.service';

@Component({
  selector: 'app-apartment-create',
  templateUrl: './apartment-create.component.html',
})
export class ApartmentCreateComponent implements OnInit {
  apartmentForm: FormGroup;
  isSubmitting = false;
  error = '';
  amenityOptions = [
    'WiFi', 'Air Conditioning', 'Heating', 'Kitchen', 'TV', 'Parking',
    'Elevator', 'Washing Machine', 'Pool', 'Gym', 'Balcony', 'Pets Allowed'
  ];
  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.apartmentForm = this.createForm();
  }

  ngOnInit(): void {
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
        bedroomCount: [1, [Validators.required, Validators.min(0)]],
        bathroomCount: [1, [Validators.required, Validators.min(0)]],
        maxOccupancy: [1, [Validators.required, Validators.min(1)]],
        area: [0, [Validators.required, Validators.min(1)]],
        amenities: this.fb.array([])
      }),
      media: this.fb.group({
        thumbnailUrl: ['', Validators.required],
        imageUrls: this.fb.array([this.fb.control('', Validators.required)])
      }),
      availability: this.fb.group({
        isAvailable: [true]
      })
    });
  }
  
  get imageUrls(): FormArray {
    return this.apartmentForm.get('media.imageUrls') as FormArray;
  }
  
  get amenities(): FormArray {
    return this.apartmentForm.get('features.amenities') as FormArray;
  }
  
  addImageUrl(): void {
    this.imageUrls.push(this.fb.control('', Validators.required));
  }
  
  removeImageUrl(index: number): void {
    if (this.imageUrls.length > 1) {
      this.imageUrls.removeAt(index);
    }
  }
  
  toggleAmenity(amenity: string): void {
    const index = this.getAmenityIndex(amenity);
    
    if (index === -1) {
      this.amenities.push(this.fb.control(amenity));
    } else {
      this.amenities.removeAt(index);
    }
  }
  
  getAmenityIndex(amenity: string): number {
    return this.amenities.controls.findIndex(control => control.value === amenity);
  }
  
  isAmenitySelected(amenity: string): boolean {
    return this.getAmenityIndex(amenity) !== -1;
  }
  
  onSubmit(): void {
    if (this.apartmentForm.invalid) {
      // Mark all fields as touched to trigger validation display
      this.markFormGroupTouched(this.apartmentForm);
      return;
    }
    
    this.isSubmitting = true;
    
    this.apiService.createApartment(this.apartmentForm.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.router.navigate(['/apartments', response.id]);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = err.error?.message || 'Error creating apartment';
        console.error(err);
      }
    });
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(c => {
          if (c instanceof FormGroup) {
            this.markFormGroupTouched(c);
          } else {
            c.markAsTouched();
          }
        });
      }
    });
  }
}