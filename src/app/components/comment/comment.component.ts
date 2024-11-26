import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el id_song desde la URL
import { SongService } from '../../services/song/backend/song.service'; // Asegúrate de usar la ruta correcta
import { SpinnerService } from '../../services/others/spinner.service'; // Si usas spinner, asegúrate de importar el servicio
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importamos Router para la navegación

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
  userId: number | undefined;  // Variable para almacenar el id_user

  constructor(
    private songService: SongService, 
    private spinnerService: SpinnerService,
    private router: Router  // Inyectamos Router para navegar
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  // Método para cargar los comentarios
  loadComments() {
    const idSong = this.getIdSongFromUrl(); // Asegúrate de obtener el ID de la URL
    this.songService.getComments(idSong).subscribe(
      (comments) => {
        console.log('Comentarios recibidos:', comments);  // Verifica la estructura de los comentarios
        this.comments = comments;
        
        // Asignar el userId del primer comentario (si existe)
        if (comments && comments.length > 0) {
          this.userId = comments[0].id_user;  // Asignar el id_user del primer comentario
        }
        
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los comentarios: ', error);
        this.isLoading = false;
      }
    );
  }

  // Método para obtener el id_song desde la URL
  getIdSongFromUrl(): number {
    const urlParts = window.location.pathname.split('/');
    return +urlParts[urlParts.length - 1]; // Suponiendo que la URL es algo como /song/{id}
  }

  // Método para obtener el número de estrellas
  getStars(score: number): number[] {
    // Asegurarse de que el score sea un número
    score = Number(score); // Convertir el valor a número explícitamente

    // Establecer las estrellas completas y medias
    const fullStars = Math.floor(score); // Estrellas completas
    const halfStars = score % 1 >= 0.5 ? 1 : 0; // Media estrella si el decimal es >= 0.5

    // Crear un arreglo con el número de estrellas completas y medias necesarias
    return [
      ...new Array(fullStars).fill(1),   // Estrellas completas
      ...new Array(halfStars).fill(0.5),  // Estrella media
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
