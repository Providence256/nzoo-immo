import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable()
export class CustomerService {
    constructor(private http: HttpClient){}

    getCustomersSmall() {
        return this.http.get<any>('/data/customers.json')
            .toPromise()
            .then(res => res.data as [])
            .then(data => data);
    }
}

