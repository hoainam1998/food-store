import { ComponentRef, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { ToastComponent } from '@components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private static toastDocker?: ViewContainerRef;
  private toastComponentInstance?: ComponentRef<ToastComponent>;

  static set ToastDocker(toastDocker: ViewContainerRef) {
    ToastService.toastDocker = toastDocker;
  }

  showToast(header: TemplateRef<unknown> | string, body: TemplateRef<unknown> | string): void {
    const toastInstance = ToastService.toastDocker?.createComponent(ToastComponent);
    this.toastComponentInstance = toastInstance;

    if (typeof header === 'string') {
      toastInstance?.setInput('headerText', header);
    } else {
      toastInstance?.setInput('header', header);
    }

    if (typeof body === 'string') {
      toastInstance?.setInput('bodyText', body);
    } else {
      toastInstance?.setInput('body', body);
    }

    toastInstance?.setInput('toastInstance', this.toastComponentInstance);
  }
}
