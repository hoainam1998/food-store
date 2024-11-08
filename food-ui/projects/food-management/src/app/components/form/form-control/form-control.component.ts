import {
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Injector,
  Input,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export enum CONTROL_TYPE {
  INPUT = 'input',
  SELECT = 'select',
}

export const CONTROL_TYPE_ENUM_TOKEN = new InjectionToken<CONTROL_TYPE>('control type enum');

@Component({
  selector: 'fm-form-control',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: CONTROL_TYPE_ENUM_TOKEN,
      useValue: CONTROL_TYPE
    }
  ],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss'
})
export class FormControlComponent implements ControlValueAccessor {
  @Input({ required: false }) label = '';
  @Input() className = '';
  @Input() fieldClass = '';
  changeFn?: (value: string | number | File[]) => void;
  blurFn?: (value: Event) => void;

  constructor(
    private inj: Injector,
    protected render: Renderer2,
    protected bindingElement: ElementRef,
    @Inject(CONTROL_TYPE_ENUM_TOKEN) protected controlType: CONTROL_TYPE
  ) {}

  setProperty(property: string, value: string | number | boolean | File[] | FileList): void {
    this.render.setProperty(
      this.bindingElement.nativeElement.querySelector(this.controlType),
      property,
      value
    );
  }

  writeValue(value: string | number | File[] | FileList): void {
    this.setProperty('value', value);
  }

  registerOnChange(fn: (value: string | number | File[]) => void): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.blurFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.setProperty('disabled', isDisabled);
  }

  get control() {
    return this.inj.get(NgControl);
  }

  protected get haveError() {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get haveRequireError() {
    return this.control.hasError('required');
  }
}
