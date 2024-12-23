import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseMessage } from '@interfaces';
import { ToastService } from '@services/toast/toast.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private readonly http: HttpClient,
    private readonly toastService: ToastService
  ) {}

  createCategory(formData: FormData) {
    return this.http
      .post<IResponseMessage>('category/create', formData)
      .pipe(
        tap((response) =>
          this.toastService.showToast('Category', response.message)
        )
      )
      .subscribe();
  }
}
