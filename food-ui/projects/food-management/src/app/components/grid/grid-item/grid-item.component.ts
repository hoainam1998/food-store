import { Component, computed, Signal, HostBinding, AfterContentInit } from '@angular/core';
import { GridComponent } from '../grid.component';

@Component({
  selector: 'fm-grid-item',
  standalone: true,
  imports: [],
  templateUrl: './grid-item.component.html',
  styleUrl: './grid-item.component.scss',
  inputs: ['lg', 'md', 'sx']
})
export class GridItemComponent extends GridComponent implements AfterContentInit {

  columnClasses: Signal<string> = computed(() => {
    return (Object.entries({
      lg: this.lg,
      md: this.md,
      sx: this.sx
    }) as [string, number][])
      .reduce((previous: string, [key, value]: [string, number]) => {
        if (value) {
          if (key === 'lg') {
            return previous += `col-${value} `;
          } else {
            return previous += `col-${key}-${value} `;
          }
        }
        return previous;
    }, '').trim();
  });

  @HostBinding('class')
  override value = '';

  ngAfterContentInit() {
    this.value = this.columnClasses();
  }
}
