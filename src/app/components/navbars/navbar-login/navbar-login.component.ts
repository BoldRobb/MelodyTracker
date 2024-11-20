import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateListComponent } from "../../modals/create-list/create-list.component";
import { UsersService } from '../../../services/users/backend/users.service';

@Component({
  selector: 'app-navbar-login',
  standalone: true,
  imports: [RouterModule, CreateListComponent],
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css']
})
export class NavbarLoginComponent implements OnInit {
  isOpen = false; // Controla la visibilidad del modal
  username: string = ''; // Variable para almacenar el username
  photo: string = ''; // Variable para almacenar la photo

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');  // Obtener el token desde localStorage
    if (token) {
      const userId = this.decodeToken(token);  // Extraer el id_user del token

      if (userId) {
        this.userService.getUsernameAndPhoto(Number(userId)).subscribe(
          (data) => {
            this.username = data.username;  // Asigna el username
            this.photo = data.photo || 'images/teemo.jpg';  // Asigna la foto o usa una predeterminada
            // console.log('Username:', this.username); // Verificar el username
            // console.log('Photo:', this.photo);       // Verificar la foto
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
      } else {
        console.log('No valid user ID found in token');
      }
    } else {
      console.log('No token found');
    }
  }
  
  // Función para decodificar el JWT y extraer el id_user
  // Función para decodificar el JWT y extraer el id_user
  decodeToken(token: string): string | null {
    try {
      const payload = token.split('.')[1];  // Obtener la parte del payload del token
      const decodedPayload = atob(payload);  // Decodificar de base64 a string

      const parsedPayload = JSON.parse(decodedPayload);  // Parsear el JSON del payload
      return parsedPayload.id_user;  // Ajustar para obtener el campo 'id_user'
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


  openModal(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto
    this.isOpen = true; // Cambiar el estado del modal
  }

  closeModal(): void {
    this.isOpen = false; // Cerrar el modal
  }
}
