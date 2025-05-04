import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, viewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AnnoncesService } from "../../../services/annonces.service";
import { MessageService } from "primeng/api";
import { BreadcrumbService } from "../../../../../core/services/breadcrumb.service";



@Component({
    selector: 'app-add-annonce',
    templateUrl: './add-annonce.component.html',
    styleUrl: './add-annonce.component.scss'
})

export class AddAnnonceComponent implements OnInit {

    stepForm!: FormGroup
    totalSteps: number = 6
    currentStep = 1;

    types : any[] = []
    villes: any[] = []
    communes: any[] = []
    devises: any[] = []
    equipements: any[] = []
    rules: any[] = []

    selectedFiles: File[] = [];
    imagePreviews: string[] = [];
    isLoading = false


      equipmentsList = [
        { label: 'Linge de maison', value: 'linge_de_maison' },
        { label: 'Eau chaude', value: 'eau_chaude' },
        { label: 'Climatisation', value: 'climatisation' },
        { label: 'Chauffage', value: 'chauffage' },
        { label: 'Cuisine équipée', value: 'cuisine' },
        { label: 'Réfrigérateur', value: 'refrigerateur' },
        { label: 'Cafetière', value: 'cafetière' },
        { label: 'Vaisselle et couverts', value: 'vaisselle' },
        { label: 'Barbecue', value: 'barbecue' },
        { label: 'Télévision', value: 'television' },
        { label: 'Wi-Fi', value: 'wifi' },
        { label: 'Lave-linge', value: 'lave-linge' },
        { label: 'Fer à repasser', value: 'fer_a_repasser' },
        { label: 'Sèche-cheveux', value: 'seche-cheveux' },
        { label: 'Parking gratuit', value: 'parking' },
        { label: 'Piscine', value: 'piscine' },
        { label: 'Jacuzzi', value: 'jacuzzi' }
      ];

      // rules = [
      //   { id: 1, name: 'Suitable for children (2-12 years)', selected: null },
      //   { id: 2, name: 'Suitable for infants (Under 2 years)', selected: null },
      //   { id: 3, name: 'Suitable for pets', selected: null },
      //   { id: 4, name: 'Smoking allowed', selected: null },
      //   { id: 5, name: 'Events allowed', selected: null }
      // ];
    
      // Liste des équipements sélectionnés
      // selectedEquipments: any[] = [];

    constructor(
        private breadcrumbService: BreadcrumbService,
        private cdRef: ChangeDetectorRef,
        private service: AnnoncesService,
        private fb : FormBuilder,
        private messageService: MessageService,
    ){
        this.breadcrumbService.setItems([
            {label: 'Annonces'},
            {label: 'Ajouter annonce', routerLink:'/admin-annonces/add-annonce'}
        ])
    }
    
    ngOnInit(): void {
        
      this.initForm()
      this.loadData()
       
    }


    initForm():void {
      this.stepForm = this.fb.group({
        step1: this.fb.group({
          type: ['', ],
          nbreVisiteur: ['', [Validators.required, Validators.min(1)]],
          nbreChambre: ['', [Validators.required, Validators.min(0)]],
          nbreDouche: ['', [Validators.required, Validators.min(0)]],
          nbreLit: ['', [Validators.required, Validators.min(0)]],
          equipement: ['', Validators.required],
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
        reduction: ['', [Validators.required, Validators.max(100)]],
        reductionHebdo: ['', [Validators.required, Validators.max(100)]],
        reductionMensu: ['', [Validators.required, Validators.max(100)]],
        fraisMenage: ['', Validators.min(0)],
        fraisPerso: ['', Validators.min(0)],
       }),
       step6: this.fb.group({
        rule: this.fb.array([]),
       }),

      })
    }

    loadData(): void{
      this.service.findAllTypes().subscribe({
        next:(response) => this.types = response
      })
      this.service.findAllEquipements().subscribe({
        next: (response) => this.equipements = response
      })
      this.service.findAllVilles().subscribe({
        next:(response) => this.villes = response
      })
      this.service.findAllCommunes().subscribe({
        next:(response) => this.communes = response
      })

      this.service.findAllDevises().subscribe({
        next:(response) => this.devises = response
      })
      this.service.findAllRules().subscribe({
        next:(response) => {
          this.rules = response
          this.initRulesForm()
        }
      })
    }

