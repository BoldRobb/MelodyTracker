import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateListComponent } from "../../modals/create-list/create-list.component";
import { UsersService } from '../../../services/users/backend/users.service';
import { Router } from '@angular/router';
import { SearchComponent } from "../../search/search.component"; // Importa Router

@Component({
  selector: 'app-navbar-login',
  standalone: true,
  imports: [RouterModule, CreateListComponent, SearchComponent],
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css']
})
export class NavbarLoginComponent implements OnInit {
  isOpen = false; // Controla la visibilidad del modal
  showDropdown = false; // Controla la visibilidad del menú desplegable
  username: string = ''; // Variable para almacenar el username
  photo: string = ''; // Variable para almacenar la photo
  userId: number | null = null; // Variable para almacenar el id_user

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');  
    if (token) {
      const id = this.decodeToken(token);  
      if (id) {
        this.userId = Number(id); // Almacena el id_user en la variable
        this.userService.getUsernameAndPhoto(this.userId).subscribe(
          (data) => {
            this.username = data.username; 
            this.photo = data.photo || 'images/teemo.jpg';  
          },
          (error) => {

          }
        );
      } else {

      }
    } else {

    }
  }

  decodeToken(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.id_user; 
    } catch (error) {

      return null;
    }
  }


  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown; // Cambia el estado del menú desplegable
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnOutsideClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.contenedor_perfil')) {
      this.showDropdown = false; // Cierra el menú si se hace clic fuera del contenedor
    }
  }

  openModal(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto
    this.isOpen = true; // Cambiar el estado del modal
  }

  closeModal(): void {
    this.isOpen = false; // Cerrar el modal
  }


  logout(): void {
    localStorage.removeItem('access_token'); // Elimina el token del localStorage
    this.userService.isLoggedIn$ = false; // Cambia el estado de isLoggedIn$

    this.router.navigate(['/homepage']); // Cambia '/dashboard' por la ruta deseada
  }
}
