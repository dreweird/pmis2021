import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Document } from './document';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PmisService {
  // apiRoot: string = 'http://172.16.130.10:3115';
  //apiRoot: string = 'http://210.5.100.46:3116';
  apiRoot: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  login(username, password) {
    const url = `${this.apiRoot}/login`;
    return this.http.post(url, { username, password });
  }

  getPDF() {
    const url = `http://172.16.129.190/example.pdf`;
    return this.http.get(url, { responseType: 'arraybuffer' as 'json' });
  }

  getAllDoc() {
    const url = `${this.apiRoot}/documents`;
    return this.http.get(url);
  }

  findDoc(code: string): Observable<Document> {
    const url = `${this.apiRoot}/documents/` + code;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched document code=${code}`)),
      catchError(this.handleError)
    );
  }

  insertDoc(entries) {
    const url = `${this.apiRoot}/documents`;
    return this.http.post(url, { entries });
  }

  updateDoc(entries) {
    const url = `${this.apiRoot}/documents/` + entries.code;
    return this.http.put(url, { entries });
  }

  removeDoc(code) {
    const url = `${this.apiRoot}/documents/` + code;
    return this.http.delete(url);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
