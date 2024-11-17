import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  computed,
  effect,
  signal,
  AfterContentInit
} from '@angular/core';

export interface IPage  {
  dots: boolean;
  active: boolean;
  page: null | number;
}

const createPage = (page: IPage['page'], dots: IPage['dots'], active: IPage['active']): IPage => {
  return { dots,  page, active };
};

@Directive({
  selector: '[paginationBehavior]',
  standalone: true
})
export class PaginationBehaviorDirective implements AfterContentInit {
  @Input() total?: number;
  @Input() pageSize?: number;
  @Output() retrievePages = new EventEmitter<IPage[]>();
  @Output() accessPage = new EventEmitter<WritableSignal<number>>();

  pageNumber = 21;
  pageActive = signal(1);
  pageList = computed<IPage[]>(() => {
    if (this.pageNumber > 10) {
      let pageSelected = this.pageActive();
      const firstPages = [1, 2, 3];
      const lastPages = [this.pageNumber - 1, this.pageNumber];

      if (firstPages.includes(this.pageActive())) {
        pageSelected = firstPages[firstPages.length - 1] + 1;
      } else if (lastPages.includes(this.pageActive())) {
        pageSelected = lastPages[0] - 1;
      }

      const pageSelects: number[] = [pageSelected];

      const next = (page: number): void => {
        const nextPage = ++page;
        if (!lastPages.includes(nextPage)) {
          pageSelects.push(nextPage);

          const space = lastPages[0] - nextPage;
          if (space <= 2) {
            if (space > 0) {
              next(nextPage);
            }
          } else {
            pageSelects.push(0);
          }
        }
      };

      const previous = (page: number): void => {
        const previousPage = --page;
        if (!firstPages.includes(previousPage)) {
          pageSelects.unshift(previousPage);

          const space = previousPage - firstPages[firstPages.length - 1];
          if (space == 2) {
            previous(previousPage);
          } else if (space > 2) {
            pageSelects.unshift(0);
          }
        }
      };

      next(pageSelected);
      previous(pageSelected);

      if (pageSelects.length < 5) {
        const missingElements = 5 - pageSelects.length;
        if (pageSelects[pageSelects.length - 1] === 0) {
          for (let i = 0; i < missingElements; i++) {
            pageSelects.push((lastPages[0] - (missingElements - i)));
          }
        }
        else if (pageSelects[0] === 0) {
          for (let i = 0; i < missingElements; i++) {
            pageSelects.unshift((firstPages[firstPages.length - 1] + (missingElements - i)));
          }
        }
      }

      return firstPages.concat(pageSelects).concat(lastPages)
        .map(page => createPage(
          page === 0 ? null : page,
          page === 0,
          page == this.pageActive()
        ));
    }

    return [...Array(this.pageNumber)]
      .map((_, index) => createPage(index + 1,false, index + 1 === this.pageActive()));
  });

  constructor(public el: ElementRef) {
    effect(() => {
      this.retrievePages.emit(this.pageList());
    });
  }

  ngAfterContentInit() {
    this.accessPage.emit(this.pageActive);
  }
}
