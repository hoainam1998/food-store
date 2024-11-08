import { Directive, ElementRef, HostListener } from '@angular/core';

type ImagePreviewHandleType = (files: File[]) => void;

@Directive({
  selector: '[imageFileInput]',
  standalone: true
})
export class ImageFileInputBehaviorDirective {

  private setImagePreview?: ImagePreviewHandleType;

  set ImagePreviewHandle(handle: ImagePreviewHandleType) {
    this.setImagePreview = handle;
  }

  constructor(public el: ElementRef<HTMLInputElement>) {}

  @HostListener('change') onInput(): void {
    if (this.setImagePreview) {
      this.setImagePreview(Array.from(this.el.nativeElement.files!));
    }
  }
}
