import {
  Component,
  ComponentRef,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ToastBehaviorDirective, IToastTemplate } from './directives/toast-behavior.directive';

@Component({
  selector: 'fm-toast',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  @ContentChildren(ToastBehaviorDirective)
  toastContent?: QueryList<ToastBehaviorDirective>;
  @Input() body?: TemplateRef<unknown>;
  @Input() header?: TemplateRef<unknown>;
  @Input() toastInstance?: ComponentRef<this>;

  findContent(name: 'header' | 'body'): TemplateRef<IToastTemplate | undefined> | undefined {
    return this.toastContent?.find(template => template.toastBehavior === name)!.el;
  }

  headerContent = this.findContent('header');
  bodyContent = this.findContent('body');

  closeToast = (): void => {
    this.toastInstance?.destroy();
  };
}
