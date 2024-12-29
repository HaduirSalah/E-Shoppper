import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isNavbarOpen = false; // الحالة الافتراضية للقائمة مغلقة

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen; // عكس الحالة عند النقر
  }

}
