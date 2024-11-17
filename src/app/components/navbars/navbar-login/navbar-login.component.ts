import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateListComponent } from "../../modals/create-list/create-list.component";

@Component({
  selector: 'app-navbar-login',
  standalone: true,
  imports: [RouterModule, CreateListComponent],  // No necesitas agregar CreateListComponent en imports
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css']
})
export class NavbarLoginComponent {
  isOpen = false; // Controla la visibilidad del modal

  openModal(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto
    this.isOpen = true; // Cambiar el estado del modal
  }

  closeModal(): void {
    this.isOpen = false; // Cerrar el modal
  }
}