import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands-details',
  imports: [CommonModule],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit {
  private _brandsService = inject(BrandsService);
  private _ActivatedRoute = inject(ActivatedRoute);

  brandId!: string | null;
  specificBrand: any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.brandId = params.get('id');
      console.log('paramId (subscribe):', this.brandId);

      if (this.brandId) {
        this.getSpecificBrand(this.brandId);
      }
    });


  }

  getSpecificBrand(id: string) {
    this._brandsService.getSpecificBrand(id).subscribe({
      next: (res) => {
        this.specificBrand = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
