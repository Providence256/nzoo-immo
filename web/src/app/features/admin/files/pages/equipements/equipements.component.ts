import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";



@Component({
 selector: 'app-equipements',
 templateUrl: './equipements.component.html'
})

export class EquipementsComponent implements OnInit {
dialog!: boolean
deleteDialog!: boolean
formGroup!: FormGroup

iconList: string[] = [
   // 🏡 Property & Listings
  'house', 'apartment', 'villa', 'home_work', 'holiday_village', 
  'location_city', 'maps_home_work', 'domain', 'storefront', 'business',

  // 🛏️ Amenities & Features
  'king_bed', 'single_bed', 'bed', 'bathtub', 'shower', 'hot_tub',
  'pool', 'ac_unit', 'wifi', 'tv', 'fireplace', 'smoke_free', 'pets',
  'local_laundry_service', 'local_parking', 'security', 'kitchen','flatware',

  // 📍 Location & Travel
  'location_on', 'place', 'map', 'public', 'near_me', 'explore',
  'flight', 'train', 'directions_bus', 'directions_car', 'directions_boat',
  'hiking', 'beach_access', 'local_airport',

  // 📅 Booking & Scheduling
  'event', 'calendar_today', 'date_range', 'schedule', 'alarm', 
  'access_time', 'pending', 'watch_later',

  // 💰 Pricing & Payments
  'attach_money', 'credit_card', 'payment', 'account_balance_wallet',
  'monetization_on', 'receipt', 'redeem', 'price_check', 'request_quote',

  // 👤 Users & Profiles
  'person', 'person_outline', 'people', 'group', 'account_circle', 
  'face', 'admin_panel_settings', 'supervisor_account', 'support_agent',

  // 💬 Messaging & Reviews
  'chat', 'comment', 'rate_review', 'star', 'stars', 'feedback', 
  'question_answer', 'help',

  // ⚙️ Settings & Navigation
  'settings', 'tune', 'dashboard', 'menu', 'apps', 'widgets', 
  'more_horiz', 'more_vert',

  // 🔒 Security & Authentication
  'lock', 'lock_open', 'verified_user', 'fingerprint', 'shield', 
  'vpn_key', 'password'
    
  ];
  

  filteredIcons: string[] = [...this.iconList];

  equipements: any[] = []
  equipement: any  = {}
  
 


    constructor(
        private breadcrumbService: BreadcrumbService,
        private messageService: MessageService,
      ){
        this.breadcrumbService.setItems([
            {label: 'Élément de base'},
            { label: 'Equipements', routerLink: ['/files/equipements'] },
          ]);

    }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      code: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      icon: new FormControl('', Validators.required),
      searchIcon: new FormControl(''),
    })

    
  }


    openDialog(){
        this.dialog = true
    }

    selectIcon(icon: string) {
        this.equipement.icon = icon;
        this.formGroup.get('icon')?.setValue(icon);
        this.formGroup.get('icon')?.markAsTouched();
      }

    
      filterIcons() {
        const searchValue = this.formGroup.get('searchIcon')?.value.toLowerCase();
        this.filteredIcons = this.iconList.filter(icon => 
          icon.toLowerCase().includes(searchValue)
        );
      }
    

   

    deleteEquipement(data:any){
        this.equipement = {...data}
        this.deleteDialog = true
    }
    editEquipement(data:any){
      this.equipement = {...data}
      this.formGroup.get('code')?.setValue(this.equipement.code)
      this.formGroup.get('designation')?.setValue(this.equipement.designation)
      this.formGroup.get('icon')?.setValue(this.equipement.icon)
      this.formGroup.get('searchIcon')?.setValue(this.equipement.icon)
      this.dialog = true
    }

    annuler(){
        this.dialog = false
    }

    cancelDelete(){
      this.deleteDialog = false
    }
  
   

    get iconValue(){
      return this.formGroup.get('icon')?.value
    }


    private validateAllFields(formGroup: FormGroup){
      Object.keys(formGroup.controls).forEach((field) => {
          const control = formGroup.get(field)

          if(control instanceof FormControl){
              control.markAsDirty({ onlySelf: true })
          }else if(control instanceof FormGroup){
              this.validateAllFields(control);
          }
      })
  }
}