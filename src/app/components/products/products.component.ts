import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor() { }
  products: any[] = [];

  private _ProductService = inject(ProductService);

  ngOnInit(): void {
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
