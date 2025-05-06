import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";
import { Router } from "@angular/router";
import { AnnoncesService } from "../../services/annonces.service";

@Component({
    selector: 'app-add-annonce',
    templateUrl: './add-annonce.component.html',
    styleUrl: './add-annonce.component.scss'
})

export class AddAnnonceComponent implements OnInit {
    stepForm!: FormGroup;
    totalSteps: number = 6;
    currentStep = 1;

    types: any[] = [];
    villes: any[] = [];
    communes: any[] = [];
    devises: any[] = [];
    equipements: any[] = [];
    rules: any[] = [];

    selectedFiles: File[] = [];
    imagePreviews: string[] = [];
    isLoading = false;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private service: AnnoncesService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router
    ) {
        this.breadcrumbService.setItems([
            {label: 'Annonces'},
            {label: 'Ajouter annonce', routerLink:'/admin-annonces/add-annonce'}
        ]);
    }
    
    ngOnInit(): void {
        this.initForm();
        this.loadData();
    }

    initForm(): void {
      this.stepForm = this.fb.group({
        step1: this.fb.group({
          type: ['', Validators.required],
          nbreVisiteur: ['', [Validators.required, Validators.min(1)]],
          nbreChambre: ['', [Validators.required, Validators.min(0)]],
          nbreDouche: ['', [Validators.required, Validators.min(0)]],
          nbreLit: ['', [Validators.required, Validators.min(0)]],
          equipement: [[], Validators.required],
        }),
        step2: this.fb.group({
          ville: ['', Validators.required],
          commune: ['', Validators.required],
          quartier: ['', Validators.required],
          avenue: ['', Validators.required],
          numDomicile: ['', Validators.required],
        }),
        step3: this.fb.group({}),
        step4: this.fb.group({
          title: ['', [Validators.required, Validators.minLength(20)]],
          description: ['', [Validators.required, Validators.minLength(50)]],
        }),
        step5: this.fb.group({
          devise: ['', Validators.required],
          prixBase: ['', [Validators.required, Validators.min(0)]],
          reduction: ['0', [Validators.required, Validators.max(100)]],
          reductionHebdo: ['0', [Validators.required, Validators.max(100)]],
          reductionMensu: ['0', [Validators.required, Validators.max(100)]],
          fraisMenage: ['0', Validators.min(0)],
          fraisPerso: ['0', Validators.min(0)],
        }),
        step6: this.fb.group({
          rules: this.fb.array([]),
        }),
      });
    }

    loadData(): void {
      this.service.findAllTypes().subscribe({
        next: (response) => this.types = response,
        error: (err) => this.handleError(err)
      });

      this.service.findAllEquipements().subscribe({
        next: (response) => this.equipements = response,
        error: (err) => this.handleError(err)
      });

      this.service.findAllVilles().subscribe({
        next: (response) => this.villes = response,
        error: (err) => this.handleError(err)
      });

      this.service.findAllCommunes().subscribe({
        next: (response) => this.communes = response,
        error: (err) => this.handleError(err)
      });

      this.service.findAllDevises().subscribe({
        next: (response) => this.devises = response,
        error: (err) => this.handleError(err)
      });

      this.service.findAllRules().subscribe({
        next: (response) => {
          this.rules = response;
          this.initRulesForm();
        },
        error: (err) => this.handleError(err)
      });
    }

    handleError(error: any): void {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Une erreur est survenue lors du chargement des données',
        life: 3000
      });
      console.error(error);
    }

    initRulesForm(): void {
      const rulesFormArray = this.fb.array(
        this.rules.map(rule => this.fb.group({
          ruleId: [rule.id],
          isSelected: [false],
        }))
      );
      const formGroup = this.stepForm.get('step6') as FormGroup;
      formGroup.setControl('rules', rulesFormArray);
    }

    get currentFormGroup(): FormGroup {
      return this.stepForm.get(`step${this.currentStep}`) as FormGroup;
    }

    nextStep() {
      if (this.currentStep === 3 && this.selectedFiles.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Attention',
          detail: 'Veuillez ajouter au moins une photo',
          styleClass: "font-Jost"
        });
        return;
      }
        
      if (this.currentFormGroup.invalid && this.currentStep !== 3) {
        this.currentFormGroup.markAllAsTouched();
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Veuillez remplir tous les champs obligatoires',
          styleClass: "font-Jost"
        });
        return;
      }
      
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    }
    
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    }

    get selectedEquipments() {
      return this.stepForm.get('step1')?.get('equipement')?.value || [];
    }

    // Supprimer un équipement de la liste sélectionnée
    removeEquipment(equip: any) {
      const current = this.stepForm.get('step1')?.get('equipement')?.value || [];
      const updated = current.filter((item: any) => item.id !== equip.id);
      this.stepForm.get('step1')?.get('equipement')?.setValue(updated);
    }

    onFileSelected(event: any) {
      const files = event.target.files;
      if (files) {
        for (let file of files) {
          // Vérifier si le fichier est une image
          if (!file.type.startsWith('image/')) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Le fichier sélectionné n\'est pas une image',
              styleClass: "font-Jost"
            });
            continue;
          }
          
          this.selectedFiles.push(file);
          
          // Lecture du fichier et création d'une prévisualisation
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePreviews.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }

    // Supprimer une image de la liste
    removeImage(index: number) {
      this.selectedFiles.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    }
  
    submitForm(): void {
      if (this.stepForm.invalid) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Veuillez remplir tous les champs obligatoires',
          styleClass: "font-Jost"
        });
        return;
      }
      
      if (this.selectedFiles.length === 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Veuillez ajouter au moins une photo',
          styleClass: "font-Jost"
        });
        return;
      }
      
      this.isLoading = true;
      const formData = this.prepareFormData();

      this.service.add(formData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: "Annonce créée avec succès",
            life: 3000
          });
          // Redirection vers la liste des annonces après un bref délai
          setTimeout(() => {
            this.router.navigate(['/admin-annonces/list']);
          }, 2000);
        },
        error: (err) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: err.message || "Une erreur est survenue lors de la création de l'annonce",
            life: 3000
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }

    prepareFormData(): FormData {
      const formData = new FormData();
      const formValues = this.stepForm.value;

      // Step 1
      formData.append('TypeHebergementId', formValues.step1.type.id);
      formData.append('NbreVisiteurs', formValues.step1.nbreVisiteur);
      formData.append('NbreChambres', formValues.step1.nbreChambre);
      formData.append('NbreDouches', formValues.step1.nbreDouche);
      formData.append('NbreLits', formValues.step1.nbreLit);
      
      formValues.step1.equipement.forEach((eq: any, index: number) => {
        formData.append(`Equipements[${index}].EquipementId`, eq.id);
      });

      // Step 2
      formData.append('VilleId', formValues.step2.ville.id);
      formData.append('CommuneId', formValues.step2.commune.id);
      formData.append('Quartier', formValues.step2.quartier);
      formData.append('Avenue', formValues.step2.avenue);
      formData.append('NumeroDomicile', formValues.step2.numDomicile);

      // Step 4
      formData.append('Title', formValues.step4.title);
      formData.append('Description', formValues.step4.description);

      // Step 5
      formData.append('DeviseId', formValues.step5.devise.id);
      formData.append('PrixBase', formValues.step5.prixBase);
      formData.append('Reduction', formValues.step5.reduction || '0');
      formData.append('ReductionHebdo', formValues.step5.reductionHebdo || '0');
      formData.append('ReductionMensu', formValues.step5.reductionMensu || '0');
      formData.append('FraisMenage', formValues.step5.fraisMenage || '0');
      formData.append('PersoSuppl', formValues.step5.fraisPerso || '0');

      // Step 6
      const rules = formValues.step6.rules;
      if (rules && Array.isArray(rules)) {
        rules.forEach((rule: any, index: number) => {
          formData.append(`Rules[${index}].RuleId`, rule.ruleId);
          formData.append(`Rules[${index}].IsSelected`, rule.isSelected);
        });
      }

      // Photos
      this.selectedFiles.forEach((file: File) => {
        formData.append('Photos', file, file.name);
      });

      return formData;
    }
}