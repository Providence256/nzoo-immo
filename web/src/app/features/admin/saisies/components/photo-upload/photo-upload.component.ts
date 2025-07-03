import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import {
  PhotoFile,
  PhotoUploadService,
} from '../../services/photo-upload.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
})
export class PhotoUploadComponent implements OnInit, OnDestroy {
  @Input() showStepContent: boolean = true;
  @Output() photosChanged = new EventEmitter<PhotoFile[]>();
  @Output() validationChanged = new EventEmitter<boolean>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  photos: PhotoFile[] = [];
  isDragOver = false;
  currentPreviewPhoto: PhotoFile | null = null;

  private subscriptions: Subscription[] = [];

  // Propriétés utilitaires
  Math = Math;

  constructor(private photoService: PhotoUploadService) {}

  ngOnInit() {
    // S'abonner aux photos du service
    const photosSubscription = this.photoService.photos$.subscribe((photos) => {
      this.photos = photos;
      this.photosChanged.emit(photos);
    });

    // S'abonner à la validation du service
    const validationSubscription = this.photoService.validation$.subscribe(
      (isValid) => {
        this.validationChanged.emit(isValid);
      }
    );

    this.subscriptions.push(photosSubscription, validationSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  // Gestion des fichiers
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
    }
    // Reset input value pour permettre la sélection du même fichier
    input.value = '';
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

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  private processFiles(files: File[]): void {
    const validFiles = files.filter((file) => this.isValidFile(file));

    const newPhotos: PhotoFile[] = validFiles.map((file) => ({
      id: this.generateId(),
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    this.photoService.addPhotos(newPhotos);

    // Afficher un message si certains fichiers ont été rejetés
    if (validFiles.length !== files.length) {
      const rejectedCount = files.length - validFiles.length;
      console.warn(
        `${rejectedCount} fichier(s) rejeté(s) - format ou taille non valide`
      );
      // Ici vous pourriez afficher une notification toast
    }
  }

  private isValidFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Gestion des photos
  removePhoto(index: number): void {
    this.photoService.removePhoto(index);
  }

  onPhotosReorder(event: any): void {
    const dragDropEvent = event as CdkDragDrop<PhotoFile[]>;
    this.photoService.reorderPhotos(
      dragDropEvent.previousIndex,
      dragDropEvent.currentIndex
    );
  }

  // Prévisualisation
  previewPhoto(photo: PhotoFile): void {
    this.currentPreviewPhoto = photo;
  }

  closePreview(): void {
    this.currentPreviewPhoto = null;
  }

  getCurrentPhotoIndex(): number {
    if (!this.currentPreviewPhoto) return -1;
    return this.photos.findIndex(
      (photo) => photo.id === this.currentPreviewPhoto!.id
    );
  }

  showPreviousPhoto(): void {
    const currentIndex = this.getCurrentPhotoIndex();
    if (currentIndex > 0) {
      this.currentPreviewPhoto = this.photos[currentIndex - 1];
    }
  }

  showNextPhoto(): void {
    const currentIndex = this.getCurrentPhotoIndex();
    if (currentIndex < this.photos.length - 1) {
      this.currentPreviewPhoto = this.photos[currentIndex + 1];
    }
  }

  // Utilitaires
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Validation
  isValidForNextStep(): boolean {
    return this.photoService.isValidForNextStep();
  }

  // Méthodes publiques pour l'accès depuis le parent
  getPhotos(): PhotoFile[] {
    return this.photoService.getPhotos();
  }

  getPhotosCount(): number {
    return this.photos.length;
  }

  clearPhotos(): void {
    this.photoService.clearPhotos();
  }
}
