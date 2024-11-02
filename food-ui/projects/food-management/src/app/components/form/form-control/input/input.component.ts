import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  Renderer2,
  EventEmitter,
  Input,
  Output,
  Injector,
} from '@angular/core';

import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';

import { FormControlComponent, CONTROL_TYPE } from '@components/form/form-control/form-control.component';

function stringTrim(value: string): string {
  return value.trim();
};

@Component({
  selector: 'fm-input',
  standalone: true,
  imports: [FormsModule, FormControlComponent, ReactiveFormsModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: InputComponent
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent extends FormControlComponent{
  @Input({ transform: stringTrim }) type = 'text';
  @Input({ transform: stringTrim, required: true }) name = '';
  @Input({ required: false, transform: stringTrim }) classes = '';
  @Output() valueChange = new EventEmitter<Event>();

  constructor(
    render: Renderer2, bindingElement: ElementRef, inj: Injector) {
    super(inj, render, bindingElement, CONTROL_TYPE.INPUT);
  }

  change(event: Event): void {
    const value = (event.target! as HTMLInputElement).value;
    this.valueChange.emit(event);
    this.changeFn!(value);
  }
}
