import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  private _HttpClient = inject(HttpClient);


  getAllProducts(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  getSpecificProduct(productId: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
  }
}
