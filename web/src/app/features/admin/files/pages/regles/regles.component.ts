import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";
import { ReglesService } from "../../services/regles.service";

@Component({
    selector: 'app-regles',
    templateUrl: './regles.component.html'
})

export class ReglesComponent implements OnInit {
    dialog: boolean = false;
    deleteDialog: boolean = false;
    formGroup!: FormGroup;
    rules: any[] = [];
    rule: any = {};
    loading: boolean = false;
    submitted: boolean = false;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private reglesService: ReglesService,
        private messageService: MessageService,
    ) {
        this.breadcrumbService.setItems([
            {label: 'Élément de base'},
            { label: 'Règles', routerLink: ['/files/rules'] },
        ]);
    }

    ngOnInit(): void {
        this.initForm();
        this.loadRules();
    }

    initForm(): void {
        this.formGroup = new FormGroup({
            libelle: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        });
    }

    loadRules(): void {
        this.loading = true;
        this.reglesService.getRules().subscribe({
            next: (response) => {
                this.rules = response;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading rules:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les règles',
                    life: 3000
                });
                this.loading = false;
            },
        });
    }

    openDialog(): void {
        this.dialog = true;
        this.formGroup.reset();
        this.rule = {};
        this.submitted = false;
    }

    addRule(): void {
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

        const ruleData = {
            libelle: this.formGroup.get('libelle')!.value,
        };

        this.loading = true;
        
        if (this.rule.id) {
            // Update existing rule
            this.reglesService.updateRule(this.rule.id, ruleData).subscribe({
                next: () => {
                    this.handleSuccess('Règle modifiée avec succès');
                },
                error: (error) => {
                    this.handleError(error, 'Échec lors de la modification');
                }
            });
        } else {
            // Create new rule
            this.reglesService.createRule(ruleData).subscribe({
                next: () => {
                    this.handleSuccess('Règle ajoutée avec succès');
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
        this.loadRules();
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

    editRule(data: any): void {
        this.rule = { ...data };
        this.formGroup.patchValue({
            libelle: data.libelle,
        });
        this.dialog = true;
        this.submitted = false;
    }

    deleteRule(data: any): void {
        this.rule = { ...data };
        this.deleteDialog = true;
    }

    confirmDelete(id: any): void {
        if (!id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'ID de règle invalide',
            });
            return;
        }
        
        this.loading = true;
        this.reglesService.deleteRule(id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Suppression',
                    detail: 'Règle supprimée avec succès',
                    life: 3000
                });
                this.deleteDialog = false;
                this.rule = {};
                this.loadRules();
            },
            error: (error) => {
                console.error('Error deleting rule:', error);
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