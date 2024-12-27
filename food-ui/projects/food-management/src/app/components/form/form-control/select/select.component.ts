import { Component, ElementRef, Injector, Input, Renderer2 } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlComponent, CONTROL_TYPE } from '@components/form/form-control/form-control.component';
import { stringTrim } from '@utils/utils';

export interface IOptions {
  value: string | number;
  label: string;
}

@Component({
  selector: 'fm-select',
  standalone: true,
  imports: [FormControlComponent, FormsModule,],
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
  @Input({ transform: stringTrim, required: true }) name = '';
  value?: string | number;

  constructor(render: Renderer2, bindingElement: ElementRef, inj: Injector) {
    super(inj, render, bindingElement, CONTROL_TYPE.SELECT);
  }

  override writeValue(value: string | number): void {
    this.value = value;
  }

  change(event: Event): void {
    this.value = (event.target as HTMLSelectElement).value as string | number;
    this.changeFn!(this.value);
  }
}
