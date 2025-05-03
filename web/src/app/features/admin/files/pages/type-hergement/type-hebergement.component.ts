import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";
import { TypeHebergementService } from "../../services/type-hebergement.service";

@Component({
    selector: 'app-type-hebergement',
    templateUrl: './type-hebergement.component.html'
})

export class TypeHebergementComponent implements OnInit {
    dialog: boolean = false;
    deleteDialog: boolean = false;
    formGroup!: FormGroup;
    typeHebergements: any[] = [];
    typeHebergement: any = {};
    loading: boolean = false;
    submitted: boolean = false;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private typeHebergementService: TypeHebergementService,
        private messageService: MessageService,
    ) {
        this.breadcrumbService.setItems([
            {label: 'Élément de base'},
            { label: 'Type hebergement', routerLink: ['/files/type-hebergements'] },
        ]);
    }

    ngOnInit(): void {
        this.initForm();
        this.loadTypeHebergements();
    }

    initForm(): void {
        this.formGroup = new FormGroup({
            code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        });
    }

    loadTypeHebergements(): void {
        this.loading = true;
        this.typeHebergementService.getTypeHebergements().subscribe({
            next: (response) => {
                this.typeHebergements = response;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading type hebergements:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les types d\'hébergement',
                    life: 3000
                });
                this.loading = false;
            },
        });
    }

    openDialog(): void {
        this.dialog = true;
        this.formGroup.reset();
        this.typeHebergement = {};
        this.submitted = false;
    }

    addTypeHebergement(): void {
        this.submitted = true;
        
        if (this.formGroup.invalid) {
            this.validateAllFields(this.formGroup);
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez remplir tous les champs obligatoires',
            });
            return;
        }

        const typeHebergementData = {
            code: this.formGroup.get('code')!.value,
            designation: this.formGroup.get('designation')!.value,
        };

        this.loading = true;
        
        if (this.typeHebergement.id) {
            // Update existing type hebergement
            this.typeHebergementService.updateTypeHebergement(this.typeHebergement.id, typeHebergementData).subscribe({
                next: () => {
                    this.handleSuccess('Type d\'hébergement modifié avec succès');
                },
                error: (error) => {
                    this.handleError(error, 'Échec lors de la modification');
                }
            });
        } else {
            // Create new type hebergement
            this.typeHebergementService.createTypeHebergement(typeHebergementData).subscribe({
                next: () => {
                    this.handleSuccess('Type d\'hébergement ajouté avec succès');
                },
                error: (error) => {
                    this.handleError(error, 'Échec lors de l\'ajout');
                }
            });
        }
    }

    handleSuccess(message: string): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: message,
            life: 3000
        });
        this.dialog = false;
        this.loading = false;
        this.submitted = false;
        this.loadTypeHebergements();
    }

    handleError(error: any, message: string): void {
        console.error('API error details:', error);
        let errorDetail = message;
        
        // Try to extract more specific error information if available
        if (error.error && typeof error.error === 'object') {
            if (error.error.message) {
                errorDetail = `${message}: ${error.error.message}`;
            } else if (error.error.title) {
                errorDetail = `${message}: ${error.error.title}`;
            }
        }
        
        this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: errorDetail,
        });
        this.loading = false;
    }

    editType(data: any): void {
        this.typeHebergement = { ...data };
        this.formGroup.patchValue({
            code: data.code,
            designation: data.designation,
        });
        this.dialog = true;
        this.submitted = false;
    }

    deleteType(data: any): void {
        this.typeHebergement = { ...data };
        this.deleteDialog = true;
    }

    confirmDelete(id: any): void {
        if (!id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'ID du type d\'hébergement invalide',
            });
            return;
        }
        
        this.loading = true;
        this.typeHebergementService.deleteTypeHebergement(id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Suppression',
                    detail: 'Type d\'hébergement supprimé avec succès',
                    life: 3000
                });
                this.deleteDialog = false;
                this.typeHebergement = {};
                this.loadTypeHebergements();
            },
            error: (error) => {
                console.error('Error deleting type hebergement:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Échec lors de la suppression',
                });
                this.loading = false;
            },
        });
    }

    annuler(): void {
        this.dialog = false;
        this.submitted = false;
    }

    cancelDelete(): void {
        this.deleteDialog = false;
    }

    // Form validation helpers
    isInvalid(field: string): boolean {
        const control = this.formGroup.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched || this.submitted));
    }

    getErrorMessage(field: string): string {
        const control = this.formGroup.get(field);
        if (control?.hasError('required')) {
            return 'Ce champ est obligatoire';
        }
        if (control?.hasError('maxlength')) {
            const maxLength = control.getError('maxlength').requiredLength;
            return `Maximum ${maxLength} caractères`;
        }
        return '';
    }

    private validateAllFields(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFields(control);
            }
        });
    }
}