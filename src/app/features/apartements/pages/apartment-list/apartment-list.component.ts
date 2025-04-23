// src/app/features/apartments/pages/apartment-list/apartment-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/http/api.service';
import { Apartment } from '../../../../core/models/apartment.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
})
export class ApartmentListComponent implements OnInit {
  apartments: Apartment[] = [];
  loading = false;
  error = '';
  filterForm: FormGroup;
  
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      location: [''],
      checkIn: [''],
      checkOut: [''],
      guests: [1],
      minPrice: [''],
      maxPrice: ['']
    });
  }

  ngOnInit(): void {
    this.loadApartments();
  }

  loadApartments(filters = {}): void {
    this.loading = true;
    this.apiService.getApartments(filters)
      .subscribe({
        next: (data) => {
          this.apartments = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error loading apartments';
          this.loading = false;
          console.error(err);
        }
      });
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    // Only include filters with values
    const activeFilters = Object.keys(filters)
      .filter(key => filters[key] !== '' && filters[key] !== null)
      .reduce((obj, key) => {
        obj[key] = filters[key];
        return obj;
      }, {});
      
    this.loadApartments(activeFilters);
  }
}