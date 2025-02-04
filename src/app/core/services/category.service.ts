import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _HttpClient=inject(HttpClient);
  private categoriesSubject = new BehaviorSubject<any[]>([]);
  categories$ = this.categoriesSubject.asObservable(); // ملاحظة: $ تعني أن هذه بيانات قابلة للمراقبة (Observable)

  constructor() {
    this.getAllCategories();
   }

  getAllCategories() {
    this._HttpClient.get<{ data: any[] }>('https://ecommerce.routemisr.com/api/v1/categories').subscribe({
      next: (res) => {
        this.categoriesSubject.next(res.data); // تحديث البيانات في BehaviorSubject
      },
      error: (err) => {
        // console.error(err);
      }
    });
  }
}