import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnectionResponse } from './models/connection-response.model';
import { User } from './models/user.model';
import { RegisterResponse } from './models/registerResponse.model';
import { Files } from './models/files.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getConnection(id: string, passWord: string): Observable<ConnectionResponse> {
    // Initialize Params Object
    let params = new HttpParams();

    params = params.append('id', id);
    params = params.append('passWord', passWord);

    return this.httpClient.get<ConnectionResponse>('http://localhost:8080/connection', { params: params });
  }

  public register(user: User): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>('http://localhost:8080/register', user);
  }

  public files(): Observable<Files> {
    return this.httpClient.get<Files>('http://localhost:8080/files');
  }
}
