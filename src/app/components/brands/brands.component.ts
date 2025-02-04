import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  private _brandsService = inject(BrandsService);

  
  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(){
    this._brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
