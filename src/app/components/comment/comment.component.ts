import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el id y el tipo desde la URL
import { SongService } from '../../services/song/backend/song.service'; // Servicio para las canciones
import { AlbumService } from '../../services/album/backend/album-service.service'; // Servicio para los álbumes
import { SpinnerService } from '../../services/others/spinner.service'; // Servicio para el spinner
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Para la navegación

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  isLoading = true;
  userId: number | undefined; // Variable para almacenar el id_user
  isAlbum: boolean = false; // Determina si es álbum o canción

  constructor(
    private songService: SongService, 
    private albumService: AlbumService, 
    private spinnerService: SpinnerService,
    private router: Router,
    private route: ActivatedRoute // Para obtener parámetros de la URL
  ) {}

  ngOnInit() {
    this.checkIfAlbum();
    this.loadComments();
  }

  // Método para verificar si es un álbum o una canción
  checkIfAlbum() {
    const url = window.location.pathname;
    this.isAlbum = url.includes('/album/');
  }

  // Método para cargar los comentarios
  loadComments() {
    const id = this.getIdFromUrl(); // Obtén el ID desde la URL

    if (this.isAlbum) {
      this.albumService.getAlbumComments(id).subscribe(
        (comments) => this.handleComments(comments),
        (error) => this.handleError(error)
      );
    } else {
      this.songService.getComments(id).subscribe(
        (comments) => this.handleComments(comments),
        (error) => this.handleError(error)
      );
    }
  }

  // Método para manejar los comentarios obtenidos
  handleComments(comments: any[]) {
    console.log('Comentarios recibidos:', comments); // Verifica la estructura de los comentarios
    this.comments = comments;

    // Asignar el userId del primer comentario (si existe)
    if (comments && comments.length > 0) {
      this.userId = comments[0].id_user; // Asignar el id_user del primer comentario
    }

    this.isLoading = false;
  }

  // Método para manejar errores al cargar los comentarios
  handleError(error: any) {
    console.error('Error al cargar los comentarios: ', error);
    this.isLoading = false;
  }

  // Método para obtener el ID desde la URL
  getIdFromUrl(): number {
    const urlParts = window.location.pathname.split('/');
    return +urlParts[urlParts.length - 1]; // Suponiendo que la URL termina con el ID
  }

  // Método para obtener el número de estrellas
  getStars(score: number): number[] {
    score = Number(score); // Convertir el valor a número explícitamente
    const fullStars = Math.floor(score); // Estrellas completas
    const halfStars = score % 1 >= 0.5 ? 1 : 0; // Media estrella si el decimal es >= 0.5
    return [
      ...new Array(fullStars).fill(1), // Estrellas completas
      ...new Array(halfStars).fill(0.5), // Estrella media
    ];
  }

  // Método para navegar al perfil de un usuario
  navigateToProfile(userId: number): void {
    if (userId) {
      this.router.navigate(['/profile', userId]); // Navega a la página del perfil
    } else {
      console.error('El userId es inválido o no está definido');
    }
  }
}
