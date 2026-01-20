import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  baseUrl: string = environment.api.baseUrl;
  private _httpClient: HttpClient = inject(HttpClient);

  get<ResponseType>(path: string): Observable<ResponseType> {
    return this._httpClient.get<ResponseType>(this.baseUrl + path);
  }

	getBlob(path: string): Observable<Blob> {
    return this._httpClient.get(this.baseUrl + path, {
      responseType: 'blob',
    });
  }

  post<ResponseType>(path: string, data: object): Observable<ResponseType> {
    return this._httpClient.post<ResponseType>(this.baseUrl + path, data);
  }

  put<ResponseType>(path: string, data: object): Observable<ResponseType> {
    return this._httpClient.put<ResponseType>(this.baseUrl + path, data);
  }

  delete<ResponseType>(path: string): Observable<ResponseType> {
    return this._httpClient.delete<ResponseType>(this.baseUrl + path);
  }
}
