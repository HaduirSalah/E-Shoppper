import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brands-details',
  imports: [],
  templateUrl: './brands-details.component.html',
  styleUrl: './brands-details.component.scss'
})
export class BrandsDetailsComponent implements OnInit{
 brandId!: string | null;

  private _brandsService = inject(BrandsService);
  private _ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.brandId = params.get('id');
      console.log('paramId (subscribe):', this.brandId);

      if (this.brandId) {
        this.getSpecificBrand(this.brandId);
      }
    });


  }

  getSpecificBrand(id:string){
    this._brandsService.getSpecificBrand(id).subscribe({
      next:(res)=>{
        console.log(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
