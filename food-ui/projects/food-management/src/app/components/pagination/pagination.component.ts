import { Component, HostListener, Input, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { PaginationBehaviorDirective, IPage } from './directives/pagination-behavior.directive';

@Component({
  selector: 'fm-pagination',
  standalone: true,
  imports: [ButtonComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{
    directive: PaginationBehaviorDirective,
    inputs: ['pageSize', 'total'],
    outputs: ['retrievePages', 'accessPage']
  }],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() total?: number;
  @Input() pageSize?: number;
  pages: IPage[] = [];
  page?: WritableSignal<number>;

  @HostListener('retrievePages', ['$event']) onGetPages(pages: IPage[]) {
    this.pages = pages;
  }

  @HostListener('accessPage', ['$event']) onAccessPage(page: WritableSignal<number>) {
    this.page = page;
  }

  pageClick(page: number): void {
    this.page!.set(page);
  }

  next(): void {
    if (this.page!() < this.pages.length) {
      this.page!.update(currentPage => currentPage + 1);
    }
  }

  previous(): void {
    if (this.page!() > 0 ) {
      this.page!.update(currentPage => currentPage - 1);
    }
  }

  head(): void {
    this.pageClick(1);
  }

  tail(): void {
    this.pageClick(this.pages[this.pages.length - 1].page as number);
  }
}
