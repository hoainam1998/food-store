import {
  Directive,
  ContentChild,
  HostListener,
  AfterContentInit,
  ViewContainerRef,
  TemplateRef,
  Input,
  contentChild,
  EventEmitter,
  Output,
  signal,
  effect,
} from '@angular/core';
import {
  ImageFileInputBehaviorDirective
} from '../image-file-input-behavior/image-file-input-behavior.directive';
import { Utils } from '@utils/utils';

@Directive({
  selector: '[imageSelectBox]',
  standalone: true
})
export class ImageSelectBoxBehaviorDirective implements AfterContentInit {

  @Input('imageSelectBox') imagePreview?: TemplateRef<{ file: string, remove: (event: Event) => void}>;
  @Output() fileChanged: EventEmitter<File[]> = new EventEmitter<File[]>;
  @ContentChild(ImageFileInputBehaviorDirective) fileInput?: ImageFileInputBehaviorDirective;
  imagePreviewBox = contentChild('imagePreviewBox', { read: ViewContainerRef });
  files = signal(this.fileInput?.el.nativeElement.files);

  constructor() {
    effect(() => {
      if (this.files()) {
        this.fileInput!.el!.nativeElement!.files = this.files() as FileList;
        this.fileChanged.emit(Array.from(this.files()!));
        this.imagePreviewHandle(Array.from(this.files()!));
      }
    });
  }

  ngAfterContentInit() {
    if (this.fileInput && !this.fileInput!.ImagePreviewHandle) {
      this.fileInput!.ImagePreviewHandle = this.imagePreviewHandle;
    }
  }

  imagePreviewHandle = (files: File[]): void => {
    this.imagePreviewBox()?.clear();
    Array.from(files).forEach(file => {
      this.imagePreviewBox()?.createEmbeddedView(this.imagePreview!, {
        file: URL.createObjectURL(file),
        remove: this.generatorRemoveFileFn(file)
      });
    });
  };

  generatorRemoveFileFn(file: File): (event: Event) => void {
    return (event: Event) => {
      event.stopImmediatePropagation();
      event.stopPropagation();

      const fileList: File[] = Array.from(this.fileInput!.el.nativeElement.files!);
      const index = fileList.findIndex(fileLoop => fileLoop.name === file.name);
      this.imagePreviewBox()?.remove(index);
      fileList.splice(index, 1);
      const dataTransferFiles = Utils.convertFileArrayToFileList(fileList);
      this.files.set(dataTransferFiles);
    };
  }

  @HostListener('click') onOpenFileSelect(): void {
    this.fileInput!.el.nativeElement.click();
  }

  @HostListener('dragover', ['$event']) onDrag(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.files.set(event.dataTransfer!.files);
  }
}
