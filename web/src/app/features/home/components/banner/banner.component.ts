import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms cubic-bezier(0.16, 1, 0.3, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class BannerComponent {
  @ViewChild('videoContainer') videoContainer!: ElementRef;
  parallaxScale = 0;

  ngAfterViewInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.videoContainer) {
      const rect = this.videoContainer.nativeElement.getBoundingClientRect();
      this.parallaxScale = Math.max(0, 1 - (rect.top / window.innerHeight));
    }
  }

  scrollToContent() {
    const element = document.getElementById('next-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}