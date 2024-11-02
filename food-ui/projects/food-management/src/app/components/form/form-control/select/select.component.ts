import { Component, ElementRef, Injector, Input, Renderer2 } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlComponent, CONTROL_TYPE } from '@components/form/form-control/form-control.component';

export interface IOptions {
  value: string | number;
  label: string;
}

@Component({
  selector: 'fm-select',
  standalone: true,
  imports: [FormControlComponent, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: SelectComponent
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent extends FormControlComponent {
  @Input({ required: true }) options: IOptions[] = [];

  constructor(render: Renderer2, bindingElement: ElementRef, inj: Injector) {
    super(inj, render, bindingElement, CONTROL_TYPE.SELECT);
  }
}
