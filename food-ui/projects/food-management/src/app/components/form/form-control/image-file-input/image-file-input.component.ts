import {
  Component,
  ElementRef,
  Injector,
  Input,
  Renderer2,
  viewChild,
  ViewEncapsulation
 } from '@angular/core';
import {
  ImageFileInputBehaviorDirective
} from './directives/image-file-input-behavior/image-file-input-behavior.directive';
import {
  ImageSelectBoxBehaviorDirective
} from './directives/image-select-box-behavior/image-select-box-behavior.directive';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent, CONTROL_TYPE } from '../form-control.component';
import { Utils } from '@utils/utils';

@Component({
  selector: 'fm-image-file-input',
  standalone: true,
  imports: [
    ImageFileInputBehaviorDirective,
    ImageSelectBoxBehaviorDirective,
    FormsModule,
    FormControlComponent,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: ImageFileInputComponent
    }
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './image-file-input.component.html',
  styleUrl: './image-file-input.component.scss'
})
export class ImageFileInputComponent extends FormControlComponent {

  @Input({ required: true }) name?: string;
  imageBoxDirective = viewChild(ImageSelectBoxBehaviorDirective);

  constructor(
    render: Renderer2, bindingElement: ElementRef, inj: Injector) {
    super(inj, render, bindingElement, CONTROL_TYPE.INPUT);
  }

  override writeValue(files: File[]): void {
    if (files) {
      const dataTransferFiles = Utils.convertFileArrayToFileList(files);
      this.imageBoxDirective()!.files.set(dataTransferFiles);
    }
  }

  change(event: Event): void {
    const value = Array.from((event.target! as HTMLInputElement).files || []);
    this.changeFn!(value);
  }
}
