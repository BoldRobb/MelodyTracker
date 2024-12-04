import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album/backend/album-service.service';
import { SongService } from '../../services/song/backend/song.service';
import { SpinnerService } from '../../services/others/spinner.service';
import { CreateReviewComponent } from "../modals/create-review/create-review.component";
import { ListsService } from '../../services/lists/backend/lists.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datos-song-album',
  templateUrl: './datos-song-album.component.html',
  styleUrls: ['./datos-song-album.component.css'],
  standalone: true,
  imports: [CreateReviewComponent, RouterLink, CommonModule] // Aquí podrías agregar otros módulos si es necesario, por ejemplo, `CommonModule`
 // Aquí podrías agregar otros módulos si es necesario, por ejemplo, `CommonModule`
})
export class DatosSongAlbumComponent implements OnInit {
  albumId: number | null = null;
  
  rutaclick: string = '';
  // Variables para almacenar los detalles del álbum o la canción
  albumCover: string = '';
  title: string = '';
  releaseYear: number = 0;
  artist: string = '';
  idArtist: number = 0;
  language: string = '';
  releaseDate: string = '';
  listens: number = 0;
  comments: number = 0;
  listsCreated: number = 0;
  likes: number = 0;
  ratingCount: number = 0;
  reviewCount: number = 0;

  id_user_creator: number = 0;
  creator_username: string = '';
  creator_photo: string = '';
  listComment: string = '';



  isAlbumRoute: boolean = true;
  isAlbumHeardBy: boolean = false;
  isAlbumLikedBy: boolean = false;

  isSongRoute: boolean = false;
  isSongHeardBy: boolean = false;
  isSongLikedBy: boolean = false;

  isListRoute: boolean = false;

  isCommentOnReviewSong: boolean = false;
  isCommentOnReviewAlbum: boolean = false;
  
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private songService: SongService,
    private spinnerService: SpinnerService,
    private listService: ListsService
  ) {}

  ngOnInit(): void {
    

    

    this.isAlbumRoute = this.router.url.startsWith('/album');
    this.isAlbumHeardBy = this.router.url.startsWith('/albumHeardBy');
    this.isAlbumLikedBy = this.router.url.startsWith('/albumLikedBy');

    this.isSongRoute = this.router.url.startsWith('/song');
    this.isSongHeardBy = this.router.url.startsWith('/songHeardBy');
    this.isSongLikedBy = this.router.url.startsWith('/songLikedBy');
    
    this.isListRoute = this.router.url.startsWith('/list');

    this.isCommentOnReviewSong = this.router.url.startsWith('/comentsOnReview/song');
    this.isCommentOnReviewAlbum = this.router.url.startsWith('/comentsOnReview/album');


    this.albumService.statsUpdatedSource$.subscribe(() => {
      console.log('Stats');
      if (this.albumId !== null && this.isAlbumRoute) {
        // this.getDetails(this.albumId);  // Recargar los comentarios
        this.getAlbumLikeCount(this.albumId);
        this.getAlbumReviewCount(this.albumId);
        this.getAlbumListenedCount(this.albumId);
      }
      if (this.albumId !== null && this.isSongRoute) {
        this.getSongLikeCount(this.albumId);
        this.getSongReviewCount(this.albumId);
        this.getSongListenedCount(this.albumId);
        this.getSongListCount(this.albumId);
      }
    });

    this.spinnerService.show();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam && !isNaN(Number(idParam))) {
        this.albumId = Number(idParam);
        this.getDetails(this.albumId);
      } else {

        this.spinnerService.hide();
      }
    });

    if (this.isAlbumRoute) {
      this.rutaclick = 'album';
    } else if (this.isSongRoute) {
      this.rutaclick = 'song';
    }

  }

  // Método para obtener los detalles (álbum o canción según la ruta)
  getDetails(id: number): void {
    if (this.isAlbumRoute || this.isAlbumHeardBy || this.isAlbumLikedBy || this.isCommentOnReviewAlbum) {
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
    } else if (this.isSongRoute || this.isSongHeardBy || this.isSongLikedBy || this.isCommentOnReviewSong) {
      this.songService.getSongDetails(id).subscribe(
        (response) => {
          this.assignSongData(response);
          this.getSongLikeCount(id);
          this.getSongReviewCount(id);
          this.getSongListenedCount(id);
          this.getSongListCount(id);
          this.spinnerService.hide();
        },
        (error) => {
          console.error('Error al obtener los detalles de la canción:', error);
          this.router.navigate(['/404']);
          this.spinnerService.hide();
        }
      );
    } else if (this.isListRoute){
      this.listService.getListDetails(id).subscribe(
        (response) => {
          this.assingListData(response);
          console.log('estoooooo: ', response);
          this.spinnerService.hide();
        },
        (error) => {
          console.error('Error al obtener los detalles de la lista:', error);
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

  getSongListCount(id: number): void{
    this.songService.getSongListCount(id).subscribe(
      (response) => {
        this.listsCreated = response.list_count;
      },
      (error) => {
        console.error('Error al obtener el conteo de listas creadas de la canción:', error);
      }
   );
  }

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

  assignAlbumData(response: any): void {
    this.albumCover = response.photo;
    this.title = response.name;
    this.releaseYear = new Date(response.released).getFullYear();
    this.artist = response.artist_name;
    this.idArtist = response.id_artist;
    this.language = response.language;
    this.releaseDate = response.released;
    this.listens = response.listens;
    this.comments = response.comments;
    this.listsCreated = response.listsCreated;
    this.likes = response.likes;
    this.ratingCount = response.ratingCount;

    this.songService.updateData({
      title: this.title,
      artist: this.artist,
      releaseYear: this.releaseYear,
      albumCover: this.albumCover,
    });
  }

  assignSongData(response: any): void {
    this.albumCover = response.photo;
    this.title = response.name;
    this.artist = response.artist_name;
    this.idArtist = response.id_artist;
    this.language = response.language;
    this.releaseDate = response.released;
    this.releaseYear = new Date(response.released).getFullYear();
    this.listens = response.listenedCount;
    this.comments = response.comments;
    this.likes = response.likes;
    this.ratingCount = response.ratingCount;
    this.reviewCount = response.reviews_count;
    
    this.songService.updateData({
      title: this.title,
      artist: this.artist,
      releaseYear: this.releaseYear,
      albumCover: this.albumCover
    });
  }

  assingListData(response: any): void {
    this.id_user_creator = response.id_user_creator;
    this.creator_username = response.creator_username;
    this.creator_photo = response.creator_photo;
    this.albumCover = response.list_photo;
    this.title = response.list_name;
    this.listComment = response.comment;

    this.songService.updateData({
      title: this.title,
      albumCover: this.albumCover
    });
  }
}
