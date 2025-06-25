import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface PhotoItem {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
}

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styles: [
    `
      .drag-over {
        border-color: #3b82f6;
        background-color: #eff6ff;
      }

      .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 12px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        opacity: 0.8;
        transform: rotate(5deg);
      }

      .cdk-drag-placeholder {
        opacity: 0.3;
        border: 2px dashed #3b82f6;
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class PhotoUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Rendez currentStep configurable via @Input
  @Input() currentStep: number = 8;
  @Input() showStepContent: boolean = true;
  @Output() photosChanged = new EventEmitter<PhotoItem[]>();
  isDialogOpen = false;
  isDragOver = false;
  photos: PhotoItem[] = [];
  pendingPhotos: PhotoItem[] = [];
  previewPhoto: PhotoItem | null = null;

  private readonly maxFileSize = 10 * 1024 * 1024; // 10MB
  private readonly allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  openPhotoDialog(): void {
    this.isDialogOpen = true;
    this.pendingPhotos = [];
  }

  closeDialog(event?: Event): void {
    if (event && event.target !== event.currentTarget) {
      return;
    }
    this.isDialogOpen = false;
    this.pendingPhotos = [];
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      this.processFiles(Array.from(event.dataTransfer.files));
    }
  }

  private processFiles(files: File[]): void {
    files.forEach((file) => {
      if (this.validateFile(file)) {
        const photoItem: PhotoItem = {
          id: this.generateId(),
          file,
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
        };
        this.pendingPhotos.push(photoItem);
      }
    });
  }

  private validateFile(file: File): boolean {
    if (!this.allowedTypes.includes(file.type)) {
      alert(`Le format ${file.type} n'est pas supporté. Utilisez JPG ou PNG.`);
      return false;
    }

    if (file.size > this.maxFileSize) {
      alert(`Le fichier ${file.name} est trop volumineux (max 10MB).`);
      return false;
    }

    return true;
  }

  addPhotos(): void {
    this.photos.push(...this.pendingPhotos);
    this.photosChanged.emit(this.photos);
    this.closeDialog();
  }

  removePendingPhoto(index: number): void {
    const photo = this.pendingPhotos[index];
    URL.revokeObjectURL(photo.url);
    this.pendingPhotos.splice(index, 1);
  }

  removePhoto(index: number): void {
    const photo = this.photos[index];
    URL.revokeObjectURL(photo.url);
    this.photos.splice(index, 1);
    this.photosChanged.emit(this.photos);
  }

  onPhotoDrop(event: CdkDragDrop<PhotoItem[]>): void {
    moveItemInArray(this.photos, event.previousIndex, event.currentIndex);
    this.photosChanged.emit(this.photos);
  }

  previewPhotos(photo: PhotoItem): void {
    this.previewPhoto = photo;
  }

  closePreview(): void {
    this.previewPhoto = null;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  ngOnDestroy(): void {
    // Nettoyer les URLs d'objets pour éviter les fuites mémoire
    [...this.photos, ...this.pendingPhotos].forEach((photo) => {
      URL.revokeObjectURL(photo.url);
    });
  }
}
