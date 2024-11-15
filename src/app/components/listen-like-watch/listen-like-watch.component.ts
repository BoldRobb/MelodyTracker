import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song/backend/song.service'; // Servicio para manejar las canciones
import { AlbumService } from '../../services/album/backend/album-service.service' // Servicio para manejar los álbumes
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

  songId: number | undefined;
  albumId: number | undefined;
  userId: number | undefined;
  isLiked: boolean = false;
  isListened: boolean = false;
  isSong: boolean = true; // Variable para identificar si es una canción o un álbum

  constructor(
    private activatedRoute: ActivatedRoute,
    private songService: SongService,
    private albumService: AlbumService,
    private usersService: UsersService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    // Identificar si la URL contiene 'song' o 'album'
    this.activatedRoute.url.subscribe(urlSegments => {
      this.isSong = urlSegments.some(segment => segment.path === 'song');

      const idParam = +this.activatedRoute.snapshot.paramMap.get('id')!;
      if (this.isSong) {
        this.songId = idParam;
      } else {
        this.albumId = idParam;
      }
    });

    // Obtener el ID del usuario logueado
    this.usersService.getUserId().subscribe({
      next: (id) => {
        this.userId = id;
        this.checkIfLiked();
        this.checkIfListened();
      },
      error: (error) => {
        console.error('Error al obtener el ID del usuario:', error);
      }
    });
  }

  // Método para verificar si el usuario le dio like
  checkIfLiked(): void {
    if (this.userId !== undefined) {
      this.spinnerService.show();
      const checkLike$ = this.isSong 
        ? this.songService.checkIfUserLikedSong(this.songId!, this.userId)
        : this.albumService.checkIfUserLikedAlbum(this.albumId!, this.userId);

      checkLike$.pipe(finalize(() => this.spinnerService.hide())).subscribe({
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

  // Método para verificar si el usuario ha escuchado
  checkIfListened(): void {
    if (this.userId !== undefined) {
      this.spinnerService.show();
      const checkListened$ = this.isSong 
        ? this.songService.checkIfUserListenedSong(this.songId!, this.userId)
        : this.albumService.checkIfUserListenedAlbum(this.albumId!, this.userId);

      checkListened$.pipe(finalize(() => this.spinnerService.hide())).subscribe({
        next: (response) => {
          this.isListened = response.has_listened;
          console.log('Estado de escucha del usuario:', this.isListened);
        },
        error: (error) => {
          console.error('Error al verificar si el usuario escuchó:', error);
        }
      });
    }
  }

  // Método para alternar el like
  giveLike(): void {
    if (this.userId) {
      this.spinnerService.show();
      const like$ = this.isSong 
        ? (this.isLiked ? this.songService.unlikeSong(this.songId!, this.userId) : this.songService.likeSong(this.songId!, this.userId))
        : (this.isLiked ? this.albumService.unlikeAlbum(this.albumId!, this.userId) : this.albumService.likeAlbum(this.albumId!, this.userId));

      like$.pipe(finalize(() => this.spinnerService.hide())).subscribe({
        next: (response) => {
          this.isLiked = !this.isLiked;
          console.log(response.message);
        },
        error: (error) => {
          console.error('Error al alternar el like:', error);
        }
      });
    }
  }

  // Método para alternar el estado de "escuchar"
  giveListen(): void {
    if (this.userId) {
      this.spinnerService.show();
      const listen$ = this.isSong
        ? (this.isListened ? this.songService.unlistenSong(this.songId!, this.userId) : this.songService.listenSong(this.songId!, this.userId))
        : (this.isListened ? this.albumService.unlistenAlbum(this.albumId!, this.userId) : this.albumService.listenAlbum(this.albumId!, this.userId));
  
      listen$.pipe(finalize(() => this.spinnerService.hide())).subscribe({
        next: (response) => {
          this.isListened = !this.isListened;
          console.log('Estado de escucha cambiado:', this.isListened);
        },
        error: (error) => {
          console.error('Error al alternar el estado de escucha:', error);
          alert('Ocurrió un error, por favor intente nuevamente.');
        }
      });
    }
  }
}
