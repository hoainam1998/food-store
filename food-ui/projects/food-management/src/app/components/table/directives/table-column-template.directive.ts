import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableColumnTemplate]',
  standalone: true
})
export class TableColumnTemplateDirective {

  @Input({ required: true }) tableColumnTemplate?: string;
  constructor(public el: TemplateRef<unknown>) { }
}
