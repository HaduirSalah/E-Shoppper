import { Component,inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [AsyncPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private _CategoryService = inject(CategoryService);
  categories$: Observable<any[]> = this._CategoryService.categories$;

  ngOnInit(): void {
    this._CategoryService.getAllCategories();
  }

  
}