    initRulesForm(): void{
      const rulesFormArray = this.fb.array(
        this.rules.map(rule => this.fb.group({
          ruleId: [rule.id],
          isSelected: [false],
        }))
      )
      const formGroup = this.stepForm.get('step6') as FormGroup
      formGroup.setControl('rules', rulesFormArray)
      
    }


    get currentFormGroup() : FormGroup{
      return this.stepForm.get(`step${this.currentStep}`) as FormGroup
    }

    nextStep() {
        
        if(this.currentFormGroup.invalid){
          this.currentFormGroup.markAllAsTouched();
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Veuillez remplir tous les champs',
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


      setRule(rule: any, value: boolean) {
        rule.selected = value
      }

  
    get selectedEquipments(){
      return this.currentFormGroup.get('equipement')?.value || []
    }
      // Supprimer un équipement de la liste sélectionnée
  removeEquipment(equip: any) {
     const current = this.currentFormGroup.get('equipement')?.value || []
     const updated = current.filter((item : any) => item.id !== equip.id)
     this.currentFormGroup.get('equipement')?.setValue(updated)
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
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

  
  submitForm() : void {
    if(this.stepForm.invalid){
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs',
        styleClass: "font-Jost"
      });
      return;
    }
    if(this.selectedFiles.length === 0){
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez ajouter aumoins une photo',
        styleClass: "font-Jost"
      });
      return;
    }
    this.isLoading = true
    const formData = this.prepareFormData();

    this.service.add(formData).subscribe({
      next:() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: "Annonce créée avec succès",
          life: 3000
        });
      },
      error: (err) =>{
        this.isLoading = false,
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err,
          life: 3000
        });
        
      },
      complete:() =>{
        this.isLoading = false
      }
    })
  }

  prepareFormData() : FormData {
    const formData = new FormData()
    const formValues = this.stepForm.value;

    // Step 1
    formData.append('TypeHebergementId', formValues.step1.type.id);
    formData.append('NbreVisiteurs', formValues.step1.nbreVisiteur)
    formData.append('NbreChambres', formValues.step1.nbreChambre)
    formData.append('NbreDouches', formValues.step1.nbreDouche)
    formData.append('NbreLits', formValues.step1.nbreLit)
    formValues.step1.equipement.forEach((eq:any, index:number) =>{
      formData.append(`Equipements[${index}].EquipementId`, eq.id)
    })

    // Step 2
    formData.append('VilleId', formValues.step2.ville.id);
    formData.append('CommuneId', formValues.step2.commune.id);
    formData.append('Quartier', formValues.step2.quartier);
    formData.append('Avenue', formValues.step2.avenue);
    formData.append('NumeroDomicile', formValues.step2.numDomicile);

    // Step 4
    formData.append('Title', formValues.step4.title)
    formData.append('Description', formValues.step4.description)

    // Step 5
    formData.append('DeviseId', formValues.step5.devise.id)
    formData.append('PrixBase', formValues.step5.prixBase)
    formData.append('Reduction', formValues.step5.reduction || '0')
    formData.append('ReductionHebdo', formValues.step5.reuctionHebdo || '0')
    formData.append('ReductionMensu', formValues.step5.reuctionMensu || '0')
    formData.append('FraisMenage', formValues.step5.fraisMenage || '0')
    formData.append('PersoSuppl', formValues.step5.fraisPerso || '0')

    // Step 6
    formValues.step6.rules.forEach((rule: any, index: any) =>{
      formData.append(`Rules[${index}].RuleId`, rule.ruleId)
      formData.append(`Rules[${index}].iselected`, rule.isSelected)
    })

    this.selectedFiles.forEach((file, index) => {
      formData.append(`Photos`, file, file.name)
    })

    return formData

  }
    
}