import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { SongService } from '../../services/song/backend/song.service';
import { SpinnerService } from '../../services/others/spinner.service';

@Component({
  selector: 'app-datos-song-album',
  templateUrl: './datos-song-album.component.html',
  styleUrls: ['./datos-song-album.component.css'],
  standalone: true,
  imports: [] // Aquí podrías agregar otros módulos si es necesario, por ejemplo, `CommonModule`
})
export class DatosSongAlbumComponent implements OnInit {
  albumId: number | null = null;

  // Variables para almacenar los detalles del álbum o la canción
  albumCover: string = '';
  title: string = '';
  releaseYear: number = 0;
  artist: string = '';
  language: string = '';
  releaseDate: string = '';
  listens: number = 0;
  comments: number = 0;
  listsCreated: number = 0;
  likes: number = 0;
  ratingCount: number = 0;
  reviewCount: number = 0;

  isAlbumRoute: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private songService: SongService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.isAlbumRoute = this.router.url.startsWith('/album');
    this.spinnerService.show();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam && !isNaN(Number(idParam))) {
        this.albumId = Number(idParam);
        this.getDetails(this.albumId);
      } else {
        this.router.navigate(['/404']);
        this.spinnerService.hide();
      }
    });
  }

  // Método para obtener los detalles (álbum o canción según la ruta)
  getDetails(id: number): void {
    if (this.isAlbumRoute) {
      this.albumService.getAlbumDetails(id).subscribe(
        (response) => {
          this.assignAlbumData(response);
          this.getAlbumLikeCount(id);
          this.getAlbumReviewCount(id);
          this.getAlbumListenedCount(id);
          this.spinnerService.hide();
        },
        (error) => {
          console.error('Error al obtener los detalles del álbum:', error);
          this.router.navigate(['/404']);
          this.spinnerService.hide();
        }
      );
    } else {
      this.songService.getSongDetails(id).subscribe(
        (response) => {
          this.assignSongData(response);
          this.getSongLikeCount(id);
          this.getSongReviewCount(id);
          this.getSongListenedCount(id);
          this.spinnerService.hide();
        },
        (error) => {
          console.error('Error al obtener los detalles de la canción:', error);
          this.router.navigate(['/404']);
          this.spinnerService.hide();
        }
      );
    }
  }

  // Métodos para obtener los conteos del álbum
  getAlbumLikeCount(id: number): void {
    this.albumService.getAlbumLikeCount(id).subscribe(
      (response) => {
        this.likes = response.likes_count;
      },
      (error) => {
        console.error('Error al obtener el conteo de likes del álbum:', error);
      }
    );
  }

  getAlbumReviewCount(id: number): void {
    this.albumService.getAlbumReviewCount(id).subscribe(
      (response) => {
        this.reviewCount = response.reviews_count;
      },
      (error) => {
        console.error('Error al obtener el conteo de reviews del álbum:', error);
      }
    );
  }

  getAlbumListenedCount(id: number): void {
    this.albumService.getAlbumListenedCount(id).subscribe(
      (response) => {
        this.listens = response.user_count;
      },
      (error) => {
        console.error('Error al obtener el conteo de escuchas del álbum:', error);
      }
    );
  }

  // Métodos para obtener los conteos de la canción
  getSongLikeCount(id: number): void {
    this.songService.getSongLikeCount(id).subscribe(
      (response) => {
        this.likes = response.likes_count;
      },
      (error) => {
        console.error('Error al obtener el conteo de likes de la canción:', error);
      }
    );
  }

  getSongReviewCount(id: number): void {
    this.songService.getSongReviewCount(id).subscribe(
      (response) => {
        this.reviewCount = response.reviews_count;
      },
      (error) => {
        console.error('Error al obtener el conteo de reviews de la canción:', error);
      }
    );
  }

  getSongListenedCount(id: number): void {
    this.songService.getSongListenedCount(id).subscribe(
      (response) => {
        this.listens = response.user_count;
      },
      (error) => {
        console.error('Error al obtener el conteo de escuchas de la canción:', error);
      }
    );
  }

  assignAlbumData(response: any): void {
    this.albumCover = response.photo;
    this.title = response.name;
    this.releaseYear = new Date(response.released).getFullYear();
    this.artist = response.artist_name;
    this.language = response.language;
    this.releaseDate = response.released;
    this.listens = response.listens;
    this.comments = response.comments;
    this.listsCreated = response.listsCreated;
    this.likes = response.likes;
    this.ratingCount = response.ratingCount;
  }

  assignSongData(response: any): void {
    this.albumCover = response.photo;
    this.title = response.name;
    this.artist = response.artist_name;
    this.language = response.language;
    this.releaseDate = response.released;
    this.releaseYear = new Date(response.released).getFullYear();
    this.listens = response.listenedCount;
    this.comments = response.comments;
    this.likes = response.likes;
    this.ratingCount = response.ratingCount;
    this.reviewCount = response.reviews_count;
  }
}
