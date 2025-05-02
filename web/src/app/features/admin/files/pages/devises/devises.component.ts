import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";


@Component({
    selector: 'app-devises',
    templateUrl: './devises.component.html'
})

export class DevisesComponent implements OnInit{
    dialog!: boolean
    deleteDialog!: boolean
    formGroup!: FormGroup
    devises: any[] = []
    devise: any = {}


    constructor( 
        private breadcrumbService : BreadcrumbService,
        private messageService: MessageService,
    ){
        this.breadcrumbService.setItems([
            {label: 'Élément de base'},
            { label: 'Devises', routerLink: ['/files/devises'] },
          ]);
    }


    ngOnInit(): void {
        this.formGroup = new FormGroup({
            code: new FormControl('', Validators.required),
            designation: new FormControl('', Validators.required),
            isFiscale: new FormControl(false)
        })

       
    }

    openDialog(){
        this.dialog = true
        this.ngOnInit()
    }

    
    editDevise(data: any){
        this.devise = { ...data }
        this.formGroup.get('code')?.setValue(data.code)
        this.formGroup.get('designation')?.setValue(data.designation)
        this.formGroup.get('isFiscale')?.setValue(data.isFiscale)
        this.dialog = true
    }

    deleteDevise(data: any){
        this.devise = { ...data }
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

    get isFiscaleValue(){
        return this.formGroup.get('isFiscale')
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