import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CarouselModule, CarouselComponent as OwlCarousel } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  currentSlide = 0;

  slides = [
    { 
      id: '1', 
      image: 'blog-img-1.jpeg', 
      offer: '10% Off Your First Order', 
      title: 'Best Offers on All Products' 
    },
    { 
      id: '2', 
      image: 'blog-img-2.jpeg', 
      offer: '10% Off Your First Order', 
      title: 'Reasonable Price'  
    }
  ];

  ngAfterViewInit() {
    // Initial setup if needed
  }

  prev() {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slides.length - 1;
    this.updateCarousel();
  }

  next() {
    this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
    this.updateCarousel();
  }

  private updateCarousel() {
    const carouselInner = this.carousel.nativeElement.querySelector('.carousel-inner');
    const slides = carouselInner.querySelectorAll('.carousel-item');
    
    slides.forEach((slide: HTMLElement, index: number) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });
  }
  // @ViewChild('owlCarousel') carousel!: OwlCarousel;
  
  // currentSlide: number = 0;

  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   nav: false, // Disable default nav
  //   navText: ['', ''], // Remove default nav text
  //   responsive: {
  //     0: { items: 1 },
  //     400: { items: 1 },
  //     740: { items: 1 },
  //     940: { items: 1 }
  //   }
  // };

  // carouselItems = [
  //   { 
  //     id: '1', 
  //     image: './public/blog-img-1.jpeg', 
  //     offer: '10% Off Your First Order', 
  //     title: 'Fashionable Dress' 
  //   },
  //   { 
  //     id: '2', 
  //     image: './public/blog-img-2.jpeg', 
  //     offer: '10% Off Your First Order', 
  //     title: 'Reasonable Price' 
  //   }
  // ];



  // prev() {
  //   if (this.carousel) {
  //     this.carousel.prev();
  //     this.updateCurrentSlide(-1);
  //   }
  // }

  // next() {
  //   if (this.carousel) {
  //     this.carousel.next();
  //     this.updateCurrentSlide(1);
  //   }
  // }

  // private updateCurrentSlide(direction: number) {
  //   const totalSlides = this.carouselItems.length;
  //   this.currentSlide = (this.currentSlide + direction + totalSlides) % totalSlides;
  // }
}
