import { Injectable } from "@angular/core";
import { VilleApiService } from "../../../../core/api/ville-api.service";
import { Observable } from "rxjs";



@Injectable({
    providedIn:'root'
})


export class VilleService {

    constructor(private villeApi: VilleApiService){}



    getVilles(): Observable<any[]>{
        return this.villeApi.findAll()
    }

    getVille(id: number): Observable<any> {
        return this.villeApi.find(id);
      }
    
      createVille(ville: Partial<any>): Observable<any> {
        return this.villeApi.add(ville);
      }
    
      updateVille(id: number, ville: Partial<any>): Observable<any> {
        return this.villeApi.edit(id, ville);
      }
    
      deleteVille(id: number): Observable<any> {
        return this.villeApi.deleteVille(id);
      }
}