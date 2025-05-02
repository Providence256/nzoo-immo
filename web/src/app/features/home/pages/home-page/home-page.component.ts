import { Component, OnInit } from '@angular/core';
import { Property } from '../../../../core/models/property';
import { PropertyService } from '../../../../core/services/property.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  featuredProperties: Property[] = [];
  isLoading = true;

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    // this.loadFeaturedProperties();
  }

  // loadFeaturedProperties(): void {
  //   this.propertyService.getFeaturedProperties().subscribe({
  //     next: (properties) => {
  //       this.featuredProperties = properties;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error loading featured properties', error);
  //       this.isLoading = false;
  //     }
  //   });
  // }
}