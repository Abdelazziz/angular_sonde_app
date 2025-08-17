import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // Generic GET
  get<T>(
    url: string,
    fromJson: (json: any) => T,
    headers?: { [key: string]: string }
  ) {
    return this.http
      .get<any>(url, { headers: new HttpHeaders(headers || {}) })
      .pipe(
        map((data) => fromJson(data)),
        catchError(this.handleError)
      );
  }

  // Generic GET List
  getList<T>(
    url: string,
    fromJson: (json: any) => T,
    headers?: { [key: string]: string }
  ) {
    return this.http
      .get<any[]>(url, { headers: new HttpHeaders(headers || {}) })
      .pipe(
        map((list) => {
          if (!list) {
            return [];
          }
          return list.map(fromJson);
        }),
        catchError(this.handleError)
      );
  }

  // Generic POST
  post<T>(
    url: string,
    body: any,
    fromJson: (json: any) => T,
    headers?: { [key: string]: string }
  ) {
    return this.http
      .post<any>(url, body, { headers: new HttpHeaders(headers || {}) })
      .pipe(
        map((data) => fromJson(data)),
        catchError(this.handleError)
      );
  }

  // Generic POST List
  postList<T>(
    url: string,
    body: any,
    fromJson: (json: any) => T,
    headers?: { [key: string]: string }
  ) {
    return this.http
      .post<any[]>(url, body, { headers: new HttpHeaders(headers || {}) })
      .pipe(
        map((list) => {
          if (!list) {
            return [];
          }
          return list.map(fromJson);
        }),
        catchError(this.handleError)
      );
  }

  // Generic PUT
  put<T>(
    url: string,
    body: any,
    fromJson: (json: any) => T,
    headers?: { [key: string]: string }
  ) {
    return this.http
      .put<any>(url, body, { headers: new HttpHeaders(headers || {}) })
      .pipe(
        map((data) => fromJson(data)),
        catchError(this.handleError)
      );
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || error.message || 'Unknown error';
    return throwError(() => new Error(`HTTP error: ${message}`));
  }
}
