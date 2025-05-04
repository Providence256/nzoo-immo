import { Injectable } from "@angular/core";
import { TauxChangeApiService } from "../../../../core/api/taux-change-api.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TauxChangeService {
  constructor(private tauxChangeApi: TauxChangeApiService) {}

  getTauxChanges(): Observable<any[]> {
    return this.tauxChangeApi.findAll();
  }

  getTauxChange(id: number): Observable<any> {
    return this.tauxChangeApi.find(id);
  }

  createTauxChange(tauxChange: any): Observable<any> {
    return this.tauxChangeApi.add(tauxChange);
  }

  updateTauxChange(id: number, tauxChange: any): Observable<any> {
    return this.tauxChangeApi.edit(id, tauxChange);
  }

  deleteTauxChange(id: number): Observable<any> {
    return this.tauxChangeApi.deleteTaux(id);
  }

  getDevises(): Observable<any[]> {
    return this.tauxChangeApi.findAllDevises();
  }

  getDeviseReference(): Observable<any> {
    return this.tauxChangeApi.findDeviseReference();
  }
}