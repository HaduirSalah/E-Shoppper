import { Component, ElementRef, HostListener, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass,AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @ViewChild('backToTop') backToTop!: ElementRef;
  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.scrollY > 100) {
      this.backToTop.nativeElement.style.display = 'block';
    } else {
      this.backToTop.nativeElement.style.display = 'none';
    }
  }
  private _categoryService = inject(CategoryService);
  categories$: Observable<any[]> = this._categoryService.categories$;
  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  ngOnInit(): void {
    this._categoryService.getAllCategories();
  }

  onClick(event: MouseEvent) {
    const scrollDuration = 2000; // Set duration to 2 seconds (2000ms)
    const startPosition = window.scrollY;
    const startTime = performance.now();
  
    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / scrollDuration, 1);
      
      // Easing Function (Ease-Out for Smooth Effect)
      const easeOut = 1 - Math.pow(1 - progress, 3); 
      window.scrollTo(0, startPosition * (1 - easeOut));
  
      if (elapsedTime < scrollDuration) {
        requestAnimationFrame(animateScroll);
      }
    };
  
    requestAnimationFrame(animateScroll);
  }
  
}