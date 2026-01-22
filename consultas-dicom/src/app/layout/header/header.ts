import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { menuItems } from '@core/utils/menu-items';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();

  showOffcanvas = false;

  menuItems = menuItems;

  toggleOffcanvas(): void {
    this.showOffcanvas = !this.showOffcanvas;
  }

  closeOffcanvas(): void {
    this.showOffcanvas = false;
  }
}
