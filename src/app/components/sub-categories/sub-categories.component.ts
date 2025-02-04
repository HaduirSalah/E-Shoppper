import { Component, inject } from '@angular/core';
import { SubCategoriesService } from '../../core/services/sub-categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent {
  private readonly _SubCategoriesService = inject(SubCategoriesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  categoryId!: string | null;
  subCategories:any[]=[];
  constructor() { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');

      if (this.categoryId) {
        this.getAllSubCategoriesOnCategory(this.categoryId);
      } else {
        // Fetch all sub-categories if no category ID is present
        this.getAllSubCategories();
      }
    });
  }

  getAllSubCategoriesOnCategory(categoryId: string) {
    this._SubCategoriesService.getAllSubCategoriesOnCategory(categoryId).subscribe({
      next: (res) => {
        this.subCategories = res.data;
      },
      error: (err) => {
        console.error('Error fetching sub-categories on category:', err);
      }
    })
  }

  getAllSubCategories() {
    this._SubCategoriesService.getAllSubCategories().subscribe({
      next: (res) => {
        this.subCategories = res.data;
      },
      error: (err) => {
        console.error('Error fetching sub-categories:', err);
      }
    });
  }
}
