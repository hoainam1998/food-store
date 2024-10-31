import { Component, Injector, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'fm-form-control',
  standalone: true,
  imports: [],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss'
})
export class FormControlComponent {
  @Input({ required: false }) label = '';

  constructor(private inj: Injector) {}

  get control() {
    return this.inj.get(NgControl);
  }

  get haveError() {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get haveRequireError() {
    return this.control.hasError('required');
  }
}
