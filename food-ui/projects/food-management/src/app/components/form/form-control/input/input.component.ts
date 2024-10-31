import {
  Component, ElementRef, Renderer2, EventEmitter, Input, Output, Injector } from '@angular/core';
import {
  ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from '@components/form/form-control/form-control.component';

function stringTrim(value: string): string {
  return value.trim();
};

@Component({
  selector: 'fm-input',
  standalone: true,
  imports: [FormsModule, FormControlComponent, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: InputComponent
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent extends FormControlComponent implements ControlValueAccessor {
  @Input({ transform: stringTrim }) type = 'text';
  @Input({ transform: stringTrim, required: true }) name = '';
  @Input({ required: false, transform: stringTrim }) classes = '';
  @Output() valueChange = new EventEmitter<Event>();

  changeFn?: (value: string) => void;
  blurFn?: (value: Event) => void;

  constructor(private render: Renderer2, private bindingElement: ElementRef, inj: Injector) {
    super(inj);
  }

  setProperty(property: string, value: string | number | boolean): void {
    this.render.setProperty(
      this.bindingElement.nativeElement.querySelector('.input'),
      property,
      value
    );
  }


  writeValue(value: string): void {
    this.setProperty('value', value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.blurFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.setProperty('disabled', isDisabled);
  }

  change(event: Event): void {
    const value = (event.target! as HTMLInputElement).value;
    this.valueChange.emit(event);
    this.changeFn!(value);
  }
}
