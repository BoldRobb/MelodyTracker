import { Component } from '@angular/core';
import { AddToListComponent } from '../modals/add-to-list/add-to-list.component';  // Importa el componente del modal

@Component({
  selector: 'app-btn-add-to-list',
  standalone: true,
  imports: [AddToListComponent],  // Si quieres cargarlo dentro de este componente
  templateUrl: './btn-add-to-list.component.html',
  styleUrls: ['./btn-add-to-list.component.css']
})
export class BtnAddToListComponent {
  isModalOpen = false;  // Controla si el modal se muestra o no

  // Método para abrir el modal
  openAddToListModal(): void {
    this.isModalOpen = true;  // Cambia el estado a visible
    console.log("Se abrió el modal");
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;  // Cambia el estado a no visible
    console.log("Se cerró el modal");
  }
}
