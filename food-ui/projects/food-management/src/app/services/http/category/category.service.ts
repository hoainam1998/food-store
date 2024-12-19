import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http: HttpClient) {}

  createCategory(formData: FormData) {
    return this.http.post('category/create', formData).subscribe();
  }
}
