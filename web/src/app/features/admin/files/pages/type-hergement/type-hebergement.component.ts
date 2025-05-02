import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";



@Component({
    selector: 'app-type-hebergement',
    templateUrl: './type-hebergement.component.html'
})

export class TypeHebergementComponent implements OnInit{
    dialog!: boolean
    deleteDialog!: boolean
    formGroup!: FormGroup
    typeHebergements: any[] = []
    typeHebergement: any = {}

    constructor(
        private breadcrumbService:BreadcrumbService,
        private messageService: MessageService,
    ){
        this.breadcrumbService.setItems([
            {label: 'Élément de base'},
            { label: 'Type hebergement', routerLink: ['/files/type-hebergements'] },
          ]);
    }
    ngOnInit(): void {
        this.formGroup = new FormGroup({
            code: new FormControl('', Validators.required),
            designation: new FormControl('', Validators.required),
        })

    }



    openDialog(){
        this.dialog = true
        this.ngOnInit()
    }


    
    editType(data:any){
        this.typeHebergement = { ...data }
        this.formGroup.get('code')?.setValue(data.code)
        this.formGroup.get('designation')?.setValue(data.designation)
        this.dialog = true
       
    }

    deleteType(data:any){
        this.typeHebergement = { ...data }
        this.deleteDialog = true
    }

    annuler(){
        this.dialog = false
    }



    cancelDelete(){
        this.deleteDialog = false
      }
    
      


    get codeValue(){
        return this.formGroup.get('code')
    }

    get designationValue(){
        return this.formGroup.get('designation')
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