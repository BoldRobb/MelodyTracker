import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CreateListComponent } from "../../modals/create-list/create-list.component";
import { ListsService } from '../../../services/lists/backend/lists.service'; // Importar el servicio
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-to-list',
  standalone: true,
  imports: [CreateListComponent, CommonModule],
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.css']
})
export class AddToListComponent implements OnInit {
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic

  isOpenModalAdd = false; // Estado para controlar si se muestra el modal de creación de lista
  isOpen = true; // Estado principal para controlar la visibilidad del modal principal
  userLists: any[] = []; // Almacena las listas del usuario
  isLoading = true; // Controla el estado de carga
  userId: number | null = null; // ID del usuario extraído del token
  songId: number | null = null; // ID de la canción extraído de la URL

  constructor(
    private listService: ListsService,
    private route: ActivatedRoute // Inyectar ActivatedRoute para obtener los parámetros de la URL
  ) {}

  ngOnInit(): void {
    this.extractUserIdFromToken();
    if (this.userId) {
      this.loadUserLists();
    } else {
      console.error('No se pudo obtener el ID del usuario desde el token');
    }
    this.extractSongIdFromUrl(); // Extraer el ID de la canción desde la URL
  }

  // Método para extraer el id_user desde el access_token almacenado en localStorage
  extractUserIdFromToken(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del JWT
        this.userId = payload.id_user; // Cambiar 'id_user' según el nombre real de la clave en tu token
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }

  // Método para extraer el id_song desde la URL
  extractSongIdFromUrl(): void {
    this.route.paramMap.subscribe(params => {
      this.songId = Number(params.get('id')); // Obtén el ID de la canción de la URL
      console.log('ID de la canción:', this.songId);
    });
  }

  // Método para cargar las listas del usuario
  loadUserLists(): void {
    this.listService.getNameListsOfUser(this.userId!).subscribe(
      (lists) => {
        this.userLists = lists;
        this.isLoading = false;
        console.log('Listas del usuario:', this.userLists); // Depuración
      },
      (error) => {
        console.error('Error al cargar las listas:', error);
        this.isLoading = false;
      }
    );
  }

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

  // Método para agregar la canción seleccionada a una lista
  addSongToSelectedList(id_list: number): void {
    if (this.songId !== null) {
      this.listService.addSongToList(id_list, this.songId).subscribe(
        (response) => {
          console.log('Canción agregada a la lista:', response);
          this.closeAddToListModal(); // Cerrar el modal solo si la canción fue agregada correctamente
        },
        (error) => {
          console.error('Error al agregar la canción a la lista:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID de la canción');
    }
  }
}