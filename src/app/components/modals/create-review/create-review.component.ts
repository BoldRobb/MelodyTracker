import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../services/song/backend/song.service';
import { AlbumService } from '../../../services/album/backend/album-service.service'; 
import { YourRatingComponent } from "../../your-rating/your-rating.component";
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users/backend/users.service'; // Servicio para manejar al usuario
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute

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

  comment: string = ''; // Para almacenar el comentario que se introduce

  constructor(
    private songService: SongService,
    private usersService: UsersService,
    private albumService: AlbumService,
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

      console.log('albumId:', this.albumId);

      // Obtener los parámetros de la URL
      this.route.url.subscribe(segments => {
        // Convertimos los segmentos de la URL en una cadena de texto
        const path = segments.map(segment => segment.path).join('/');

        // Si la ruta es de un álbum (/album/id)
        if (path.startsWith('album')) {
          this.isAlbum = true; // Estás en una ruta de álbum
          console.log('ES ALBUUMMMMMMMM');
        }
        // Si la ruta es de una canción (/song/id)
        else if (path.startsWith('song')) {
          this.isAlbum = false; // No es un álbum, es una canción
          console.log('ES CANCIOOOOOOON');
        }

        console.log('albumId:', this.albumId);
        console.log('songId:', this.songId);

        // Cargar los datos de la canción o álbum
        this.loadSongData();
      });

      // Cargar los datos de la canción
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
    if (this.userId && this.albumId) {
      console.log('Verificando si el usuario ha dado like');
      console.log('isAlbum:', this.isAlbum);
      console.log('albumId:', this.albumId);
      
      const checkLike$ = this.isAlbum 
        ? this.albumService.checkIfUserLikedAlbum(this.albumId!, this.userId) 
        : this.songService.checkIfUserLikedSong(this.songId!, this.userId);
    
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

  toggleLike(): void {
    if (this.userId) {
      console.log('Cambiando estado de like');
      console.log('isLiked:', this.isLiked);
      console.log('isAlbum:', this.isAlbum);
    
      const like$ = this.isAlbum 
        ? (this.isLiked ? this.albumService.unlikeAlbum(this.albumId!, this.userId) : this.albumService.likeAlbum(this.albumId!, this.userId))
        : (this.isLiked ? this.songService.unlikeSong(this.songId!, this.userId) : this.songService.likeSong(this.songId!, this.userId));
    
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
      console.error('userId o albumId no definidos');
    }
  }

  openModal() {
    this.isVisible = true; // Muestra el modal
  }

  closeModal() {
    this.isVisible = false; // Oculta el modal
  }

  createReview(commentInput: HTMLTextAreaElement) {
    const commentValue = commentInput.value.trim(); // Obtener el valor del textarea

    if (commentValue.length > 4) { // Solo si el comentario tiene más de 4 caracteres
      const review$ = this.isAlbum
        ? this.albumService.reviewAlbum(this.userId!, this.albumId!, commentValue)
        : this.songService.reviewSong(this.userId!, this.songId!, commentValue);

      review$.subscribe({
        next: (response) => {
          console.log('Reseña creada:', response);
          this.closeModal(); // Cerrar el modal después de crear la reseña
        },
        error: (error) => {
          console.error('Error al crear la reseña:', error);
        }
      });
    } else {
      console.error('El comentario debe tener más de 4 caracteres');
    }
  }
}
