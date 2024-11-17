import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateListComponent } from "../../modals/create-list/create-list.component";

@Component({
  selector: 'app-add-to-list',
  standalone: true,
  imports: [RouterModule, CreateListComponent],
  templateUrl: './add-to-list.component.html',
  styleUrl: './add-to-list.component.css'
})
export class AddToListComponent {
  isOpen = false; // Controla la visibilidad del modal

  openModal(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto
    this.isOpen = true; // Cambiar el estado del modal
  }

  closeModal(): void {
    this.isOpen = false; // Cerrar el modal
  }
}
