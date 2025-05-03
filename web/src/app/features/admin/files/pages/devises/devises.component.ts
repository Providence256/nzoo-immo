import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";
import { DeviseService } from "../../services/devise.service"; // You'll need to create this service

@Component({
    selector: 'app-devises',
    templateUrl: './devises.component.html'
})
export class DevisesComponent implements OnInit {
    dialog: boolean = false;
    deleteDialog: boolean = false;
    formGroup!: FormGroup;
    devises: any[] = [];
    devise: any = {};
    loading: boolean = false;
    submitted: boolean = false;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private deviseService: DeviseService,
        private messageService: MessageService,
    ) {
        this.breadcrumbService.setItems([
            { label: 'Élément de base' },
            { label: 'Devises', routerLink: ['/files/devises'] },
        ]);
    }

    ngOnInit(): void {
        this.initForm();
        this.loadDevises();
    }

    initForm(): void {
        this.formGroup = new FormGroup({
            code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            designation: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            isFiscale: new FormControl(false)
        });
    }

    loadDevises(): void {
        this.loading = true;
        this.deviseService.getDevises().subscribe({
            next: (response) => {
                this.devises = response;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading devises:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les devises',
                    life: 3000
                });
                this.loading = false;
            },
        });
    }

    openDialog(): void {
        this.dialog = true;
        this.formGroup.reset();
        this.formGroup.patchValue({ isFiscale: false });
        this.devise = {};
        this.submitted = false;
    }

    addDevise(): void {
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
        
        const deviseData = {
            code: this.formGroup.get('code')!.value,
            designation: this.formGroup.get('designation')!.value,
            isFiscale: this.formGroup.get('isFiscale')!.value
        };

        this.loading = true;
        
        if (this.devise.id) {
            // Update existing devise
            this.deviseService.updateDevise(this.devise.id, deviseData).subscribe({
                next: () => {
                    this.handleSuccess('Devise modifiée avec succès');
                },
                error: (error) => {
                    this.handleError(error, 'Échec lors de la modification');
                }
            });
        } else {
            // Create new devise
            this.deviseService.createDevise(deviseData).subscribe({
                next: () => {
                    this.handleSuccess('Devise ajoutée avec succès');
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
        this.loadDevises();
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

    editDevise(data: any): void {
        this.devise = { ...data };
        this.formGroup.patchValue({
            code: data.code,
            designation: data.designation,
            isFiscale: data.isFiscale
        });
        this.dialog = true;
        this.submitted = false;
    }

    deleteDevise(data: any): void {
        this.devise = { ...data };
        this.deleteDialog = true;
    }

    annuler(): void {
        this.dialog = false;
        this.submitted = false;
    }

    cancelDelete(): void {
        this.deleteDialog = false;
    }

    confirmDelete(id: any): void {
        if (!id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'ID de devise invalide',
            });
            return;
        }
        
        this.loading = true;
        this.deviseService.deleteDevise(id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Suppression',
                    detail: 'Devise supprimée avec succès',
                    life: 3000
                });
                this.deleteDialog = false;
                this.devise = {};
                this.loadDevises();
            },
            error: (error) => {
                console.error('Error deleting devise:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Échec lors de la suppression',
                });
                this.loading = false;
            },
        });
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