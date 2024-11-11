import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResponse, RegisterData } from '../../../interfaces/users';


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
      .post<LoginResponse>(`${this.apiUrl}/users/token`, body.toString(), { headers })
      .pipe(
        map((response) => {
          // Guardar el token en el almacenamiento local si se desea
          localStorage.setItem('access_token', response.access_token);
          return response.access_token;
        })
      );
  }

  registerUser(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/users/createUser`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }


  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); 

  checkToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('access_token');
    
      console.log('Token encontrado en localStorage:', token);
    
      if (!token) {
        this.isLoggedInSubject.next(false);
        console.log('Token no encontrado, isLoggedIn:', false);
        return;
      }
    
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      
      console.log('Iniciando petición HTTP para verificar el token...');
    
      this.http.get('http://127.0.0.1:8000/users/me', { headers }).subscribe({
        next: () => {
          this.isLoggedInSubject.next(true);
          console.log('Token válido, isLoggedIn después de set(true):', true);
        },
        error: (error) => {
          this.isLoggedInSubject.next(false);
          console.log('Token inválido o error en la petición:', error);
          console.log('isLoggedIn después de set(false):', false);
        }
      });
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('access_token');
      this.isLoggedInSubject.next(false);
    }
  }

}
