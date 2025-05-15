// src/app/features/apartments/pages/apartment-detail/apartment-detail.component.ts
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/authentication/auth.service';
import { User } from '../../../../core/models/user.model';
import { PropertyService } from '../../../../core/services/property.service';
import { AnnoncesService } from '../../../admin/saisies/services/annonces.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss'],
})
export class ApartmentDetailComponent implements OnInit {
 
  loading = true;
  error = '';
  currentUser: User | null = null;
  isOwner = false;
  bookingForm!: FormGroup;
  bookingSubmitted = false;
  bookingError = '';
  comparablePrices: any[] = [];
  loadingComparisons = false;
  annonce: any = {}
  equipements : any[] = []
  checkingAvailability = false
  isAvailable = true

  currentImageIndex: number = 0;
  currentImage: string = '';

  // Full-screen photo modal
  isPhotoModalOpen: boolean = false;
  modalImageIndex: number = 0;

  minDate!: Date
  maxDate!: Date
  rangeDates: Date[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: PropertyService,
    private annonceService: AnnoncesService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
    

    // this.authService.currentUser.subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });

    this.loadAnnonce();
    this.loadEquipements()

    this.bookingForm.get('checkIn')?.valueChanges.subscribe(val => {
      if (val) {
        this.rangeDates[0] = val;
      }
    });

    this.bookingForm.get('checkOut')?.valueChanges.subscribe(val => {
      if (val) {
        this.rangeDates[1] = val;
      }
    });

   
  }

  loadAnnonce(){
    const id = this.route.snapshot.paramMap.get('id');

    if(!id) return;
    this.annonceService.find(+id).subscribe({
      next: annonce => {
        this.annonce = annonce,
        this.loading = false
        this.currentImage = this.annonce.photoUrls[this.currentImageIndex];

        if(this.bookingForm){
          const guestsControl = this.bookingForm.get('guests')
          if(guestsControl){
            guestsControl.setValidators([
              Validators.required,
              Validators.min(1),
              Validators.max(this.annonce.nbreVisiteurs || 16)
            ])
            guestsControl.updateValueAndValidity()
          }
        }
        
      },
      error: error => {
        console.log(error);
        this.error = 'Failed to load apartment details'
        this.loading = false
      }
    })
  }

  loadEquipements(): void {
    this.annonceService.findAllEquipements().subscribe({
        next:(data) => {
            this.equipements = data
        },
        error:(err) => {
            console.error('Erreur chargement équipements')
        }
    })
}

checkDateAvailability() : void {
  const checkIn = this.bookingForm.get('checkIn')?.value
  const checkOut = this.bookingForm.get('checkOut')?.value

  if(!checkIn || !checkOut || !this.annonce?.id){
    return;
  }

  this.checkingAvailability = true;
  this.isAvailable = true


}

  
  goToConfirmBooking(): void {
    this.bookingSubmitted = true;
    
    if (this.bookingForm.invalid) {
      return;
    }

    console.log(this.bookingForm.valid)
    
  }

  onDateRangeSelect(event: { startDate: Date, endDate: Date }) {
    console.log('Form values after date range selection:', event);
    this.bookingForm.patchValue({
      checkIn: event.startDate,
      checkOut: event.endDate
    });
    this.cdr.detectChanges();
  }

  nextImage(): void {
    if (!this.annonce) return;
    
    this.currentImageIndex = (this.currentImageIndex + 1) % this.annonce.photoUrls.length;
    this.currentImage = this.annonce.photoUrls[this.currentImageIndex];
  }

  prevImage(): void {
    if (!this.annonce) return;
    
    this.currentImageIndex = (this.currentImageIndex - 1 + this.annonce.photoUrls.length) % this.annonce.photoUrls.length;
    this.currentImage = this.annonce.photoUrls[this.currentImageIndex];
  }

  selectImage(index: number): void {
    if (!this.annonce) return;
    
    this.currentImageIndex = index;
    this.currentImage = this.annonce.photoUrls[this.currentImageIndex];
  }


  openPhotoModal(): void {
    this.isPhotoModalOpen = true;
    this.modalImageIndex = this.currentImageIndex;
    document.body.classList.add('overflow-hidden'); // Prevent scrolling while modal is open
  }
  
  closePhotoModal(): void {
    this.isPhotoModalOpen = false;
    document.body.classList.remove('overflow-hidden');
  }
  
  nextModalImage(event?: Event): void {
    if (event) event.stopPropagation();
    if (!this.annonce) return;
    
    this.modalImageIndex = (this.modalImageIndex + 1) % this.annonce.photoUrls.length;
  }
  
  prevModalImage(event?: Event): void {
    if (event) event.stopPropagation();
    if (!this.annonce) return;
    
    this.modalImageIndex = (this.modalImageIndex - 1 + this.annonce.photoUrls.length) % this.annonce.photoUrls.length;
  }
  
  selectModalImage(index: number, event: Event): void {
    event.stopPropagation();
    if (!this.annonce) return;
    
    this.modalImageIndex = index;
  }

  getEquipementIconById(id: number) {
     
    const equipement = this.equipements.find(e => e.id === id);
   
    return equipement.icon;
     
   }

   formatPrice(property: any): string{
    if(property && property.price && property.price.prixBase){
      return `${property.price.prixBase} ${property.price.codeDevise || 'USD'}`
    }
  
    return 'Prix non disponible';
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isPhotoModalOpen) return;
    
    switch (event.key) {
      case 'ArrowRight':
        this.nextModalImage();
        break;
      case 'ArrowLeft':
        this.prevModalImage();
        break;
      case 'Escape':
        this.closePhotoModal();
        break;
    }
  }


}