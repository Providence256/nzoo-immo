import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpHeaders } from "@angular/common/http";





@Injectable({
    providedIn: 'root'
})

export class HttpConfigService {
    private readonly _apiUrl: string;

    constructor(){
        this._apiUrl = environment.apiUrl;
    }

    get apiUrl(): string{
        return this._apiUrl
    }

    get headers() : HttpHeaders {
        return new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        })
    }
}