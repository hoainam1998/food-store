import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChildren, Input, QueryList, Signal, computed } from '@angular/core';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { TableColumnTemplateDirective } from './directives/table-column-template.directive';

interface HeaderTableProps {
  class?: string;
  style?: Omit<CSSStyleDeclaration, 'width' | 'minWidth' | 'maxWidth'>;
  label?: string;
}

export interface Fields extends HeaderTableProps {
  key: string;
  width?: number | string;
}

@Component({
  selector: 'fm-table',
  standalone: true,
  imports: [PaginationComponent, NgStyle, NgTemplateOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> {
  @Input({ required: true }) fields: Fields[] = [];
  @Input({ required: true }) data: T[] = [];
  @ContentChildren(TableColumnTemplateDirective) columnTemplates?: QueryList<TableColumnTemplateDirective>;

  getTemplate(key: keyof T) {
    return this.columnTemplates?.find(template => template.tableColumnTemplate === key)?.el;
  }

  columnWidth: Signal<CSSStyleDeclaration[]> = computed(() => {
    return this.fields.map(field => {
      const width: string
        = (field.width && Number.isInteger(field.width)) ? `${field.width}px` : field.width as string;
      return {
        minWidth: width,
        maxWidth: width
      } as CSSStyleDeclaration;
    });
  });

  headers: Signal<HeaderTableProps[]> = computed(() => {
    return this.fields.map(field => {
      return {
        class: field.class,
        style: field.style,
        label: field.label ? field.label : field.key
      };
    });
  });

  keys: Signal<(keyof T)[]> = computed(() => {
    return this.fields.map(field => field.key as keyof T);
  });
}
