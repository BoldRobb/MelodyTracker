import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NavbarLoginComponent } from "./components/navbars/navbar-login/navbar-login.component";
import { NavbarUnloginComponent } from "./components/navbars/navbar-unlogin/navbar-unlogin.component";
import { UsersService } from './services/users/backend/users.service';
import { uploadFile } from './firebase/storage';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarLoginComponent, NavbarUnloginComponent, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'MelodyTracker';
  
  

  constructor(public usersService: UsersService) {
    
  }

  ngOnInit() {
    this.usersService.checkToken(); 
  }

  
  
  login(username: string, password: string): void {
    this.usersService.login(username, password).subscribe({
      next: (accessToken) => {
        
        console.log('Login exitoso, token:', accessToken);
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