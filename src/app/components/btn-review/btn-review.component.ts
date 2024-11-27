import { Component, ViewChild } from '@angular/core';
import { CreateReviewComponent } from '../modals/create-review/create-review.component';

@Component({
  selector: 'app-btn-review',
  standalone: true,
  imports: [CreateReviewComponent], // Importa el modal aquí
  templateUrl: './btn-review.component.html',
  styleUrls: ['./btn-review.component.css']
})
export class BtnReviewComponent {
  @ViewChild(CreateReviewComponent) modal!: CreateReviewComponent;

  handleClick() {
    this.modal.openModal(); // Llama al método del modal para abrirlo
  }
}
