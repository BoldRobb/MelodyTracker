import { Component, EventEmitter, Output } from '@angular/core';
import { CreateListComponent } from "../../modals/create-list/create-list.component";

@Component({
  selector: 'app-add-to-list',
  standalone: true,
  imports: [CreateListComponent],
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.css']
})
export class AddToListComponent {

  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic

  isOpenModalAdd = false; // Estado para controlar si se muestra el modal de creación de lista
  isOpen = true; // Estado principal para controlar la visibilidad del modal principal

  // Método para abrir el modal
  openModal(event: Event): void {
    event.stopPropagation(); // Evita que el evento se propague a otros elementos
    this.isOpenModalAdd = true; // Cambia el estado para abrir el modal de creación de lista
  }

  // Método para cerrar el modal principal
  closeAddToListModal(): void {
    this.clickEvent.emit();
    this.isOpen = false; // Cambia el estado a no visible para cerrar el modal principal
    this.isOpenModalAdd = false; // También cerramos el modal de creación de lista
  }

  // Método para cerrar el modal de creación de lista
  closeModal(): void {
    this.isOpenModalAdd = false; // Cambia el estado a no visible para cerrar el modal de creación de lista
    
  }
}
