import { Component, OnInit, inject } from '@angular/core';
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
  private _categoryService = inject(CategoryService);
  categories$: Observable<any[]> = this._categoryService.categories$;
  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  ngOnInit(): void {
    this._categoryService.getAllCategories();
  }
}
