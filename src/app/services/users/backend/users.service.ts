import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResponse, RegisterData, UserResponse } from '../../../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // Método de login
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
          localStorage.setItem('access_token', response.access_token);
          console.log('Token guardado:', response.access_token); // Verifica que el token se guarda correctamente
          return response.access_token;
        })
      );
  }

  // Método de registro de usuario
  registerUser(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/users/createUser`, data);
  }

  // Obtener el token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Definir un BehaviorSubject para el estado de login
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); 

  // Verificar si el token es válido
  checkToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('access_token');
    
      if (!token) {
        this.isLoggedInSubject.next(false);
        console.log('Token no encontrado, isLoggedIn:', false);
        return;
      }
    
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      // Validar el token
      this.http.get(`${this.apiUrl}/users/me`, { headers }).subscribe({
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

  // Cerrar sesión y limpiar el token
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('access_token');
      this.isLoggedInSubject.next(false);
    }
  }

  // Método para obtener los datos del usuario logueado
  getCurrentUser(): Observable<UserResponse> {
    const token = localStorage.getItem('access_token'); // Obtener el token del localStorage
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluir el token en los headers
    });
  
    // Indicamos que la respuesta será un arreglo de objetos de tipo UserResponse
    return this.http.get<UserResponse[]>(`${this.apiUrl}/users/me`, { headers }).pipe(
      map(response => response[0]) // Extraemos el primer objeto del arreglo
    );
  }

  // Método para obtener solo el ID del usuario
  getUserId(): Observable<number> {
    return this.getCurrentUser().pipe(
      map(user => user.id_user) // Extraemos solo el id_user
    );
  }

  // Método para obtener el nombre de usuario
  getUsername(): Observable<any> {
    return this.getCurrentUser().pipe(
      map(user => user.username) // Extraer solo el username
    );
  }
  
  // Verificar si el usuario está logueado
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
