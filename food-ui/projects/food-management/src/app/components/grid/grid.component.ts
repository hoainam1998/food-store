import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  HostBinding,
  Input,
  numberAttribute,
  Signal,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'fm-grid',
  standalone: true,
  imports: [NgClass],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class GridComponent {
  @Input({ required: false, transform: numberAttribute }) lg?: string | number;
  @Input({ required: false, transform: numberAttribute }) md?: string | number;
  @Input({ required: false, transform: numberAttribute }) sx?: string | number;

  rowClasses: Signal<string> = computed(() => {
    return (Object.entries({
      lg: this.lg,
      md: this.md,
      sx: this.sx
    }) as [string, number][])
      .reduce((previous: string, [key, value]: [string, number]) => {
        if (value) {
          if (key === 'lg') {
            return previous += `row-cols-${value} `;
          } else {
            return previous += `row-cols-${key}-${value} `;
          }
        }
        return previous;
    }, '').trim();
  });

  @HostBinding('class')
  value = '';
}
