import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";




@Component({
    selector: 'app-villes',
    templateUrl: './villes.component.html',
  })

export class VillesComponent implements OnInit {
  dialog!: boolean
  deleteDialog!: boolean
  formGroup!: FormGroup
  villeImage: string | ArrayBuffer | null = null;
  villes: any[] = [];
  ville: any = {}
  imageFile: File | null = null;


        constructor(
            private breadcrumbService : BreadcrumbService, 
            private messageService: MessageService,
          ) {
            this.breadcrumbService.setItems([
                {label: 'Élément de base'},
                { label: 'Villes', routerLink: ['/files/villes'] },
              ]);

         }
  ngOnInit(): void {
    this.formGroup  = new FormGroup({
      code: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
    })

    
  }


  openDialog(){
    this.dialog = true
    this.formGroup.reset()
    this.villeImage = null
  }

  

 


  

get codeValue(){
  return this.formGroup.get('code')?.value
}

get designationValue(){
  return this.formGroup.get('designation')?.value
}




private validateAllField(formGroup: FormGroup){
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    
    if(control instanceof FormControl){
      control.markAsTouched({onlySelf: true});
    } else if(control instanceof FormGroup){
      this.validateAllField(control);
    }
  }
  );
}

}