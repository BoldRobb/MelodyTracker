import { Component } from '@angular/core';

@Component({
  selector: 'app-create-review',
  standalone: true,
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent {
  isVisible: boolean = false;

  openModal() {
    this.isVisible = true; // Muestra el modal
  }

  closeModal() {
    this.isVisible = false; // Oculta el modal
  }
}
