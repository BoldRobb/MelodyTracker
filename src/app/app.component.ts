import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { RouterOutlet } from '@angular/router';
import { NavbarLoginComponent } from "./components/navbars/navbar-login/navbar-login.component";
import { uploadFile } from './firebase/storage'; 
import { Observable } from 'rxjs';
import { NavbarUnloginComponent } from "./components/navbars/navbar-unlogin/navbar-unlogin.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarLoginComponent, NavbarUnloginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MelodyTracker';
  isLoggedIn = false; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.validar_usuario_token().subscribe(isValid => {
      this.isLoggedIn = isValid; 
      if (!isValid) {
        console.log('El token no es válido. Redirigiendo a la página de inicio de sesión...');
      } else {
        console.log('El token es válido.');
      }
    });
  }

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

  validar_usuario_token(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return new Observable<boolean>(observer => {
        observer.next(false); 
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return new Observable<boolean>(observer => {
      this.http.get('http://127.0.0.1:8000/users/me', { headers }).subscribe({
        next: () => {
          observer.next(true); 
          observer.complete();
        },
        error: () => {
          observer.next(false); 
          observer.complete();
        }
      });
    });
  }
}
