import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()

export class AdminMenuService {
    private menuService = new Subject<string>();
    private resetSource = new Subject();

    menuService$ = this.menuService.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(key: string) {
        this.menuService.next(key);
    }

    reset() {
        this.resetSource.next(true);
    }   
}