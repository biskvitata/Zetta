import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsPrefillService {

  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.http.get(url)
  }
}
