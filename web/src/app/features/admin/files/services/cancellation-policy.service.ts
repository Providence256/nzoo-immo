import { Injectable } from '@angular/core';
import { CancellationPolicyApiService } from '../../../../core/api/cancellation-policy-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CancellationPolicyService {
  constructor(private cancellationPolicyApi: CancellationPolicyApiService) {}

  getCancellationPolicies(): Observable<any[]> {
    return this.cancellationPolicyApi.findAll();
  }

  getCancellationPolicy(id: number): Observable<any> {
    return this.cancellationPolicyApi.find(id);
  }

  createCancellationPolicy(cancellationPolicy: any): Observable<any> {
    return this.cancellationPolicyApi.add(cancellationPolicy);
  }

  updateCancellationPolicy(
    id: number,
    cancellationPolicy: any
  ): Observable<any> {
    return this.cancellationPolicyApi.edit(id, cancellationPolicy);
  }

  deleteCancellationPolicy(id: number): Observable<any> {
    return this.cancellationPolicyApi.deleteCancellationPolicy(id);
  }
}
