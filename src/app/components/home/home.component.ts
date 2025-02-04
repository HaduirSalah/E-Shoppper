import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from "../carousel/carousel.component";
import { Observable } from 'rxjs';
import { CategoryService } from '../../core/services/category.service';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../core/services/product.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CarouselModule, CarouselComponent,AsyncPipe,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private _categoryService = inject(CategoryService);
  private _ProductService = inject(ProductService);

  categories$: Observable<any[]> = this._categoryService.categories$;
  products: any[] = [];
  constructor() { }
  ngOnInit(): void {
    this._categoryService.getAllCategories();
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        // console.log('getAllProducts',res.data);
        this.products = res.data;
      },
      error: (err: HttpErrorResponse) => {
        // console.log(err);
      }
    })
  }
}
