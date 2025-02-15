import { Component, ElementRef, HostListener, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubCategoriesService } from '../../core/services/sub-categories.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass, AsyncPipe],
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
  private _subCategoriesService = inject(SubCategoriesService);

  categories$: Observable<any[]> = this._categoryService.categories$;
  subCategories: any[] = [];
  openedCategoryId: string | null = null;
  isNavbarOpen = false;
  activeCategory: string | null = null;
  subCategoriesMap: { [categoryId: string]: any[] } = {};

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  ngOnInit(): void {
    // Fetch all categories and their subcategories
    this.categories$.subscribe(categories => {
      categories.forEach(category => {
        this._subCategoriesService.getAllSubCategoriesOnCategory(category._id)
          .subscribe((response: any) => {
            this.subCategoriesMap[category._id] = response.data || [];
          });
      });
    });
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

  getAllSubCategoriesOnCategory(categoryId: string): void {
    if (this.activeCategory === categoryId) {
      this.activeCategory = null; // إغلاق القائمة إذا تم الضغط مرة أخرى
      this.subCategories = [];
    } else {
      this.activeCategory = categoryId;
      this._subCategoriesService.getAllSubCategoriesOnCategory(categoryId)
        .subscribe((response: any) => {
          console.log('SubCategories:', response.data);
          this.subCategories = response.data.length > 0 ? response.data : [];
        });
    }
  }

  hasSubCategories(categoryId: string): boolean {
    return this.subCategoriesMap[categoryId] && this.subCategoriesMap[categoryId].length > 0;
  }

  isActiveCategorySubcategories(categoryId: string): boolean {
    return this.activeCategory === categoryId;
  }
}