import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BestAlbumsResponse, Album, WatchListAlbumsResponse } from '../../interfaces/album';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { SongService } from '../../services/song/backend/song.service';
import { WatchListUserResponse, WatchlistSong } from '../../interfaces/song';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gridrow',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gridrow.component.html',
  styleUrls: ['./gridrow.component.css']
})
export class GridrowComponent implements OnInit {
  @Input() type: string = '';  // El tipo que se pasa al componente, como 'top10RankedAlbums' o 'watchlistAlbums'
  @Input() columns: number = 8;  // Número de columnas por defecto
  @Input() rows: number = 1;     // Número de filas por defecto

  bestAlbums: Album[] = [];          // Array para los mejores álbumes
  watchlistSongs: WatchlistSong[] = [];  // Array para las canciones de la watchlist
  watchlistAlbums: Album[] = [];     // Nuevo array para los álbumes en la watchlist
  userId: string | null = null;  // Variable para almacenar el userId

  constructor(
    private songService: SongService,
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtén el userId de la ruta actual
    this.route.params.subscribe(params => {
      this.userId = params['id_user'];  // Guarda el id_user de la URL
      console.log('userId desde la ruta:', this.userId);

      // Cargar contenido según el tipo y el userId
      this.loadContentBasedOnType();
    });

    // Si no hay un userId y el tipo es 'top10RankedAlbums', cargamos los mejores álbumes
    if (!this.userId && this.type === 'top10RankedAlbums') {
      this.loadBestAlbums();
    }
  }

  loadContentBasedOnType(): void {
    if (this.userId) {
      switch (this.type) {
        case 'top10RankedAlbums':
          this.loadBestAlbums();  // Cargar los mejores álbumes
          break;
        case 'watchlistAlbums':
          this.loadWatchlistAlbums();  // Cargar los álbumes en la watchlist
          break;
        case 'watchlistSongs':
          this.loadWatchlistSongs();   // Cargar las canciones de la watchlist
          break;
        default:
          console.error('Tipo no reconocido');
      }
    }
  }

  loadBestAlbums(): void {
    this.albumService.getBestAlbums().subscribe(
      (response: BestAlbumsResponse) => {
        this.bestAlbums = response.best_albums;
        console.log('Mejores álbumes:', this.bestAlbums);
      },
      (error) => {
        console.error('Error loading best albums:', error);
      }
    );
  }

  loadWatchlistAlbums(): void {
    if (!this.userId) return;

    this.albumService.getWatchlistAlbumsByUser(Number(this.userId)).subscribe(
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

    this.songService.getWatchlistSongsByUser(Number(this.userId)).subscribe(
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
