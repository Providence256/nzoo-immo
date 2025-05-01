import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { filter, Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { AdminLayoutComponent } from "../admin-layout.component";
import { AdminMenuService } from "../../../services/admin-menu.service";



@Component({
    selector: '[app-admin-sidebaritem]',
    template: `
        <ng-container>
            <a 
            [attr.href]="item.url"
            (click)="itemClick($event)"
            *ngIf="(!item.routerLink || item.items) && item.visible !== false"
            (mouseenter)="onMouseEnter()"
            (keydown.enter)="itemClick($event)"
            [attr.target]="item.target"
            [attr.tabindex]="0"
            >
            <i [ngClass]="item.icon" class="text-[#E4B363] mr-2"></i>
            <span class=" font-Jost">{{item.label}}</span>
            <i [ngClass]="active ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
             class="text-sm transition-all duration-300 ml-3"  *ngIf="item.items"></i>
           
            </a>
            <a
            (click)="itemClick($event)"
            (mouseenter)="onMouseEnter()"
            *ngIf="item.routerLink && !item.items && item.visible !== false"
            [routerLink]="item.routerLink"
            routerLinkActive="active-menuitem-routerlink"
            [routerLinkActiveOptions]="{exact: !item.preventExact}"
            [attr.target]="item.target"
            [attr.tabindex]="0"
            >
            <i [ngClass]="item.icon" class="text-[#E4B363] mr-2" ></i>
            <span class=" font-Jost"> {{item.label}}</span>
            <i [ngClass]="{'pi pi-fw pi-angle-down' : !active, 'pi pi-fw pi-angle-up': active}"  *ngIf="item.items"></i>
            </a>
            <ul
            *ngIf="item.items && active && item.visible !== false"
            [@children]="root ? 
                         (active ? 
                            'visible' : 'hidden' )
                         : (active ? 'visibleAnimated' : 'hiddenAnimated')
                        "
            class="space-y-0 mt-2  overflow-hidden transition-all duration-500 ease-in-out w-full"
            >
            <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
            <li 
             app-admin-sidebaritem 
             [item]="child" 
             [index]="i" 
            [parentKey]="key"
            class="flex items-start p-3 pl-0 ml-0 rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
          >
</li>

            </ng-template>

            </ul>
        </ng-container>
    `,
    host: {
        '[class.active-menuitem]': 'active',
    },
    animations: [
        trigger('children', [
            state(
              'void',
              style({
                height: '0px',
              })
            ),
            state(
              'hiddenAnimated',
              style({
                height: '0px',
              })
            ),
            state(
              'visibleAnimated',
              style({
                height: '*',
              })
            ),
            state(
              'visible',
              style({
                height: '*',
                'z-index': 100,
              })
            ),
            state(
              'hidden',
              style({
                height: '0px',
                'z-index': '*',
              })
            ),
            transition(
                'visibleAnimated => hiddenAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
              ),
              transition(
                'hiddenAnimated => visibleAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
              ),
              transition(
                'void => visibleAnimated, visibleAnimated => void',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
              ),
        ])
    ],
    styleUrl: './admin-sidebar.component.scss'
})

export class AdminSidebarItemComponent implements OnInit, OnDestroy {
    @Input() item: any;

    @Input() index!: number;

    @Input() parentKey!: string; 

    @Input() root!: boolean;

    active = false;
    
    menuSourceSubscription: Subscription
    menuResetSubscription: Subscription

    key!: string;

    constructor(public appMain: AdminLayoutComponent,
         private menuService: AdminMenuService, 
         public router: Router,
         private cd: ChangeDetectorRef,
        ) { 
        this.menuSourceSubscription = this.menuService.menuService$.subscribe((key) => {
            if(this.active && this.key !== key && key.indexOf(this.key) !== 0) {
                this.active = false;
            }
        }
        )
        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        }
        )

        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((params) => {
            if(this.item.routerLink) {
                this.active = this.router.isActive(
                    this.item.routerLink[0], 
                    !this.item.items && !this.item.preventExact
                );
            }
            else{
                this.active = false
            }
        }
        )
    }

    ngOnInit(): void {
        
      if(this.item.routerLink){
        this.active = this.router.isActive(
            this.item.routerLink[0],
            !this.item.items && !this.item.preventExact
          )
      }

      if(this.item.items){
          this.active = !this.active
      }

      this.key = this.parentKey
        ? this.parentKey + '-' + this.index
        : String(this.index);
    }


    itemClick(event: Event) {
        // avoid processing disabled items
        if(this.item.disabled) {
            event.preventDefault();
            return;
        }

        if(this.root) {
            this.appMain.menuHoverActive = !this.appMain.menuHoverActive;
        }

        // notify other items
        this.menuService.onMenuStateChange(this.key);

        // execute command
        if(this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        // toggle active state
        if(this.item.items) {
            this.active = !this.active;
            
        }
        else{
            // activate item
            this.active = true
            
            // hide overlay menus
            if(this.appMain.isMobile()){
                this.appMain.sidebarActive = false;
                this.appMain.menuMobileActive = false;
            }
        }

      
    }

    onMouseEnter(){
        if(this.root && this.appMain.menuHoverActive && this.appMain.isDesktop()) {
            this.menuService.onMenuStateChange(this.key);
            this.active = true;
        }   
    }
   
    

    ngOnDestroy(): void {
       if(this.menuSourceSubscription) {
           this.menuSourceSubscription.unsubscribe();
       }
       if(this.menuResetSubscription) {
           this.menuResetSubscription.unsubscribe();
       }
    }

}