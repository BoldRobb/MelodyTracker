import { Component, EventEmitter, Output } from '@angular/core';
import { uploadFile } from '../../../firebase/storage';
import { ListsService } from '../../../services/lists/backend/lists.service';
import { ListCreateRequest } from '../../../interfaces/lists';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private listService: ListsService, private toast: ToastrService) {}

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
    console.log("Botón de crear presionado"); // Verificar si la función se ejecuta
    
    // Validación de campos vacíos o longitud mínima
    if (this.listData.name.trim() === '') {
      this.toast.error('Please enter a name for the list');
      return;
    }
    
    if (this.listData.name.trim().length < 4) { // Verificar si el nombre tiene al menos 4 caracteres
      this.toast.error('Name must be at least 4 characters long');
      return;
    }
  
    if (this.listData.comment.trim() === '') {
      this.toast.error('Please enter a description for the list');
      return;
    }
  
    if (this.listData.comment.trim().length < 4) { // Verificar si la descripción tiene al menos 4 caracteres
      this.toast.error('Description must be at least 4 characters long');
      return;
    }
  
    if (!this.photoFile) {
      this.toast.error('Please upload a photo for the list');
      return;
    }
  
    try {
      const downloadURL = await uploadFile(this.photoFile);
      this.listData.photo = downloadURL;
  
      // Llama al servicio para crear la lista
      this.listService.createList(this.listData).subscribe({
        next: (response) => {
          this.listService.updateLists();
          this.closeModal();
          this.toast.success('List created successfully');
        },
        error: (err) => {
          console.error('Error al crear la lista:', err);
          this.toast.error('Error creating the list. Please try again');
        }
      });
    } catch (error) {
      console.error('Error subiendo la foto:', error);
      this.toast.error('Error uploading the photo. Please try again');
    }
  }
  
}
