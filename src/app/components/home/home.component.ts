import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from "../carousel/carousel.component";
import { Observable } from 'rxjs';
import { CategoryService } from '../../core/services/category.service';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../core/services/product.service';
import { RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from "../categories/categories.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, CarouselComponent, RouterLink, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  private _categoryService = inject(CategoryService);
  private _ProductService = inject(ProductService);

  categories$: Observable<any[]> = this._categoryService.categories$;
  products: any[] = [];
  vendors = [
    { id: 1, name: 'Vendor 1', image: './images/vendor-1.jpg' },
    { id: 2, name: 'Vendor 2', image: './images/vendor-2.jpg' },
    { id: 3, name: 'Vendor 3', image: './images/vendor-3.jpg' },
    { id: 4, name: 'Vendor 4', image: './images/vendor-4.jpg' },
    { id: 5, name: 'Vendor 5', image: './images/vendor-5.jpg' },
    { id: 6, name: 'Vendor 6', image: './images/vendor-6.jpg' },
    { id: 7, name: 'Vendor 7', image: './images/vendor-7.jpg' },
    { id: 8, name: 'Vendor 8', image: './images/vendor-8.jpg' }
  ];

  vendorCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 30,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 6 } 
    },
    nav: false
  };
  
  

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
