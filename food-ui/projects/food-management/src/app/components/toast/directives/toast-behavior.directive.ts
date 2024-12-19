import { Directive, Input, TemplateRef } from '@angular/core';

export interface IToastTemplate {
  close: () => void;
}

@Directive({
  selector: '[toastBehavior]',
  standalone: true
})
export class ToastBehaviorDirective {
  @Input() toastBehavior?: string;
  constructor(public el: TemplateRef<IToastTemplate>) {}
}
