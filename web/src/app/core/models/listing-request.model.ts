export interface ListingRequest {
  typeHebergementId: number;
  sousTypeHebergementId: number;
  nbreVisiteurs: number;
  nbreChambres: number;
  nbreLits: number;
  title: string;
  description: string;
  whoElseOnSite?: string;
  villeId: number;
  communeId: number;
  quartier: string;
  avenue: string;
  numeroDomicile: string;
  deviseId: number;
  prixBase: number;
  equipements: ListingEquipementRequest[];
  photos: File[];
  bathroomTypes?: ListingBathroomTypeRequest[];
  discountsIds?: number[];
}

export interface ListingEquipementRequest {
  equipementId: number;
}

export interface ListingBathroomTypeRequest {
  bathroomTypeId: number;
  count: number;
}

export interface ListingRuleRequest {
  ruleId: number;
  value?: string;
}
