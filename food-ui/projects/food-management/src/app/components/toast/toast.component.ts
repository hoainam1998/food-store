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
  @Input({ required: false }) body?: TemplateRef<unknown>;
  @Input({ required: false }) header?: TemplateRef<unknown>;
  @Input({ required: true }) toastInstance?: ComponentRef<this>;
  @Input({ required: false }) headerText?: string;
  @Input({ required: false }) bodyText?: string;

  findContent(name: 'header' | 'body'): TemplateRef<IToastTemplate | undefined> | undefined {
    return this.toastContent?.find(template => template.toastBehavior === name)!.el;
  }

  headerContent = this.findContent('header');
  bodyContent = this.findContent('body');

  closeToast = (): void => {
    this.toastInstance?.destroy();
  };
}
