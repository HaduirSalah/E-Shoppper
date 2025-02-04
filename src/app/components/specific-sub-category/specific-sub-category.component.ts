import { Component, inject, OnInit } from '@angular/core';
import { SubCategoriesService } from '../../core/services/sub-categories.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specific-sub-category',
  imports: [CommonModule],
  templateUrl: './specific-sub-category.component.html',
  styleUrl: './specific-sub-category.component.scss'
})
export class SpecificSubCategoryComponent implements OnInit {
  private readonly _SubCategoriesService = inject(SubCategoriesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  subCategoryId!: string | null;
  specificSubCategory: any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.subCategoryId = params.get('id');
      // console.log('paramId (subscribe):', this.subCategoryId);

      if (this.subCategoryId) {
        this.getSpecificSubCategory(this.subCategoryId);
      }
    });
  }
getSpecificSubCategory(categoryId: string) {
    this._SubCategoriesService.getSpecificSubCategory(categoryId).subscribe({
      next: (res) => {
        this.specificSubCategory = res.data;
        // console.log(res.data);
      },
      error: (err) => {
        // console.log(err);
      }
    })
  }


}
