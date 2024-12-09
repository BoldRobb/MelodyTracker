import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../services/song/backend/song.service';
import { AlbumService } from '../../../services/album/backend/album-service.service'; 
import { ListsService } from '../../../services/lists/backend/lists.service'; // Importar el servicio de listas
import { YourRatingComponent } from "../../your-rating/your-rating.component";
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/backend/users.service'; // Servicio para manejar al usuario
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-review',
  standalone: true,
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css'],
  imports: [YourRatingComponent, CommonModule],
})
export class CreateReviewComponent implements OnInit {
  title: string = '';
  artist: string = '';
  releaseYear: number = 0;
  albumCover: string = '';
  isVisible: boolean = false;

  currentDate: string = ''; // Nueva propiedad para la fecha actual

  isLiked: boolean = false;
  userId: number | undefined;
  songId: number | undefined;
  albumId: number | undefined;

  isAlbum: boolean = false;
  isSong: boolean = false; // Para saber si se está en la página de una canción
  isList: boolean = false; // Para saber si se está en la lista de reproducción

  listId: number | undefined; // Para almacenar el id de la lista de reproducción

  comment: string = ''; // Para almacenar el comentario que se introduce

  constructor(
    private songService: SongService,
    private usersService: UsersService,
    private albumService: AlbumService,
    private listsService: ListsService, // Inyectar el servicio de listas
    private toast: ToastrService, // Inyectar ToastrService
    private route: ActivatedRoute // Inyectar ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener y formatear la fecha actual
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Obtener los parámetros de la URL
    this.route.params.subscribe(params => {
      this.songId = +params['id']; // id de la canción
      this.albumId = +params['id']; // id del álbum, si existe en la URL
      this.listId = +params['id']; // id de la lista de reproducción, si existe en la URL


      // Obtener los parámetros de la URL
      this.route.url.subscribe(segments => {
        // Convertimos los segmentos de la URL en una cadena de texto
        const path = segments.map(segment => segment.path).join('/');

        // Si la ruta es de un álbum (/album/id)
        if (path.startsWith('album')) {
          this.isAlbum = true; // Estás en una ruta de álbum
          console.log('albumId:', this.albumId);
        } else if (path.startsWith('song')) {
          this.isSong = true; // No es un álbum, es una canción
          console.log('songId:', this.songId);
        } else if (path.startsWith('list')) {
          this.isList = true; // Es una lista de reproducción
          console.log('listId:', this.listId);
        }


        // Cargar los datos de la canción, album o Lista
        this.loadSongData();
      });

      // Cargar los datos de la canción, album o Lista
      this.loadSongData();
    });

    // Obtener el userId desde el token
    this.getUserDataFromToken();
  }

  loadSongData() {
    // Suscribirse a los datos del servicio
    this.songService.currentData.subscribe((data) => {
      this.title = data.title;
      this.artist = data.artist;
      this.releaseYear = data.releaseYear;
      this.albumCover = data.albumCover;
    });
  }

  getUserDataFromToken(): void {
    // Obtener el token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (token) {
      // Decodificar el token (suponiendo que es un JWT y contiene el userId)
      const decodedToken = this.decodeToken(token);
      this.userId = decodedToken?.id_user;

      if (this.userId) {
        console.log('userId extraído del token:', this.userId);
        this.checkIfLiked(); // Verificar si le ha dado like a la canción
      } else {
        console.error('No se encontró el userId en el token');
      }
    } else {
      console.error('No se encontró el access_token en el localStorage');
    }
  }

  decodeToken(token: string): any {
    // Decodificar el token JWT manualmente, si es un JWT estándar
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  checkIfLiked(): void {
    if (this.userId && (this.albumId || this.songId)) {
      
      const checkLike$ = this.isAlbum 
        ? this.albumService.checkIfUserLikedAlbum(this.albumId!, this.userId) 
        : this.isSong
        ? this.songService.checkIfUserLikedSong(this.songId!, this.userId)
        : this.isList
        ? this.listsService.checkIfUserLikedList(this.listId!, this.userId)
        : null;

      if (checkLike$) {
        checkLike$.subscribe({
          next: (response) => {
            console.log('Respuesta del servidor:', response);
            this.isLiked = response.has_liked;
          },
          error: (error) => {
            console.error('Error al verificar si el usuario dio like:', error);
          }
        });
      }
    }
  }

  toggleLike(): void {
    if (this.userId) {
      console.log('Cambiando estado de like');
      console.log('isLiked:', this.isLiked);
      console.log('isAlbum:', this.isAlbum);
      console.log('isSong:', this.isSong);
      console.log('isList:', this.isList);
  
      // Verificación para álbumes
      const like$ = this.isAlbum 
        ? (this.isLiked ? this.albumService.unlikeAlbum(this.albumId!, this.userId) : this.albumService.likeAlbum(this.albumId!, this.userId))
        
        // Verificación para canciones
        : this.isSong
        ? (this.isLiked ? this.songService.unlikeSong(this.songId!, this.userId) : this.songService.likeSong(this.songId!, this.userId))
        
        // Verificación para listas
        : this.isList
        ? (this.isLiked ? this.listsService.unlikeList(this.listId!, this.userId) : this.listsService.likeList(this.listId!, this.userId))
        : null;
  
      if (like$) {
        like$.subscribe({
          next: (response) => {
            this.isLiked = !this.isLiked; // Cambia el estado de 'like'
            console.log('Like toggled:', this.isLiked);
          },
          error: (error) => {
            console.error('Error al alternar el like:', error);
          }
        });
      }
    } else {
      console.error('userId no definido');
    }
  }
  

  openModal() {
    this.isVisible = true; // Muestra el modal
  }

  closeModal() {
    this.isVisible = false; // Oculta el modal
  }

  createReview(commentInput: HTMLTextAreaElement) {
    const commentValue = commentInput.value.trim();
  
    if (commentValue.length > 4) {
      const review$ = this.isAlbum
        ? this.albumService.reviewAlbum(this.userId!, this.albumId!, commentValue)
        : this.isSong
        ? this.songService.reviewSong(this.userId!, this.songId!, commentValue)
        : this.isList
        ? this.listsService.reviewList(this.userId!, this.listId!, commentValue)  // Nuevo servicio para listas
        : null;
  
      if (review$) {
        review$.subscribe({
          next: (response) => {
            this.toast.success('Review successfully created');
            // console.log('Reseña creada:', response);
  
            // Emite la señal de actualización de comentarios
            if (this.isAlbum || this.isSong || this.isList) {
              this.albumService.updateComments();
              this.albumService.updateStats();
            } 
  
            this.closeModal(); // Cerrar el modal después de crear la reseña
          },
          error: (error) => {
            console.error('Error al crear la reseña:', error);
          },
        });
      }
    } else {
      this.toast.error('The review must have more than 4 characters');
      // console.error('El comentario debe tener más de 4 caracteres');
    }
  }
  
}
