import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-navigation',
  template: `
    <div class="p-6 pt-2">
      <nav class="space-y-2">
        <div
          *ngFor="let section of sections; let i = index"
          (click)="sectionSelected.emit(section.id)"
          class="flex items-center space-x-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50"
          [class.bg-gray-900]="activeSection === section.id"
          [class.text-white]="activeSection === section.id"
          [class.text-gray-700]="activeSection !== section.id"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium"
            [class.bg-white]="activeSection === section.id"
            [class.text-gray-900]="activeSection === section.id"
            [class.bg-gray-100]="activeSection !== section.id"
            [class.text-gray-600]="activeSection !== section.id"
          >
            {{ i + 1 }}
          </div>

          <div class="flex-1 min-w-0">
            <div class="font-medium text-sm truncate">{{ section.label }}</div>
            <div class="text-xs opacity-75 mt-1">{{ section.label }}</div>
          </div>
        </div>
      </nav>
    </div>
  `,
})
export class SidebarNavigationComponent {
  @Input() sections: any[] = [];
  @Input() activeSection: string = '';
  @Output() sectionSelected = new EventEmitter<string>();
}
