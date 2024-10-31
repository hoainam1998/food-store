/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'fm-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent extends FormGroupDirective {
}
