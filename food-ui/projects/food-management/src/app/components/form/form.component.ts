import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  TemplateRef
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@components/form/form-control/input/input.component';
import { ImageFileInputComponent } from './form-control/image-file-input/image-file-input.component';
import { ButtonComponent } from '@components/button/button.component';
import { FormControlBase } from 'app/services/form-control-service/form-control-base';
import { FormTemplateDirective, IFormTemplateProps } from './directive/form-template.directive';
import { NgTemplateOutlet } from '@angular/common';
import { GridComponent } from '@components/grid/grid.component';
import { GridItemComponent } from '@components/grid/grid-item/grid-item.component';
import { FormControlService } from 'app/services/form-control-service/form-control-service.service';

@Component({
  selector: 'fm-form',
  standalone: true,
  imports: [
    GridComponent,
    GridItemComponent,
    InputComponent,
    ImageFileInputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    NgTemplateOutlet,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input({ required: true }) form?: FormGroup;
  @Input({ required: true }) forms?: FormControlBase<unknown>[];
  @Output() formSubmit: EventEmitter<FormData> = new EventEmitter<FormData>();
  @ContentChildren(FormTemplateDirective) formTemplate?: QueryList<FormTemplateDirective>;

  constructor(private formService: FormControlService) {}

  onSubmit(event: Event): void {
    this.formSubmit?.emit(new FormData(event.target as HTMLFormElement));
  }

  getFormTemplate(key: string): TemplateRef<IFormTemplateProps> | undefined {
    const formTemplateDirective: FormTemplateDirective | undefined
      = this.formTemplate?.find(form => form.formTemplate === key);
    return formTemplateDirective ? formTemplateDirective.el : undefined;
  }

  getControlName(key: string): FormControl {
    return this.formService.getControl.call(this.form, key);
  }
}
