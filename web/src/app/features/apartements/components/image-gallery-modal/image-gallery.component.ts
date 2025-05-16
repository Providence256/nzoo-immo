import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
})
export class ImageGalleryComponent {
  @Input() images: string[] = [];
  @Output() openModal = new EventEmitter<void>();
  selectedImageIndex = 0;

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  nextImage() {
    if (this.selectedImageIndex < this.images.length - 1) {
      this.selectedImageIndex++;
    }
  }

  previousImage() {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
    }
  }
}