import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="mb-4">
      <h1 class="text-2xl font-semibold text-gray-800">{{ title }}</h1>
      <p *ngIf="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
    </div>
  `
})

export class PageHeaderComponent {
    @Input() title: string = '';
    @Input() subtitle: string = '';
  }