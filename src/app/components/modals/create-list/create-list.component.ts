import { Component, EventEmitter, Output } from '@angular/core';
import { uploadFile } from '../../../firebase/storage';
import { ListsService } from '../../../services/lists/backend/lists.service';
import { ListCreateRequest } from '../../../interfaces/lists';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GoogleGeminiProService } from '../../../services/google-gemini-pro-service.service';

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

  constructor(private listService: ListsService, private toast: ToastrService, private geminiService: GoogleGeminiProService) {}

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
    if (this.listData.name.trim() === '' || this.listData.name.trim().length < 4) {
      this.toast.error('Name must be at least 4 characters long');
      return;
    }
  
    if (this.listData.comment.trim() === '' || this.listData.comment.trim().length < 4) {
      this.toast.error('Description must be at least 4 characters long');
      return;
    }
  
    if (!this.photoFile) {
      this.toast.error('Please upload a photo for the list');
      return;
    }

    // Verificar nombre de la lista antes de crearla
    try {
      const nameCheckResponse = await this.geminiService.verifyNameList(this.listData.name);

      if (nameCheckResponse === 'true' || nameCheckResponse === 'True') {
        // Verificar la descripción de la lista antes de crearla
        const descriptionCheckResponse = await this.geminiService.verifyDescriptionList(this.listData.comment);
        if (descriptionCheckResponse === 'true' || descriptionCheckResponse === 'True') {
          this.uploadPhotoAndCreateList();
        } else {
          this.toast.error('The description contains inappropriate content. Please try again.');
        }
      } else {
        this.toast.error('The list name contains inappropriate content. Please try again.');
      }
    } catch (error) {

      this.toast.error('Error verifying the list data. Please try again.');
    }
  }

  // Función para subir la foto y crear la lista
  private async uploadPhotoAndCreateList(): Promise<void> {
    if (!this.photoFile) {
      this.toast.error('No file selected');
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

          this.toast.error('Error creating the list. Please try again');
        }
      });
    } catch (error) {

      this.toast.error('Error uploading the photo. Please try again');
    }
  }
}
