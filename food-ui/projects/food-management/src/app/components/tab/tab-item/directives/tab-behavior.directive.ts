/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, HostListener, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[tabBehavior]',
  exportAs: 'tabItemDirective',
  standalone: true
})
export class TabBehaviorDirective implements AfterViewInit {

  @Input() tab?: HTMLUListElement;
  @Input() tabBody?: HTMLDivElement;
  private bindingElement?: ElementRef;

  constructor(el: ElementRef) {
    this.bindingElement = el;
  }

  ngAfterViewInit() {
    this.tabBody!.style.width = `${this.tab!.clientWidth || 0}px`;
    this.tabBody!.style.height = `${(this.tab!.clientHeight - this.bindingElement!.nativeElement?.clientHeight)}px`;
  }

  @HostListener('click') onClick(): void {
    if (!this.bindingElement!.nativeElement.classList.contains('tab-active')) {
      for (const tab of Array.from(document.getElementsByClassName('tab-active'))) {
        tab.classList.remove('tab-active');
      }
      this.bindingElement!.nativeElement.classList.add('tab-active');
    }
  }
}
