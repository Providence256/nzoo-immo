import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";


@Component({
    selector: 'app-regles',
    templateUrl: './regles.component.html'
})

export class ReglesComponent implements OnInit{
dialog!: boolean
deleteDialog!: boolean
formGroup!: FormGroup
rules: any[] = []
rule: any = {}
    constructor(
        private breadcrumbService: BreadcrumbService,
        private messageService: MessageService,
    ){
        this.breadcrumbService.setItems([
            {label: 'Élément de base'},
            { label: 'Regles', routerLink: ['/files/rules'] },
        ])
    }
    ngOnInit(): void {
        this.formGroup = new FormGroup({
            libelle: new FormControl('', Validators.required),
        })

       
    }

    
    editRule(data: any){
        this.rule = { ...data }
        this.formGroup.get('libelle')?.setValue(data.libelle)
        this.dialog = true
    }

    deleteRule(data:any){
        this.rule = {...data}
        this.deleteDialog = true
    }


    openDialog(){
        this.dialog = true
    }

    annuler(){
        this.dialog = false
    }

    cancelDelete(){
        this.deleteDialog = false
      }
    
     

    get libelleValue(){
        return this.formGroup.get('libelle')
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