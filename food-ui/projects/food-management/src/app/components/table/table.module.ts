import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, Fields } from './table.component';
import { TableColumnTemplateDirective } from './directives/table-column-template.directive';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableComponent,
    TableColumnTemplateDirective,
  ],
  exports: [TableComponent, TableColumnTemplateDirective],
  bootstrap: []
})
export class TableModule { }
export type {  Fields };
