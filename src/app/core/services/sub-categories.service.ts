import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor() { }
  private _HttpClient = inject(HttpClient);


  getAllSubCategoriesOnCategory(categoryId: string):Observable<any> {
   return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
  }
  
}
