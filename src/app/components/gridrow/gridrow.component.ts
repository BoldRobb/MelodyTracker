import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener parámetros de la ruta
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Para la navegación de rutas
import { AlbumService } from '../../services/album/backend/album-service.service';
import { SongService } from '../../services/song/backend/song.service';
import { WatchListUserResponse, WatchlistSong } from '../../interfaces/song';
import { WatchListAlbumsResponse, Album } from '../../interfaces/album';  // Aquí importamos los tipos para álbumes

@Component({
  selector: 'app-gridrow',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gridrow.component.html',
  styleUrls: ['./gridrow.component.css']
})
export class GridrowComponent implements OnInit {
  @Input() type: string = '';  // Tipo de contenido, se pasa como entrada al componente
  @Input() columns: number = 8;
  @Input() rows: number = 1;

  bestAlbums: Album[] = []; // Array para los mejores álbumes
  watchlistSongs: WatchlistSong[] = []; // Array para las canciones de la watchlist
  watchlistAlbums: Album[] = [];  // Nuevo array para los álbumes en la watchlist
  userId: number | null = null;

  constructor(
    private songService: SongService,
    private albumService: AlbumService,
    private route: ActivatedRoute  // Para obtener los parámetros de la ruta
  ) {}

  ngOnInit(): void {
    // Obtenemos el id_user de la ruta
    this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('id_user'));
      console.log('User ID (reactivo):', this.userId);

      // Ahora cargamos los álbumes y canciones de la watchlist con el id_user
      if (this.userId) {
        this.loadWatchlistAlbums();  // Cargar los álbumes de la watchlist
        this.loadWatchlistSongs();   // Cargar las canciones de la watchlist
      }
    });
  }

  loadWatchlistAlbums(): void {
    if (!this.userId) return;

    this.albumService.getWatchlistAlbumsByUser(this.userId).subscribe(
      (response: WatchListAlbumsResponse) => {
        this.watchlistAlbums = response.watchlist_albums;
        console.log('Álbumes en la watchlist:', this.watchlistAlbums);
      },
      (error) => {
        console.error('Error loading watchlist albums:', error);
      }
    );
  }

  loadWatchlistSongs(): void {
    if (!this.userId) return;

    this.songService.getWatchlistSongsByUser(this.userId).subscribe(
      (response: WatchListUserResponse) => {
        this.watchlistSongs = response.watchlist_songs;
        console.log('Canciones de la watchlist:', this.watchlistSongs);
      },
      (error) => {
        console.error('Error loading watchlist songs:', error);
      }
    );
  }
}
