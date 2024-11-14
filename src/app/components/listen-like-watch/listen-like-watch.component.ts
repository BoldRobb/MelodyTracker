import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song/backend/song.service'; // Servicio para manejar las canciones
import { UsersService } from '../../services/users/backend/users.service'; // Servicio para manejar al usuario
import { SpinnerService } from '../../services/others/spinner.service';
import { SpinnerComponent } from "../spinner/spinner.component"; // Servicio para mostrar/ocultar el spinner
import { finalize } from 'rxjs';

@Component({
  selector: 'app-listen-like-watch',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './listen-like-watch.component.html',
  styleUrl: './listen-like-watch.component.css'
})
export class ListenLikeWatchComponent implements OnInit {

  songId: number | undefined; // ID de la canción
  userId: number | undefined; // ID del usuario
  isLiked: boolean = false; // Estado del like, inicialmente es false
  isListened: boolean = false; // Estado de la canción escuchada, inicialmente es false

  constructor(
    private activatedRoute: ActivatedRoute,
    private songService: SongService,
    private usersService: UsersService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la canción desde la URL
    this.activatedRoute.paramMap.subscribe(params => {
      this.songId = +params.get('id')!; // Usamos el operador '!' para asegurar que no sea undefined
    });

    // Obtener el ID del usuario logueado
    this.usersService.getUserId().subscribe({
      next: (id) => {
        this.userId = id;
        this.checkIfLiked(); // Verificamos si el usuario ya le dio like a la canción
        this.checkIfListened(); // Verificamos si el usuario ya ha escuchado la canción
      },
      error: (error) => {
        console.error('Error al obtener el ID del usuario:', error);
      }
    });
  }

  // Método para verificar si el usuario le dio like a la canción
  checkIfLiked(): void {
    if (this.songId !== undefined && this.userId !== undefined) {
      this.spinnerService.show();

      this.songService.checkIfUserLikedSong(this.songId, this.userId).pipe(
        finalize(() => this.spinnerService.hide())
      ).subscribe({
        next: (response) => {
          this.isLiked = response.has_liked;
          console.log('Estado del like del usuario:', this.isLiked);
        },
        error: (error) => {
          console.error('Error al verificar si el usuario dio like:', error);
        }
      });
    }
  }

  // Método para verificar si el usuario ha escuchado la canción
  checkIfListened(): void {
    if (this.songId !== undefined && this.userId !== undefined) {
      this.spinnerService.show();

      this.songService.checkIfUserListenedSong(this.songId, this.userId).pipe(
        finalize(() => this.spinnerService.hide())
      ).subscribe({
        next: (response) => {
          this.isListened = response.has_listened;
          console.log('Estado de escucha de la canción del usuario:', this.isListened);
        },
        error: (error) => {
          console.error('Error al verificar si el usuario escuchó la canción:', error);
        }
      });
    }
  }

  // Método para alternar el like (dar like o quitarlo)
  giveLike(): void {
    if (this.userId && this.songId !== undefined) {
      if (this.isLiked) {
        this.songService.unlikeSong(this.songId, this.userId).pipe(
          finalize(() => this.spinnerService.hide())
        ).subscribe({
          next: (response) => {
            console.log(response.message);
            this.isLiked = false;
          },
          error: (error) => {
            console.error('Error al quitar el like de la canción:', error);
          }
        });
      } else {
        this.songService.likeSong(this.songId, this.userId).pipe(
          finalize(() => this.spinnerService.hide())
        ).subscribe({
          next: (response) => {
            console.log(response.message);
            this.isLiked = true;
          },
          error: (error) => {
            console.error('Error al dar like a la canción:', error);
          }
        });
      }
    }
  }

  // Método para alternar el estado de "escuchar" (marcar como escuchada o quitar la marca)
  giveListen(): void {
    if (this.userId && this.songId !== undefined) {
      if (this.isListened) {
        this.songService.unlistenSong(this.songId, this.userId).pipe(
          finalize(() => this.spinnerService.hide())
        ).subscribe({
          next: (response) => {
            console.log(response.message);
            this.isListened = false;
          },
          error: (error) => {
            console.error('Error al quitar la marca de escuchada:', error);
          }
        });
      } else {
        this.songService.listenSong(this.songId, this.userId).pipe(
          finalize(() => this.spinnerService.hide())
        ).subscribe({
          next: (response) => {
            console.log(response.message);
            this.isListened = true;
          },
          error: (error) => {
            console.error('Error al marcar la canción como escuchada:', error);
          }
        });
      }
    }
  }
}