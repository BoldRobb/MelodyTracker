import { Component, EventEmitter, Output } from '@angular/core';
import { uploadFile } from '../../../firebase/storage';
import { ListsService } from '../../../services/lists/backend/lists.service';
import { ListCreateRequest } from '../../../interfaces/lists';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent {
  @Output() close = new EventEmitter<void>();

  listData: ListCreateRequest = {
    name: '',
    comment: '',
    photo: '',
    user_id: undefined
  };

  photoFile: File | null = null;

  constructor(private listService: ListsService) {}

  closeModal(): void {
    this.close.emit();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.photoFile = file;
    }
  }

  isFormValid(): boolean {
    return this.listData.name.trim() !== '' && this.listData.comment.trim() !== '' && this.photoFile !== null;
  }

  async createList(): Promise<void> {
    console.log('id_user:', this.listData.user_id);
    if (this.photoFile) {
      try {
        const downloadURL = await uploadFile(this.photoFile);
        this.listData.photo = downloadURL;

        // Llama al servicio para crear la lista
        this.listService.createList(this.listData).subscribe({
          next: (response) => {
            console.log('Lista creada con éxito:', response);
            this.listService.updateLists();
            this.closeModal();
          },
          error: (err) => {
            console.error('Error al crear la lista:', err);
            console.log('info:', this.listData);
          }
        });
      } catch (error) {
        console.error('Error subiendo la foto:', error);
      }
    }
  }
}
