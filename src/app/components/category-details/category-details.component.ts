import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
})
export class CategoryDetailsComponent implements OnInit {
  private _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoryService = inject(CategoryService);
  categoryId!: string | null;
  specificCategory: any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
      console.log('paramId (subscribe):', this.categoryId);
    });

    if(this.categoryId)
    {
      this.getSpecificCategory(this.categoryId);
    }
  }

  getSpecificCategory(categoryId: string) {
    this._CategoryService.getSpecificCategory(categoryId).subscribe({
      next: (res) => {
        this.specificCategory = res.data;
        console.log('data:', res.data);
      },
      error: (error: HttpErrorResponse) => {
        console.error('error:', error);
      },
    });
  }
}
