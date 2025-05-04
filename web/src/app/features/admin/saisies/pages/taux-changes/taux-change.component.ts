import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";





@Component({
    selector: 'app-taux-change',
    templateUrl: './taux-change.component.html'
})

export class TauxChangeComponent implements OnInit {
  dialog!:boolean
  formGroup!: FormGroup
  devises: any[] = []
  deviseReference: any = {}
  tauxChange: any = {}
    constructor(
        private breadcrumbService: BreadcrumbService,
        private messageService: MessageService,
    ){
        this.breadcrumbService.setItems([
            {label: 'Saisies'},
            {label: 'Taux de change', routerLink: '/saisies/taux-change'}
        ])
    }
    ngOnInit(): void {
        this.formGroup = new FormGroup({
            deviseReference: new FormControl('', Validators.required),
            deviseConversion: new FormControl('', Validators.required),
            uniteReference: new FormControl('', Validators.required),
            tauxChange: new FormControl('', Validators.required),
        })

        this.service.findAllDevises().subscribe({
            next: (response) => this.devises = response
        })

        this.service.findDeviseReference().subscribe({
            next:(response) => {
                this.deviseReference = response
                this.formGroup.get('deviseReference')?.setValue(this.deviseReference.code)
            }
        })
    }


    openDialog(){
        this.dialog = true
    }

    addtauxChange(){

        if(this.formGroup.valid){
            const request = {
                deviseReferenceId: this.deviseReference.id,
                deviseId: this.deviseConvValue?.value.id,
                uniteReference: this.uniteReferenceValue,
                taux: this.TauxChangeValue
            }

            if(this.tauxChange.id){
                this.service.edit(this.tauxChange.id, request).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: "Modification",
                            detail: 'Modification reussie',
                            life: 3000
                        })
                        this.ngOnInit()
                    },
                    error: (error) => console.log(error),
                })
            }else{
                console.log(request)
                this.service.add(request).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: "Ajout",
                            detail: 'Ajout reussie',
                            life: 3000
                        })
                        this.ngOnInit()
                    },
                    error: (error) => console.log(error),
                })
            }
            this.dialog = false
            this.tauxChange = {}
        }
        else{
            this.validateAllFields(this.formGroup)
        }
    }

    annuler(){
        this.dialog = false
    }


    get deviseRefValue(){
        return this.formGroup.get('tauxChange')?.value
    }

    get deviseConvValue(){
        return this.formGroup.get('deviseConversion')
    }

    get uniteReferenceValue(){
        return this.formGroup.get('uniteReference')?.value
    }

    get TauxChangeValue(){
        return this.formGroup.get('tauxChange')?.value
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