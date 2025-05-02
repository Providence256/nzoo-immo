import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";




@Component({
    selector: 'app-communes',
    templateUrl: './communes.component.html'
})

export class CommunesComponent implements OnInit {
 dialog!: boolean
 deleteDialog!: boolean
 formGroup!: FormGroup
 communes: any[] = [];
 villes: any[] = []
 commune: any = {}

    constructor(private breadcrumbService: BreadcrumbService, 
          
            private messageService: MessageService,
        ){
        this.breadcrumbService.setItems([
            {label: 'Élément de base'},
            { label: 'Communes', routerLink: ['/files/communes'] },
          ]);
    }
    ngOnInit(): void {
        this.formGroup = new FormGroup({
            code: new FormControl('', Validators.required),     
            designation: new FormControl('', Validators.required),
            ville: new FormControl('', Validators.required),
        })

        
    }   



    openDialog(){
        this.dialog = true
    }

   
    editCommune(data:any){
        this.commune = {...data}
        this.formGroup.patchValue({
            code: data.code,
            designation: data.designation,
            ville: data.ville
        })
        this.dialog = true
    }

    deleteCommune(data:any){
        this.commune = {...data}
        this.deleteDialog = true
    }

    cancelDelete(){
        this.deleteDialog = false
      }
    
      

    annuler(){
        this.dialog = false
    }

    get codeValue(){
        return this.formGroup.get('code')
    }

    get designationValue(){
        return this.formGroup.get('designation')
    }

    get villeValue(){
        return this.formGroup.get('ville')
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