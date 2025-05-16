import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
})
export class PhotoModalComponent {
  @Input() isOpen: boolean = false;
  @Input() images: string[] = [];
  @Output() close = new EventEmitter<void>();
}