import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '@components/search/search.component';

@Component({
  selector: 'fm-header',
  standalone: true,
  imports: [SearchComponent, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  search(value: string): void {
    // TODO
    console.log(value);
  }
}
