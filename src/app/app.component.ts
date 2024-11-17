import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarLoginComponent } from "./components/navbars/navbar-login/navbar-login.component";
import { NavbarUnloginComponent } from "./components/navbars/navbar-unlogin/navbar-unlogin.component";
import { UsersService } from './services/users/backend/users.service';
import { uploadFile } from './firebase/storage';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarLoginComponent, NavbarUnloginComponent, CommonModule, RouterModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'MelodyTracker';
  user: any = null; // Variable para almacenar los datos del usuario
  
  constructor(
    public usersService: UsersService,
    private router: Router // Inyectamos el servicio Router
  ) {}

  ngOnInit() {
    this.usersService.checkToken();
    this.getUserData();

    // Suscribirse a los eventos de navegación y registrar la URL después de cada cambio
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // console.log('URL actual:', event.urlAfterRedirects);
      });
  }

  // Función para obtener datos del usuario
  getUserData(): void {
    this.usersService.getCurrentUser().subscribe(
      (response) => {
        this.user = response; // Asigna la respuesta a la variable user
  
        // Verifica la estructura de la respuesta
        if (this.user) {
  
          // Asegúrate de que el campo id_user existe en la respuesta
          const userId = this.user?.id_user;
          if (userId !== undefined) {
            // console.log('id_user encontrado:', userId);
          } else {
            console.log('id_user no encontrado en la respuesta');
          }
        }
      },
      (error) => {
        console.error("Error al obtener datos del usuario:", error);
      }
    );
  }
  
  login(username: string, password: string): void {
    this.usersService.login(username, password).subscribe({
      next: (accessToken) => {
        // console.log('Login exitoso, token:', accessToken);
      },
      error: () => {
        console.log('Error al iniciar sesión');
      }
    });
  }

  logout(): void {
    this.usersService.logout();
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
}
