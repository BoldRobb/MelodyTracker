import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/backend/users.service'; 

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [],
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  userDetails: { username?: string; photo?: string; watchlist_count?: number, watchlist_album_count?: number } | null = null;
  isLoading = false;
  isWatchlistSongs = false;
  isWatchlistAlbums = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      // Detectar si la URL es para 'watchlist_songs' o 'watchlist_albums'
      this.isWatchlistSongs = segments[0].path === 'watchlist_songs';
      this.isWatchlistAlbums = segments[0].path === 'watchlist_albums';
  
      console.log('isWatchlistAlbums:', this.isWatchlistAlbums); // Verifica que sea true cuando debería serlo
  
      const id_user = segments.length > 1 ? +segments[1].path : null;
      if (id_user) {
        this.getUserDetails(id_user);
      }
    });
  }

  getUserDetails(id_user: number): void {
    this.isLoading = true;

    // Llamar al servicio adecuado dependiendo del tipo de watchlist
    if (this.isWatchlistSongs) {
      this.usersService.detailsEncabezadoWatchlistSong(id_user).subscribe({
        next: (data) => {
          console.log('Datos de canciones:', data); // Agregado para depuración
          this.userDetails = { ...data, watchlist_album_count: undefined }; // Limpiar el conteo de álbumes
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching user details for songs', err);
          this.isLoading = false;
        }
      });
    } else if (this.isWatchlistAlbums) {
      this.usersService.detailsEncabezadoWatchlistAlbum(id_user).subscribe({
        next: (data) => {
          console.log('Datos de álbumes:', data); // Verifica que `watchlist_album_count` esté presente
          this.userDetails = { ...data, watchlist_count: undefined }; // Limpiar el conteo de canciones
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching user details for albums', err);
          this.isLoading = false;
        }
      });
    }
  }
}
