import { Injectable } from '@angular/core';
import { ICategory, IPagination, IResponseMessage } from '@interfaces';
import { HttpService } from '@services/http/http.service';
import { ToastService } from '@services/toast/toast.service';
import { Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private readonly http: HttpService,
    private readonly toastService: ToastService
  ) {
    this.http.BaseUrl = 'category';
  }

  createCategory(formData: FormData): Subscription {
    return this.http
      .post<IResponseMessage>('create', formData)
      .pipe(
        tap((response) =>
          this.toastService.showToast('Category', response.message)
        )
      )
      .subscribe();
  }

  pagination(pageSize: number, pageNumber: number): Observable<IPagination<ICategory>> {
    return this.http.post<IPagination<ICategory>>('pagination', {
      pageSize,
      pageNumber,
      queries: ['name', 'avatar']
    });
  }
}
