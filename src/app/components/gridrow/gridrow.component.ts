import { Component, Input, OnInit } from '@angular/core';
import { BestAlbumsResponse, Album } from '../../interfaces/album';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { SongService } from '../../services/song/backend/song.service';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { WatchListUserResponse, WatchlistSong } from '../../interfaces/song';

@Component({
  selector: 'app-gridrow',
  standalone: true,  // Indica que el componente es independiente
  imports: [CommonModule, RouterModule],  // Los módulos que se usarán en este componente
  templateUrl: './gridrow.component.html',  // Ruta al archivo de plantilla HTML
  styleUrls: ['./gridrow.component.css']  // Ruta al archivo de estilos CSS
})
export class GridrowComponent implements OnInit {
  @Input() type: string = '';  // Tipo de elemento, se pasa como entrada al componente
  @Input() columns: number = 8; // Número de columnas por defecto
  @Input() rows: number = 1;   // Número de filas por defecto

  bestAlbums: Album[] = []; // Array para almacenar los álbumes mejores
  watchlistSongs: WatchlistSong[] = []; // Array para almacenar las canciones de la watchlist
  userId: number | null = null; // Variable para almacenar el ID del usuario

  constructor(
    private songService: SongService, // Servicio para manejar canciones
    private albumService: AlbumService, // Servicio para manejar álbumes
    private route: ActivatedRoute // Para obtener parámetros de la ruta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('id_user'));
      console.log('User ID (reactivo):', this.userId);
    });
  
    this.loadBestAlbums();
    this.loadWatchlistSongs();
  }

  // Método para cargar los mejores álbumes
  loadBestAlbums(): void {
    this.albumService.getBestAlbums().subscribe(
      (response: BestAlbumsResponse) => {
        this.bestAlbums = response.best_albums;
        console.log(this.bestAlbums);  // Verifica si los álbumes están correctamente cargados
      },
      (error) => {
        console.error('Error loading best albums:', error);
      }
    );
  }
  
  // Método para cargar las canciones de la watchlist
  loadWatchlistSongs(): void {
    if (!this.userId) return;
  
    this.songService.getWatchlistSongsByUser(this.userId).subscribe(
      (response: WatchListUserResponse) => {
        this.watchlistSongs = response.watchlist_songs;
        console.log('Canciones de la watchlist:', this.watchlistSongs);  // Verifica las canciones
      },
      (error) => {
        console.error('Error loading watchlist songs:', error);
      }
    );
  }
}
