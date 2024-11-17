// create-list.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-list',
  standalone: true,
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent {
  @Output() close = new EventEmitter<void>(); // Emite un evento para cerrar el modal

  closeModal(): void {
    this.close.emit(); // Emite el evento para cerrar el modal
  }
}
