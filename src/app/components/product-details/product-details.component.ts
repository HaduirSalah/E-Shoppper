import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;

  productId: string | null = null;
  specificProduct: any;
  currentSlide: number = 0;
  slides: string[] = [];


  constructor() { }

  private _ProductService = inject(ProductService);
  private _ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      // console.log('paramId (subscribe):', this.productId);

      if (this.productId) {
        this.getSpecificProduct(this.productId);
      }
    });

    this.autoSlide();

  }

  getSpecificProduct(productId: string) {
    this._ProductService.getSpecificProduct(productId).subscribe({
      next: (res) => {
        // console.log('getSpecificProduct', res.data.images);
        this.specificProduct = res.data;
        this.slides = res.data.images;
        this.currentSlide = 0;  // Reset to first slide when new product loads
      },
      error: (err: HttpErrorResponse) => {
        // console.log(err);
      }
    });
  }

  prev() {
    if (this.slides.length === 0) return;
    this.currentSlide = this.currentSlide > 0
      ? this.currentSlide - 1
      : this.slides.length - 1;
  }

  next() {
    if (this.slides.length === 0) return;
    this.currentSlide = this.currentSlide < this.slides.length - 1
      ? this.currentSlide + 1
      : 0;
  }

 
  private updateCarousel() {
    const carouselInner = this.carousel.nativeElement.querySelector('.carousel-inner');
    const slides = carouselInner.querySelectorAll('.carousel-item');
    
    slides.forEach((slide: HTMLElement, index: number) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });
  }

  autoSlide() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
    }, 5000);
  }

 

}
