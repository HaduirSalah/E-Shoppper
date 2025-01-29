import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from "../carousel/carousel.component";

declare var $: any; // This will resolve the type error

@Component({
  selector: 'app-home',
  imports: [CarouselModule, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() { }

}
