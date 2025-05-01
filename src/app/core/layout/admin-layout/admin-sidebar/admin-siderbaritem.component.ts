import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { filter, Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { AdminLayoutComponent } from "../admin-layout.component";
import { AdminMenuService } from "../../../services/admin-menu.service";

@Component({
    selector: '[app-admin-sidebaritem]',
    template: `
      <div class="relative">
        <!-- Menu Item Link -->
        <a 
          *ngIf="(!item.routerLink || item.items) && item.visible !== false"
          [attr.href]="item.url"
          (click)="itemClick($event)"
          [attr.target]="item.target"
          [attr.tabindex]="0"
          class="flex items-center px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors group cursor-pointer"
          [class.bg-slate-700]="active"
        >
          <i [ngClass]="item.icon" class="text-amber-400 mr-3 text-lg"></i>
          <span class="flex-1 font-Jost">{{item.label}}</span>
          <i 
            *ngIf="item.items" 
            [ngClass]="active ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
            class="text-sm transition-transform duration-300"
          ></i>
        </a>

        <!-- Menu Item with Router Link -->
        <a
          *ngIf="item.routerLink && !item.items && item.visible !== false"
          [routerLink]="item.routerLink"
          routerLinkActive="bg-slate-700 text-white"
          [routerLinkActiveOptions]="{exact: !item.preventExact}"
          (click)="itemClick($event)"
          [attr.target]="item.target"
          [attr.tabindex]="0"
          class="flex items-center px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors group cursor-pointer"
        >
          <i [ngClass]="item.icon" class="text-amber-400 mr-3 text-lg"></i>
          <span class="flex-1 font-Jost">{{item.label}}</span>
        </a>

        <!-- Submenu Items -->
        <div
          *ngIf="item.items && item.visible !== false"
          [@submenu]="active ? 'visible' : 'hidden'"
          class="pl-4 overflow-hidden"
        >
          <ul class="space-y-1 mt-1">
            <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
              <li 
                app-admin-sidebaritem 
                [item]="child" 
                [index]="i" 
                [parentKey]="key"
                class="rounded-md overflow-hidden"
              ></li>
            </ng-template>
          </ul>
        </div>
      </div>
    `,
    animations: [
      trigger('submenu', [
        state('hidden', style({
          height: '0',
          opacity: 0
        })),
        state('visible', style({
          height: '*',
          opacity: 1
        })),
        transition('visible <=> hidden', [
          animate('300ms cubic-bezier(0.86, 0, 0.07, 1)')
        ])
      ])
    ]
})
export class AdminSidebarItemComponent implements OnInit, OnDestroy {
    @Input() item: any;
    @Input() index!: number;
    @Input() parentKey!: string; 
    @Input() root!: boolean;

    active = false;
    key!: string;
    
    menuSourceSubscription: Subscription;
    menuResetSubscription: Subscription;
    routerSubscription: Subscription;

    constructor(
      public appMain: AdminLayoutComponent,
      private menuService: AdminMenuService, 
      public router: Router,
      private cd: ChangeDetectorRef
    ) { 
      this.menuSourceSubscription = this.menuService.menuService$.subscribe((key) => {
        // Deactivate if another menu is activated and not a child
        if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
          this.active = false;
          this.cd.markForCheck();
        }
      });
        
      this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
        this.active = false;
        this.cd.markForCheck();
      });

      this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
          }
        });
    }

    ngOnInit(): void {
      // Generate unique key for this menu item
      this.key = this.parentKey ? `${this.parentKey}-${this.index}` : `${this.index}`;
      
      // Initialize active state based on current route
      if (this.item.routerLink) {
        this.updateActiveStateFromRoute();
      }
    }

    updateActiveStateFromRoute(): void {
      this.active = this.router.isActive(
        this.item.routerLink[0],
        !this.item.items && !this.item.preventExact
      );
    }

    itemClick(event: Event): void {
      // Prevent action on disabled items
      if (this.item.disabled) {
        event.preventDefault();
        return;
      }

      // Notify menu service about state change
      this.menuService.onMenuStateChange(this.key);

      // Execute command if defined
      if (this.item.command) {
        this.item.command({ originalEvent: event, item: this.item });
      }

      // Toggle submenu or activate item
      if (this.item.items) {
        this.active = !this.active;
      } else {
        // Hide mobile menu when clicking on a leaf item
        if (this.appMain.isMobile()) {
          this.appMain.menuMobileActive = false;
        }
      }
    }

    ngOnDestroy(): void {
      if (this.menuSourceSubscription) {
        this.menuSourceSubscription.unsubscribe();
      }
      if (this.menuResetSubscription) {
        this.menuResetSubscription.unsubscribe();
      }
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
    }
}