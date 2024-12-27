/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private baseUrl?: string;
  constructor(private readonly httpClient: HttpClient) {}

  set BaseUrl(value: string) {
    this.baseUrl = value;
  }

  post<T>(url: string, body: Record<string, any> | FormData): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}/${url}`, body);
  }
}
