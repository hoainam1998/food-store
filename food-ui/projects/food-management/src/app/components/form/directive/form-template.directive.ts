import { Directive, Input, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface IFormTemplateProps {
  control: FormControl
}

@Directive({
  selector: '[formTemplate]',
  standalone: true
})
export class FormTemplateDirective {

  @Input() formTemplate?: string;

  constructor(public el: TemplateRef<IFormTemplateProps>) {}

}
