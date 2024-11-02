import { Component, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NavbarLoginComponent } from "./components/navbars/navbar-login/navbar-login.component";
import { NavbarUnloginComponent } from "./components/navbars/navbar-unlogin/navbar-unlogin.component";
import { uploadFile } from './firebase/storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarLoginComponent, NavbarUnloginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MelodyTracker';
  isLoggedIn = signal(false);  // Signal reactivo para el estado de autenticación

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkToken();
  }

  // Método para verificar el token de autenticación
  checkToken(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.isLoggedIn.set(false);
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.get('http://127.0.0.1:8000/users/me', { headers }).subscribe({
      next: () => this.isLoggedIn.set(true),
      error: () => this.isLoggedIn.set(false)
    });
  }

  // Método para iniciar sesión
  login(username: string, password: string): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    this.http.post<{ access_token: string }>('http://127.0.0.1:8000/users/token', body.toString(), { headers })
      .subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response.access_token);
          this.isLoggedIn.set(true);
        },
        error: () => this.isLoggedIn.set(false)
      });
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('access_token');
    this.isLoggedIn.set(false);
  }

  // Método para manejar la carga de archivos
  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      try {
        const downloadURL = await uploadFile(file);
        console.log('File available at', downloadURL);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }
}
