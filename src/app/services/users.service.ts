import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post<LoginResponse>(`${this.apiUrl}/token`, body.toString(), { headers })
      .pipe(
        map((response) => {
          // Guardar el token en el almacenamiento local si se desea
          localStorage.setItem('access_token', response.access_token);
          return response.access_token;
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}