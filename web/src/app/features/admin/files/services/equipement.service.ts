import { Injectable } from "@angular/core";
import { EquipementApiService } from "../../../../core/api/equipement-api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EquipementService {
    constructor(private equipementApi: EquipementApiService) {}

    getEquipements(): Observable<any[]> {
        return this.equipementApi.findAll();
    }

    getEquipement(id: number): Observable<any> {
        return this.equipementApi.find(id);
    }
    
    createEquipement(equipement: any): Observable<any> {
        return this.equipementApi.add(equipement);
    }
    
    updateEquipement(id: number, equipement: any): Observable<any> {
        return this.equipementApi.edit(id, equipement);
    }
    
    deleteEquipement(id: number): Observable<any> {
        return this.equipementApi.deleteEquipement(id);
    }
}