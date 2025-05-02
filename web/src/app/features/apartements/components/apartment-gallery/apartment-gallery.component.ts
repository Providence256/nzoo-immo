// src/app/features/apartments/components/apartment-gallery/apartment-gallery.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-apartment-gallery',
  templateUrl: './apartment-gallery.component.html',
})
export class ApartmentGalleryComponent implements OnInit {
  @Input() images: string[] = [];
  currentImageIndex = 0;
  showFullGallery = false;

  constructor() { }

  ngOnInit(): void {
  }

  previousImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  showImage(index: number): void {
    this.currentImageIndex = index;
  }

  toggleGallery(): void {
    this.showFullGallery = !this.showFullGallery;
  }
}