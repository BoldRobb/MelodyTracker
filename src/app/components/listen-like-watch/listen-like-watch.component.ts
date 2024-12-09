import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../../services/song/backend/song.service'; // Servicio para manejar las canciones
import { AlbumService } from '../../services/album/backend/album-service.service' // Servicio para manejar los álbumes
import { UsersService } from '../../services/users/backend/users.service'; // Servicio para manejar al usuario
import { ListsService } from '../../services/lists/backend/lists.service'; // Servicio para manejar las listas
import { SpinnerService } from '../../services/others/spinner.service';
import { SpinnerComponent } from "../spinner/spinner.component"; // Servicio para mostrar/ocultar el spinner
import { finalize, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listen-like-watch',
  standalone: true,
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './listen-like-watch.component.html',
  styleUrl: './listen-like-watch.component.css'
})
export class ListenLikeWatchComponent implements OnInit {

  songId: number | undefined;
  albumId: number | undefined;
  listId: number | undefined;

  userId: number | undefined;
  isLiked: boolean = false;
  isListened: boolean = false;
  isSong: boolean = true; // Variable para identificar si es una canción o un álbum
  isInWatchlist: boolean = false; // Nueva variable

  isListRoute: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private songService: SongService,
    private albumService: AlbumService,
    private usersService: UsersService,
    private spinnerService: SpinnerService,
    private listsService: ListsService
  ) {}

  ngOnInit(): void {

    this.isListRoute = this.router.url.startsWith('/list');

    this.usersService.getUserId().subscribe({
      next: (id) => {
        this.userId = id;
        // Asegúrate de que songId o albumId están definidos antes de continuar
        if (this.songId !== undefined || this.albumId !== undefined) {
          this.checkIfInWatchlist();
        } 
  
        this.activatedRoute.url?.subscribe(urlSegments => {
          this.isSong = urlSegments.some(segment => segment.path === 'song');
          const idParam = +this.activatedRoute.snapshot.paramMap.get('id')!;
          if (this.isSong) {
            this.songId = idParam;
          } else if (this.isListRoute) {
            this.listId = idParam;
          } else {
            this.albumId = idParam;
          }
  
          // Verificar si está en la watchlist solo después de definir los IDs
          if (!this.isListRoute){
            this.checkIfInWatchlist();
          }
         
        });
        
        this.checkIfLiked();
        
        if (!this.isListRoute){
          this.checkIfListened();
        }
        
      },
      error: (error) => {

      }
    });
  }
  

  // Método para verificar si el elemento está en la Watchlist
  checkIfInWatchlist(): void {
    if (this.userId !== undefined) {
      const checkWatchlist$ = this.isSong 
        ? this.songService.isSongInWatchlist(this.songId!, this.userId)
        : this.albumService.isAlbumInWatchlist(this.albumId!, this.userId);
  
      checkWatchlist$.subscribe({
        next: (response) => {
          this.isInWatchlist = response.is_in_watchlist;

        },
        error: (error) => {

        }
      });
    }
  }


  toggleWatchlist(): void {
    if (!this.userId || (!this.songId && !this.albumId)) {

      return;
    }
    

  
    if (this.isInWatchlist) {
      const removeFromWatchlist$ = this.isSong
        ? this.songService.removeSongFromWatchlist(this.songId!, this.userId)
        : this.albumService.removeAlbumFromWatchlist(this.albumId!, this.userId);
  
      removeFromWatchlist$.subscribe({
        next: (response: any) => {
          this.isInWatchlist = false;


        },
        error: (error) => {

          alert('Ocurrió un error, por favor intente nuevamente.');
        }
      });
    } else {
      const addToWatchlist$: Observable<any> = this.isSong
        ? this.songService.addSongToWatchlist(this.songId!, this.userId)
        : this.albumService.addAlbumToWatchlist(this.albumId!, this.userId);
  
      addToWatchlist$.subscribe({
        next: (response: any) => {
          this.isInWatchlist = true;


        },
        error: (error) => {

          if (error?.error?.detail === 'Song is already in the watchlist') {
            alert('Esta canción ya está en tu lista de seguimiento.');
          } else {
            alert('Ocurrió un error, por favor intente nuevamente.');
          }
        }
      });
    }
  }


  // Método para verificar si el usuario le dio like
  checkIfLiked(): void {
    if (this.userId !== undefined) {
      this.spinnerService.show();
  
      const checkLike$ = this.isSong
        ? this.songService.checkIfUserLikedSong(this.songId!, this.userId)
        : this.isListRoute
          ? this.listsService.checkIfUserLikedList(this.listId!, this.userId)
          : this.albumService.checkIfUserLikedAlbum(this.albumId!, this.userId)
  
      checkLike$.pipe(finalize(() => this.spinnerService.hide())).subscribe({
        next: (response) => {
          this.isLiked = response.has_liked;

        },
        error: (error) => {

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

        },
        error: (error) => {

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
        : this.isListRoute
          ? (this.isLiked ? this.listsService.unlikeList(this.listId!, this.userId) : this.listsService.likeList(this.listId!, this.userId))
          : (this.isLiked ? this.albumService.unlikeAlbum(this.albumId!, this.userId) : this.albumService.likeAlbum(this.albumId!, this.userId));

      like$.pipe(finalize(() => this.spinnerService.hide())).subscribe({
        next: (response) => {
          this.isLiked = !this.isLiked;
          this.albumService.updateStats();

        },
        error: (error) => {

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
          this.albumService.updateStats();

        },
        error: (error) => {

          alert('Ocurrió un error, por favor intente nuevamente.');
        }
      });
    }
  }
}
