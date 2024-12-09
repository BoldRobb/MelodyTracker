import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/backend/users.service'; 
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  userDetails: {
    username?: string;
    photo?: string;
    watchlist_count?: number;
    watchlist_album_count?: number;
    listened_songs_count?: number;
    total_following?: number;
    total_followers?: number;
    listened_albums_count?: number;
  } | null = null;
  isLoading = false;
  isWatchlistSongs = false;
  isWatchlistAlbums = false;
  isWatchsongsListened = false;
  isWatchalbumsListened = false;
  isWatchFollowing = false;
  isWatchFollowers = false;

id_user: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      // Configuración de las banderas según la ruta
      this.isWatchlistSongs = segments[0].path === 'watchlist_songs';
      this.isWatchlistAlbums = segments[0].path === 'watchlist_albums';
      this.isWatchsongsListened = segments[0].path === 'songsListened';
      this.isWatchalbumsListened = segments[0].path === 'albumsListened';
      this.isWatchFollowing = segments[0].path === 'following';
      this.isWatchFollowers = segments[0].path === 'followers';
  
      // Extraer el ID del usuario desde la ruta
      this.id_user = segments.length > 1 ? +segments[1].path : null;
      if (this.id_user) {
        this.getUserDetails(this.id_user, segments);
      }
    });
  }

  getUserDetails(id_user: number, segments: any[]): void {
    this.isLoading = true;
  
    let observable: Observable<any> | null = null;
  
    if (this.isWatchlistSongs) {
      observable = this.usersService.detailsEncabezadoWatchlistSong(id_user);
    } else if (this.isWatchlistAlbums) {
      observable = this.usersService.detailsEncabezadoWatchlistAlbum(id_user);
    } else if (this.isWatchsongsListened) {
      observable = this.usersService.detailsEncabezadoSongsListened(id_user);
    } else if (this.isWatchalbumsListened) {
      observable = this.usersService.detailsEncabezadoAlbumsListened(id_user);
    } else if (this.isWatchFollowing) {
      observable = this.usersService.detailsEncabezadoFollowing(id_user);
    } else if (this.isWatchFollowers) {
      observable = this.usersService.detailsEncabezadoFollowers(id_user);
    }
  
    if (observable !== null) {
      observable.subscribe({
        next: (data) => {

          this.userDetails = data;
          this.isLoading = false;

        },
        error: (err) => {

          this.isLoading = false;
        }
      });
    }
  }
}
