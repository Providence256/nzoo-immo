import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PhotoFile {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {
  private photosSubject = new BehaviorSubject<PhotoFile[]>([]);
  private validationSubject = new BehaviorSubject<boolean>(false);

  photos$ = this.photosSubject.asObservable();
  validation$ = this.validationSubject.asObservable();

  constructor() {}

  getPhotos(): PhotoFile[] {
    return this.photosSubject.value;
  }

  setPhotos(photos: PhotoFile[]): void {
    this.photosSubject.next([...photos]);
    this.updateValidationState();
  }

  addPhotos(newPhotos: PhotoFile[]): void {
    const currentPhotos = this.photosSubject.value;
    const updatedPhotos = [...currentPhotos, ...newPhotos];
    this.photosSubject.next(updatedPhotos);
    this.updateValidationState();
  }

  removePhoto(index: number): void {
    const currentPhotos = this.photosSubject.value;
    if (index >= 0 && index < currentPhotos.length) {
      // Libérer l'URL de l'objet pour éviter les fuites mémoire
      URL.revokeObjectURL(currentPhotos[index].url);
      const updatedPhotos = currentPhotos.filter((_, i) => i !== index);
      this.photosSubject.next(updatedPhotos);
      this.updateValidationState();
    }
  }

  reorderPhotos(previousIndex: number, currentIndex: number): void {
    const currentPhotos = [...this.photosSubject.value];
    const movedItem = currentPhotos.splice(previousIndex, 1)[0];
    currentPhotos.splice(currentIndex, 0, movedItem);
    this.photosSubject.next(currentPhotos);
  }

  clearPhotos(): void {
    const currentPhotos = this.photosSubject.value;
    // Libérer toutes les URLs d'objets
    currentPhotos.forEach((photo) => URL.revokeObjectURL(photo.url));
    this.photosSubject.next([]);
    this.updateValidationState();
  }

  isValidForNextStep(): boolean {
    return this.photosSubject.value.length >= 5;
  }

  private updateValidationState(): void {
    this.validationSubject.next(this.isValidForNextStep());
  }

  // Méthode pour nettoyer le service (optionnel)
  ngOnDestroy(): void {
    const currentPhotos = this.photosSubject.value;
    currentPhotos.forEach((photo) => URL.revokeObjectURL(photo.url));
  }
}
