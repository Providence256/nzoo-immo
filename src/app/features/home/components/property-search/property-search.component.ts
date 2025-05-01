import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-filters',
  template: `
    <div class="w-full bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl mb-8 border border-gray-100">
      <!-- Mobile Search Bar -->
      <div class="md:hidden p-4 bg-white">
        <button (click)="toggleMobileFilters()" class="w-full bg-secondary-950 text-white py-3 px-4 rounded-lg flex justify-between items-center">
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Rechercher
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <!-- Mobile Filters Panel (Hidden by default) -->
      <div class="md:hidden" [ngClass]="{'hidden': !showMobileFilters}">
        <form [formGroup]="searchForm" class="p-4 space-y-4">
          <!-- Location -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Destination</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input type="text" formControlName="location" class="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="Où allez-vous ?">
            </div>
          </div>

          <!-- Dates -->
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Arrivée</label>
              <input type="date" formControlName="checkIn" class="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Départ</label>
              <input type="date" formControlName="checkOut" class="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
            </div>
          </div>

          <!-- Guests -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Voyageurs</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <select formControlName="guests" class="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                <option value="1">1 voyageur</option>
                <option value="2">2 voyageurs</option>
                <option value="3">3 voyageurs</option>
                <option value="4">4 voyageurs</option>
                <option value="5">5+ voyageurs</option>
              </select>
            </div>
          </div>

          <!-- Advanced Filters Toggle -->
          <div class="pt-2">
            <button type="button" (click)="toggleAdvancedFilters()" class="flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
              <span>Filtres avancés</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" [ngClass]="{'transform rotate-180': showAdvancedFilters}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- Advanced Filters Content -->
          <div [ngClass]="{'hidden': !showAdvancedFilters}" class="space-y-4 pt-2 border-t border-gray-200">
            <!-- Price Range -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Budget (par nuit)</label>
              <div class="grid grid-cols-2 gap-3">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span class="text-gray-500">€</span>
                  </div>
                  <input type="number" formControlName="minPrice" class="pl-8 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="Min">
                </div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span class="text-gray-500">€</span>
                  </div>
                  <input type="number" formControlName="maxPrice" class="pl-8 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="Max">
                </div>
              </div>
            </div>

            <!-- Property Type -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Type de logement</label>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50" [ngClass]="{'bg-primary-50 border-primary-300': isPropertyTypeSelected('apartment')}">
                  <input type="checkbox" formControlName="apartment" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" (change)="updatePropertyType('apartment')">
                  <span class="ml-2 text-sm">Appartement</span>
                </label>
                <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50" [ngClass]="{'bg-primary-50 border-primary-300': isPropertyTypeSelected('house')}">
                  <input type="checkbox" formControlName="house" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" (change)="updatePropertyType('house')">
                  <span class="ml-2 text-sm">Maison</span>
                </label>
                <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50" [ngClass]="{'bg-primary-50 border-primary-300': isPropertyTypeSelected('villa')}">
                  <input type="checkbox" formControlName="villa" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" (change)="updatePropertyType('villa')">
                  <span class="ml-2 text-sm">Villa</span>
                </label>
                <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50" [ngClass]="{'bg-primary-50 border-primary-300': isPropertyTypeSelected('unique')}">
                  <input type="checkbox" formControlName="unique" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" (change)="updatePropertyType('unique')">
                  <span class="ml-2 text-sm">Insolite</span>
                </label>
              </div>
            </div>

            <!-- Amenities -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Équipements</label>
              <div class="grid grid-cols-2 gap-y-2">
                <label class="flex items-center">
                  <input type="checkbox" formControlName="wifi" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                  <span class="ml-2 text-sm">WiFi</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" formControlName="pool" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                  <span class="ml-2 text-sm">Piscine</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" formControlName="aircon" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                  <span class="ml-2 text-sm">Climatisation</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" formControlName="kitchen" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                  <span class="ml-2 text-sm">Cuisine</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Search Button -->
          <button type="submit" class="w-full bg-secondary-950 text-white py-3 px-4 rounded-lg hover:bg-secondary-800 transition-colors duration-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Rechercher
          </button>
        </form>
      </div>

      <!-- Desktop Search Bar -->
      <div class="hidden md:block">
        <form [formGroup]="searchForm" class="flex flex-wrap items-stretch">
          <!-- Location Field -->
          <div class="w-full lg:w-1/4 p-4 border-r border-gray-200">
            <label class="block text-xs font-medium text-gray-500 mb-1">Destination</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input type="text" formControlName="location" class="w-full focus:outline-none text-gray-700" placeholder="Où allez-vous ?">
            </div>
          </div>

          <!-- Check-in Date -->
          <div class="w-full lg:w-1/5 p-4 border-r border-gray-200">
            <label class="block text-xs font-medium text-gray-500 mb-1">Arrivée</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input type="date" formControlName="checkIn" class="w-full focus:outline-none text-gray-700">
            </div>
          </div>

          <!-- Check-out Date -->
          <div class="w-full lg:w-1/5 p-4 border-r border-gray-200">
            <label class="block text-xs font-medium text-gray-500 mb-1">Départ</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input type="date" formControlName="checkOut" class="w-full focus:outline-none text-gray-700">
            </div>
          </div>

          <!-- Guests -->
          <div class="w-full lg:w-1/6 p-4 border-r border-gray-200">
            <label class="block text-xs font-medium text-gray-500 mb-1">Voyageurs</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <select formControlName="guests" class="w-full focus:outline-none bg-transparent text-gray-700">
                <option value="1">1 voyageur</option>
                <option value="2">2 voyageurs</option>
                <option value="3">3 voyageurs</option>
                <option value="4">4 voyageurs</option>
                <option value="5">5+ voyageurs</option>
              </select>
            </div>
          </div>

          <!-- Search Button -->
          <div class="w-full lg:w-auto p-4 flex items-center">
            <button type="submit" class="bg-secondary-950 text-white py-3 px-6 rounded-lg hover:bg-secondary-800 transition-colors duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Rechercher
            </button>
          </div>
        </form>
        
        <!-- Advanced Filters (Desktop) -->
        <div class="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div class="flex flex-wrap items-center justify-between">
            <div class="flex space-x-2 overflow-x-auto pb-1 flex-grow mr-4">
              <button type="button" (click)="toggleFilterMenu('price')" class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Prix
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button type="button" (click)="toggleFilterMenu('type')" class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Type de logement
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button type="button" (click)="toggleFilterMenu('amenities')" class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Équipements
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button type="button" (click)="toggleFilterMenu('rating')" class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Note
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <!-- Clear Filters Button -->
            <button type="button" (click)="clearAllFilters()" class="text-sm text-primary-600 hover:text-primary-800 font-medium">
              Effacer tous les filtres
            </button>
          </div>
        </div>
        
        <!-- Filter Dropdown Menus -->
        <div *ngIf="activeFilterMenu === 'price'" class="bg-white p-4 border-t border-gray-200 shadow-sm animate-slideDown">
          <div class="space-y-4">
            <h4 class="font-medium text-gray-800">Budget (par nuit)</h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span class="text-gray-500">€</span>
                </div>
                <input type="number" formControlName="minPrice" class="pl-8 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="Min">
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span class="text-gray-500">€</span>
                </div>
                <input type="number" formControlName="maxPrice" class="pl-8 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" placeholder="Max">
              </div>
            </div>
            <div class="flex justify-end">
              <button type="button" (click)="applyFilters()" class="bg-secondary-950 text-white py-2 px-4 rounded-lg hover:bg-secondary-800 transition-colors duration-300">
                Appliquer
              </button>
            </div>
          </div>
        </div>
        
        <div *ngIf="activeFilterMenu === 'type'" class="bg-white p-4 border-t border-gray-200 shadow-sm animate-slideDown">
          <div class="space-y-4">
            <h4 class="font-medium text-gray-800">Type de logement</h4>
            <div class="grid grid-cols-4 gap-3">
              <label class="flex flex-col items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50" [ngClass]="{'bg-primary-50 border-primary-300': isPropertyTypeSelected('apartment')}">
                <input type="checkbox" formControlName="apartment" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" (change)="updatePropertyType('apartment')">
                <span class="mt-2 text-sm text-center">Appartement</span>
              </label>
              <label class="flex flex-col items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50" [ngClass]="{'bg-primary-50 border-primary-300': isPropertyTypeSelected('house')}">
                <input type="checkbox" formControlName="house" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" (change)="updatePropertyType('house')">
                <span class="mt-2 text-sm text-center">Maison</span>
              </label>
              <label class="flex flex-col items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50" [ngClass]="{'bg-primary-50 border-primary-300': isPropertyTypeSelected('villa')}">
                <input type="checkbox" formControlName="villa" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" (change)="updatePropertyType('villa')">
                <span class="mt-2 text-sm text-center">Villa</span>
              </label>
              <label class="flex flex-col items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50" [ngClass]="{'bg-primary-50 border-primary-300': isPropertyTypeSelected('unique')}">
                <input type="checkbox" formControlName="unique" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" (change)="updatePropertyType('unique')">
                <span class="mt-2 text-sm text-center">Insolite</span>
              </label>
            </div>
            <div class="flex justify-end">
              <button type="button" (click)="applyFilters()" class="bg-secondary-950 text-white py-2 px-4 rounded-lg hover:bg-secondary-800 transition-colors duration-300">
                Appliquer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slideDown {
      animation: slideDown 0.2s ease-out forwards;
    }
  `]
})
export class SearchFiltersComponent implements OnInit {
  searchForm!: FormGroup;
  showMobileFilters = false;
  showAdvancedFilters = false;
  activeFilterMenu: string | null = null;
  selectedPropertyTypes: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      location: [''],
      checkIn: [''],
      checkOut: [''],
      guests: ['2'],
      minPrice: [''],
      maxPrice: [''],
      apartment: [false],
      house: [false],
      villa: [false],
      unique: [false],
      wifi: [false],
      pool: [false],
      aircon: [false],
      kitchen: [false]
    });
  }

  toggleMobileFilters(): void {
    this.showMobileFilters = !this.showMobileFilters;
  }

  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  toggleFilterMenu(menu: string): void {
    this.activeFilterMenu = this.activeFilterMenu === menu ? null : menu;
  }

  updatePropertyType(type: string): void {
    const index = this.selectedPropertyTypes.indexOf(type);
    if (index > -1) {
      this.selectedPropertyTypes.splice(index, 1);
    } else {
      this.selectedPropertyTypes.push(type);
    }
  }

  isPropertyTypeSelected(type: string): boolean {
    return this.selectedPropertyTypes.includes(type);
  }

  applyFilters(): void {
    this.activeFilterMenu = null;
    // Here you would implement the actual filtering logic
    console.log('Filters applied:', this.searchForm.value);
  }

  clearAllFilters(): void {
    this.searchForm.reset({
      guests: '2',
      apartment: false,
      house: false,
      villa: false,
      unique: false,
      wifi: false,
      pool: false,
      aircon: false,
      kitchen: false
    });
    this.selectedPropertyTypes = [];
  }
}