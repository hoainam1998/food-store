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

  showToast(header: TemplateRef<unknown>, body: TemplateRef<unknown>): void {
    const toastInstance = ToastService.toastDocker?.createComponent(ToastComponent);
    this.toastComponentInstance = toastInstance;
    toastInstance?.setInput('header', header);
    toastInstance?.setInput('body', body);
    toastInstance?.setInput('toastInstance', this.toastComponentInstance);
  }
}
