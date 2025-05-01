
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";




@Injectable({
    providedIn: 'root',
})

export class AdminSidebarService {
    private sidebarOpen = new BehaviorSubject<boolean>(window.innerWidth > 991);
    sidebarOpen$ = this.sidebarOpen.asObservable();

    constructor(){
        window.addEventListener('resize', () => {
            this.checkScreenSize()
        })

        this.checkScreenSize()
    }
    toggleSidebar(){
        this.sidebarOpen.next(!this.sidebarOpen.value)
    }

    private checkScreenSize(){
        const isMobileView = window.innerWidth <= 991;
        this.sidebarOpen.next(!isMobileView);
    }
}
