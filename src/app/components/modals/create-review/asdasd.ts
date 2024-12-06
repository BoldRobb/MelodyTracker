import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../services/song/backend/song.service';
import { AlbumService } from '../../../services/album/backend/album-service.service'; 
import { ListsService } from '../../../services/lists/backend/lists.service';
import { YourRatingComponent } from "../../your-rating/your-rating.component";
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/backend/users.service'; 
import { ActivatedRoute } from '@angular/router';

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
  currentDate: string = '';
  isLiked: boolean = false;
  userId: number | undefined;
  songId: number | undefined;
  albumId: number | undefined;
  isAlbum: boolean = false;
  isList: boolean = false;
  listId: number | undefined;
  comment: string = '';

  constructor(
    private songService: SongService,
    private usersService: UsersService,
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private listsService: ListsService
  ) {}

  ngOnInit() {
    // Obtener y formatear la fecha actual
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Detectar si es ruta de álbum, canción o lista
    this.route.url.subscribe(segments => {
      const path = segments.map(segment => segment.path).join('/');

      if (path.startsWith('album')) {
        this.isAlbum = true;
        this.isList = false;
      } else if (path.startsWith('song')) {
        this.isAlbum = false;
        this.isList = false;
      } else if (path.startsWith('list')) {
        this.isAlbum = false;
        this.isList = true; // Es una lista
        this.listId = Number(this.route.snapshot.paramMap.get('id')); // Obtener el `id` de la lista desde la URL
      }

      console.log('Ruta identificada: ', { isAlbum: this.isAlbum, isList: this.isList, path });
      this.loadData(); // Llama al método para cargar los datos según el tipo
    });

    // Obtener el userId desde el token
    this.getUserDataFromToken();
  }

  loadData() {
    if (this.isAlbum) {
      this.loadSongData();
    } else if (this.isList) {
      this.loadListData();
    }
  }

  loadSongData() {
    // Suscribirse a los datos del servicio
    this.songService.currentData.subscribe((data) => {
      this.title = data.title;
      this.artist = data.artist;
      this.releaseYear = data.releaseYear;
      this.albumCover = data.albumCover;
      console.log('Datos del servicio:', this.title, this.artist, this.releaseYear, this.albumCover, this.songId);
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
    if (this.userId) {
      let checkLike$;
  
      if (this.isAlbum) {
        checkLike$ = this.albumService.checkIfUserLikedAlbum(this.albumId!, this.userId);
      } else if (!this.isAlbum && this.isList) {
        checkLike$ = this.listsService.checkIfUserLikedList(this.listId!, this.userId); // Agrega el servicio para listas
      } else {
        checkLike$ = this.songService.checkIfUserLikedSong(this.songId!, this.userId);
      }
  
      checkLike$.subscribe({
        next: (response) => {
          this.isLiked = response.has_liked;
        },
        error: (error) => {
          console.error('Error al verificar el "like":', error);
        }
      });
    }
  }

  loadListData() {
    if (this.listId) {
      this.listsService.getListDetails(this.listId).subscribe({
        next: (data) => {
          this.title = data.list_name; // Asigna datos relevantes de la lista
          this.artist = data.creator_username; // Si tiene un creador
          this.albumCover = data.list_photo; // Si tiene portada
          console.log('Datos de la lista cargados:', data);
        },
        error: (error) => {
          console.error('Error al cargar los datos de la lista:', error);
        },
      });
    }
  }

  toggleLike(): void {
    if (this.userId) {
      console.log('Cambiando estado de like');
      console.log('isLiked:', this.isLiked);
      console.log('isAlbum:', this.isAlbum);
      console.log('isList:', this.isList);
    
      let like$ = null;
  
      // Si es un álbum
      if (this.isAlbum) {
        like$ = this.isLiked
          ? this.albumService.unlikeAlbum(this.albumId!, this.userId)
          : this.albumService.likeAlbum(this.albumId!, this.userId);
      }
      // Si es una canción
      else if (!this.isAlbum && !this.isList) {
        like$ = this.isLiked
          ? this.songService.unlikeSong(this.songId!, this.userId)
          : this.songService.likeSong(this.songId!, this.userId);
      }
      // Si es una lista
      else if (this.isList) {
        like$ = this.isLiked
          ? this.listsService.unlikeList(this.listId!, this.userId)
          : this.listsService.likeList(this.listId!, this.userId);
      }
  
      // Realizar la petición
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
      } else {
        console.error('No se pudo determinar el tipo de like');
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
      let review$;
  
      if (this.isAlbum) {
        review$ = this.albumService.reviewAlbum(this.userId!, this.albumId!, commentValue);
      } else if (!this.isAlbum && this.isList) {
        console.log('Creando reseña con estos datos:', this.userId, this.listId, commentValue);
        review$ = this.listsService.reviewList(this.userId!, this.listId!, commentValue); // Agrega método para listas
      } else {
        review$ = this.songService.reviewSong(this.userId!, this.songId!, commentValue);
      }
  
      review$.subscribe({
        next: (response) => {
          console.log('Reseña creada:', response);
          this.closeModal(); // Cierra el modal
        },
        error: (error) => {
          console.error('Error al crear la reseña:', error);
        },
      });
    } else {
      console.error('El comentario debe tener más de 4 caracteres');
    }
  }
}
