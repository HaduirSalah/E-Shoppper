import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private _brandsService = inject(BrandsService);
  brands:any[]=[];
  
  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(){
    this._brandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brands=res.data;
        console.log(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
