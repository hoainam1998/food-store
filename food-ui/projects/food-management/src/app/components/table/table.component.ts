import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Signal,
  TemplateRef,
  computed,
  viewChild,
} from '@angular/core';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { TableColumnTemplateDirective } from './directives/table-column-template.directive';
import {
  SelectComponent,
  IOptions,
} from '@components/form/form-control/select/select.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  imports: [
    PaginationComponent,
    NgTemplateOutlet,
    SelectComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  @Input({ required: true }) fields: Fields[] = [];
  @Input({ required: true }) data: T[] = [];
  @Input({ required: true }) total = 0;
  @Output() pagination = new EventEmitter<{
    pageSize: number;
    pageNumber: number;
  }>();
  @ContentChildren(TableColumnTemplateDirective)
  columnTemplates?: QueryList<TableColumnTemplateDirective>;
  table = viewChild<ElementRef<HTMLElement>>('table');

  pageSizeControl = new FormControl(30);

  options: IOptions[] = [
    {
      value: 10,
      label: '10',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 50,
      label: '50',
    },
  ];

  getTemplate(key: keyof T): TemplateRef<unknown> | undefined {
    return this.columnTemplates?.find(
      (template) => template.tableColumnTemplate === key
    )?.el;
  }

  columnWidth: Signal<CSSStyleDeclaration[]> = computed(() => {
    return this.fields.map((field) => {
      const width: string =
        field.width && Number.isInteger(field.width)
          ? `${field.width}px`
          : (field.width as string);
      return {
        minWidth: width,
        maxWidth: width,
      } as CSSStyleDeclaration;
    });
  });

  headers: Signal<HeaderTableProps[]> = computed(() => {
    return this.fields.map((field) => ({
      class: field.class,
      style: field.style,
      label: field.label ? field.label : field.key,
    }));
  });

  keys: Signal<(keyof T)[]> = computed(() => {
    return this.fields.map((field) => field.key as keyof T);
  });

  pageSizeChange(): void {
    this.pagination.emit({
      pageSize: this.pageSizeControl.value || 10,
      pageNumber: 1,
    });
  }

  pageNumberChange(pageNumber: number): void {
    this.pagination.emit({
      pageNumber,
      pageSize: this.pageSizeControl.value || 10
    });
  }

}
